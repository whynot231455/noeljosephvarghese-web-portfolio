import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import fs from 'fs';

// Mock NextResponse.json
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data, init) => ({
      data,
      status: init?.status ?? 200,
      headers: init?.headers ?? {},
    })),
  },
}));

// Mock fs and path to avoid touching the real disk cache
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
  },
}));

describe('Spotify Playlists API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();

    
    // Correct Environment Variables for the implementation
    process.env.SPOTIFY_CLIENT_ID = 'test-client-id';
    process.env.SPOTIFY_CLIENT_SECRET = 'test-client-secret';
    process.env.SPOTIFY_REFRESH_TOKEN = 'test-refresh-token';
    process.env.SPOTIFY_ALLOWED_PLAYLIST_IDS = ''; // Default to all

    global.fetch = vi.fn();
    
    // Mock fs behavior
    (fs.existsSync as any).mockReturnValue(false);
  });

  it('successfully fetches and normalizes playlists from API', async () => {
    // 1. Mock Access Token Response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: 'valid-token' }),
    });

    // 2. Mock Playlists Response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          {
            id: '1',
            name: 'Test Playlist',
            images: [{ url: 'https://test.com/img.jpg' }],
            description: 'Playlist description',
            external_urls: { spotify: 'https://spotify.com/pl1' },
            tracks: { total: 10 },
          },
        ],
        next: null,
      }),
    });

    const response = await GET(new Request('http://localhost/api/spotify/playlists'));

    expect(response.status).toBe(200);
    expect((response as any).data.items).toHaveLength(1);
    expect((response as any).data.source).toBe('spotify-api');
    expect((response as any).data.items[0].id).toBe('1');
  });

  it('falls back to disk cache when API fails', async () => {
    // Mock API failure
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    });

    // Mock disk cache existence and content
    (fs.existsSync as any).mockReturnValue(true);
    (fs.readFileSync as any).mockReturnValue(JSON.stringify([
      { id: 'cached-1', name: 'Cached Playlist', image: null, description: '', url: '', trackCount: 5 }
    ]));

    const response = await GET(new Request('http://localhost/api/spotify/playlists'));

    expect(response.status).toBe(200); // Resilient behavior
    expect((response as any).data.items).toHaveLength(1);
    expect((response as any).data.source).toBe('disk-cache');
    expect((response as any).data.items[0].id).toBe('cached-1');
  });

  it('returns empty list when both API and cache fail', async () => {
    // Mock API failure
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error',
    });

    // Mock no disk cache
    (fs.existsSync as any).mockReturnValue(false);

    const response = await GET(new Request('http://localhost/api/spotify/playlists'));

    expect(response.status).toBe(200); // Resilient behavior
    expect((response as any).data.items).toHaveLength(0);
    expect((response as any).data.source).toBe('none');
  });

  it('filters playlists based on allowed IDs list', async () => {
    process.env.SPOTIFY_ALLOWED_PLAYLIST_IDS = '1, 3';

    // 1. Mock Access Token Response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: 'valid-token' }),
    });

    // 2. Mock Playlists Response with multiple items
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          { id: '1', name: 'PL 1', images: [] },
          { id: '2', name: 'PL 2', images: [] },
          { id: '3', name: 'PL 3', images: [] },
        ],
        next: null,
      }),
    });

    const response = await GET(new Request('http://localhost/api/spotify/playlists'));

    expect(response.status).toBe(200);
    expect((response as any).data.items).toHaveLength(2);
    expect((response as any).data.items.map((i: any) => i.id)).toEqual(['1', '3']);
  });

  it('hides playlists in production when no allowlist is configured', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    process.env.SPOTIFY_ALLOWED_PLAYLIST_IDS = '';
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: 'valid-token' }),
    });

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [
          { id: '1', name: 'PL 1', images: [] },
        ],
        next: null,
      }),
    });

    const response = await GET(new Request('http://localhost/api/spotify/playlists'));

    expect(response.status).toBe(200);
    expect((response as any).data.items).toHaveLength(0);
    expect((response as any).data.source).toBe('spotify-api');
  });
});
