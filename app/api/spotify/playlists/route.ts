import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

// ─── Types ────────────────────────────────────────────────────────────────────

type SpotifyPlaylistImage = {
  url: string;
  height?: number;
  width?: number;
};

type SpotifyPlaylist = {
  id: string;
  name: string;
  images: SpotifyPlaylistImage[];
  description?: string;
  external_urls?: { spotify?: string };
  tracks?: { total: number };
  items?: { total: number };
  trackCount?: number;
  href?: string;
};

type SpotifyPlaylistsResponse = {
  items: SpotifyPlaylist[];
  next?: string | null;
  total?: number;
};

type NormalizedPlaylist = {
  id: string;
  name: string;
  image: string | null;
  description: string;
  url: string;
  trackCount: number;
};

const normalizedPlaylistSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullable(),
  description: z.string(),
  url: z.string(),
  trackCount: z.number(),
});

// ─── Disk Cache ───────────────────────────────────────────────────────────────
// Written on every successful Spotify fetch. Read as fallback on API failure.

const DISK_CACHE_PATH = path.join(process.cwd(), 'content', 'playlists.cache.json');

function readDiskCache(): NormalizedPlaylist[] | null {
  try {
    if (!fs.existsSync(DISK_CACHE_PATH)) return null;
    const raw = fs.readFileSync(DISK_CACHE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return normalizedPlaylistSchema.array().parse(parsed);
  } catch (err) {
    console.warn('[Spotify Cache] Disk cache invalid or missing:', err);
    return null;
  }
}

function writeDiskCache(playlists: NormalizedPlaylist[]): void {
  try {
    fs.writeFileSync(DISK_CACHE_PATH, JSON.stringify(playlists, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[Spotify Cache] Failed to write disk cache:', err);
  }
}

function getAllowedPlaylistIds(): string[] {
  const allowedIdsString = process.env.SPOTIFY_ALLOWED_PLAYLIST_IDS ?? '';
  return allowedIdsString
    .split(',')
    .map((raw) => {
      const trimmed = raw.trim();
      if (!trimmed) return '';
      const idPart = trimmed.split('?')[0];
      const segments = idPart.split('/');
      return segments[segments.length - 1];
    })
    .filter(Boolean);
}

function applyAllowlist(playlists: NormalizedPlaylist[], allowedIds: string[]) {
  if (allowedIds.length === 0) {
    return process.env.NODE_ENV === 'production' ? [] : playlists;
  }

  return playlists.filter((playlist) => allowedIds.includes(playlist.id));
}

// ─── Spotify Auth ─────────────────────────────────────────────────────────────

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Spotify credentials (CLIENT_ID / CLIENT_SECRET / REFRESH_TOKEN) are not configured in .env');
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
    // Next.js handles token cache centrally if we wrap this in unstable_cache, but keeping it fresh here ensures the token works.
    cache: 'no-store',
  });

  if (!response.ok) {
    let body = await response.text();
    // Sanitize any potential leakage of the refresh token in the response body log
    body = body.split(refreshToken).join('[REDACTED]');
    console.error('[Spotify] Token refresh failed:', response.status, body);
    throw new Error(`Spotify token refresh failed (HTTP ${response.status})`);
  }

  const data = await response.json();
  return data.access_token as string;
}

// ─── Playlist Fetcher ─────────────────────────────────────────────────────────

async function fetchFromSpotify(allowedIds: string[]): Promise<NormalizedPlaylist[]> {
  const token = await getAccessToken();

  const playlists: SpotifyPlaylist[] = [];
  let nextUrl: string | null = 'https://api.spotify.com/v1/me/playlists?limit=50';

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: { Authorization: `Bearer ${token}` },
      // Use Next.js Data Cache for 1 hour to handle serverless caching globally
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error('[Spotify] Playlist fetch failed:', response.status);
      throw new Error(`Spotify playlist fetch failed (HTTP ${response.status})`);
    }

    const data: SpotifyPlaylistsResponse = await response.json();
    playlists.push(...(data.items ?? []));
    nextUrl = data.next ?? null;
  }

  const normalized = playlists.map((pl): NormalizedPlaylist => ({
    id: pl.id,
    name: pl.name,
    image: pl.images?.[0]?.url ?? null,
    description: pl.description?.trim() || 'No description available.',
    url: pl.external_urls?.spotify ?? pl.href ?? '',
    trackCount: typeof pl.tracks === 'number' 
      ? pl.tracks 
      : (pl.tracks?.total ?? pl.items?.total ?? pl.trackCount ?? 0),
  }));

  return applyAllowlist(normalized, allowedIds);
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const allowedIds = getAllowedPlaylistIds();

  try {
    const playlists = await fetchFromSpotify(allowedIds);

    // Write to disk cache for local dev or build artifact fallback
    writeDiskCache(playlists);



    return NextResponse.json(
      { items: playlists, total: playlists.length, source: 'spotify-api' },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' } }
    );
  } catch (err: any) {
    const sanitizeStr = (str: string) => {
      const token = process.env.SPOTIFY_REFRESH_TOKEN;
      return token ? str.split(token).join('[REDACTED]') : str;
    };
    const errorMessage = sanitizeStr(err?.message || 'Unknown error');
    console.error('[Spotify] API fetch failed, falling back to disk cache:', errorMessage);

    return handleFallback(allowedIds, errorMessage);
  }
}

function handleFallback(allowedIds: string[], reason: string) {
  const cached = readDiskCache();
  const filteredCached = cached ? applyAllowlist(cached, allowedIds) : [];
  if (filteredCached.length > 0) {


    return NextResponse.json(
      { items: filteredCached, total: filteredCached.length, source: 'disk-cache' },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' } }
    );
  }

  console.warn('[Spotify] No cache available. Returning empty.');
  return NextResponse.json(
    { items: [], total: 0, source: 'none' },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}
