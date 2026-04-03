"use client";

import React, { useEffect, useState } from "react";

type SpotifyPlaylist = {
  id: string;
  name: string;
  images: { url: string; height?: number; width?: number }[];
  description?: string;
  external_urls?: { spotify?: string };
  tracks?: { total: number };
  href?: string;
};

export const SpotifyPlaylists: React.FC = () => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/spotify/playlists")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const items = (data?.items ?? []) as SpotifyPlaylist[];
        setPlaylists(items);
        setLoading(false);
      })
      .catch((err) => {
        setError((err as Error).message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="spotify-playlists" className="py-40 px-8 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-display uppercase tracking-tighter mb-6">Spotify Playlists</h2>
        <p className="opacity-70 mb-8">Curated playlists updated via the Spotify API. Authentication is required to fetch your private playlists.</p>

        {loading && <p>Loading playlists…</p>}
        {error && <p className="text-red-500">Error loading playlists: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlists.map((pl) => {
            const img = pl.images?.[0]?.url ?? "https://picsum.photos/seed/playlist/400/400";
            return (
              <a key={pl.id} href={pl.external_urls?.spotify ?? pl.href ?? '#'} target="_blank" rel="noreferrer" className="group block rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full overflow-hidden">
                  <img src={img} alt={pl.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-bold text-lg line-clamp-1 mb-1">{pl.name}</div>
                  {pl.tracks?.total != null && (
                    <div className="text-sm text-gray-500">{pl.tracks.total} tracks</div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
