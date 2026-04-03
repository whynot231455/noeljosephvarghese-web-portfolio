import { NextResponse } from 'next/server';

type SpotifyPlaylist = {
  id: string;
  name: string;
  images: { url: string; height?: number; width?: number }[];
  description?: string;
  external_urls?: { spotify?: string };
  tracks?: { total: number };
  href?: string;
};

type SpotifyPlaylistsResponse = {
  items: SpotifyPlaylist[];
  href?: string;
  limit?: number;
  next?: string | null;
  total?: number;
  previous?: string | null;
};

export async function GET() {
  const token = process.env.SPOTIFY_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Spotify token not configured' }, { status: 500 });
  }

  try {
    const res = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      return NextResponse.json({ error: 'Failed to fetch playlists', detail: errorBody }, { status: res.status });
    }

    const data: SpotifyPlaylistsResponse = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Network error', detail: (err as Error).message }, { status: 500 });
  }
}
