import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

// ─── In-Memory Cache ──────────────────────────────────────────────────────────
// Lives for the lifetime of the server process. Refreshes after TTL expires.

const CACHE_TTL_MS = 60 * 60 * 1000; // 60 minutes

let memoryCache: {
  data: NormalizedPlaylist[];
  fetchedAt: number;
} | null = null;

/**
 * Resets the in-memory cache. 
 * Exported only for testing purposes to ensure test isolation.
 */
export function _resetCache() {
  memoryCache = null;
}

// ─── Disk Cache ───────────────────────────────────────────────────────────────
// Written on every successful Spotify fetch. Read as fallback on API failure.

const DISK_CACHE_PATH = path.join(process.cwd(), 'content', 'playlists.cache.json');

function readDiskCache(): NormalizedPlaylist[] | null {
  try {
    if (!fs.existsSync(DISK_CACHE_PATH)) return null;
    const raw = fs.readFileSync(DISK_CACHE_PATH, 'utf-8');
    return JSON.parse(raw) as NormalizedPlaylist[];
  } catch {
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
    // No Next.js cache on auth — always fresh token
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
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
      cache: 'no-store',
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
    // Spotify API structure varies slightly between endpoints, being robust here
    trackCount: typeof pl.tracks === 'number' 
      ? pl.tracks 
      : (pl.tracks?.total ?? pl.items?.total ?? pl.trackCount ?? 0),
  }));

  return applyAllowlist(normalized, allowedIds);
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('refresh') === 'true' && process.env.NODE_ENV === 'development';
  const allowedIds = getAllowedPlaylistIds();

  // [Layer 1] Serve from in-memory cache if still fresh and not forced
  if (!forceRefresh && memoryCache && Date.now() - memoryCache.fetchedAt < CACHE_TTL_MS) {
    console.log('[Spotify Cache] Serving from memory cache');
    const items = applyAllowlist(memoryCache.data, allowedIds);
    return NextResponse.json(
      { items, total: items.length, source: 'memory-cache' },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' } }
    );
  }

  // [Layer 2] Fetch from Spotify API
  try {
    const playlists = await fetchFromSpotify(allowedIds);

    // Success — update both caches
    memoryCache = { data: playlists, fetchedAt: Date.now() };
    writeDiskCache(playlists);

    console.log(`[Spotify Cache] Fetched ${playlists.length} playlists from Spotify API`);

    return NextResponse.json(
      { items: playlists, total: playlists.length, source: 'spotify-api' },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' } }
    );
  } catch (err) {
    console.error('[Spotify] API fetch failed, falling back to disk cache:', err);

    // [Layer 3] Serve stale disk cache as fallback
    const cached = readDiskCache();
    const filteredCached = cached ? applyAllowlist(cached, allowedIds) : [];
    if (filteredCached.length > 0) {
      console.log('[Spotify Cache] Serving from disk cache (stale fallback)');

      // Also repopulate memory cache from disk so next request is fast
      memoryCache = { data: filteredCached, fetchedAt: Date.now() - CACHE_TTL_MS + 5 * 60 * 1000 };

      return NextResponse.json(
        { items: filteredCached, total: filteredCached.length, source: 'disk-cache' },
        { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' } }
      );
    }

    // [Layer 3 miss] No cache at all — return empty, not an error
    console.warn('[Spotify] No cache available. Returning empty.');
    return NextResponse.json(
      { items: [], total: 0, source: 'none' },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
