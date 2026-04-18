"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Music, Disc, AudioLines } from "lucide-react";
import { useMode } from "@/lib/ModeContext";
import { cn } from "@/lib/utils";

type SpotifyPlaylist = {
  id: string;
  name: string;
  image: string | null;
  description?: string;
  url: string;
  trackCount: number;
};

export const SpotifyPlaylists: React.FC = () => {
  const { mode } = useMode();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Carousel scroll handling
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPlaylists() {
      try {
        const response = await fetch("/api/spotify/playlists", {
          signal: controller.signal,
        });

        if (!response.ok) {
          console.warn(`[Spotify] API returned ${response.status}`);
          return;
        }

        const data = await response.json();
        const items = (data?.items ?? []) as SpotifyPlaylist[];
        setPlaylists(items);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.warn("[Spotify] Failed to load playlists:", (err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    }

    void loadPlaylists();

    return () => controller.abort();
  }, []);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      // Also check on window resize
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [playlists, loading]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const isDev = mode === "developer";

  return (
    <section
      id="spotify-playlists"
      className={cn(
        "py-32 px-4 md:px-8 transition-colors duration-700 overflow-hidden relative",
        isDev ? "bg-[#0D1117] text-[#f0f6fc]" : "bg-[#FFFDF7] text-foreground"
      )}
    >
      {/* Background Decorative Element */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-[0.03]",
        isDev ? "text-primary" : "text-primary"
      )}>
        <span className="text-[20vw] font-display uppercase whitespace-nowrap select-none leading-none pt-20 block">
          {isDev ? "VIBES_DATA" : "CURATED"}
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                isDev ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
              )}>
                {isDev ? <AudioLines size={20} /> : <Music size={20} />}
              </div>
              <span className={cn(
                "text-xs uppercase tracking-[0.4em] font-mono opacity-60 font-bold",
                !isDev && "text-primary italic"
              )}>
                Spotify Playlists
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={cn(
                "text-5xl md:text-8vw lg:text-7xl font-display leading-[0.9] uppercase tracking-tighter",
                !isDev && "tracking-tight"
              )}
            >
              Soundtrack of<br />
              <span className={isDev ? "text-primary" : "italic text-primary"}>my process</span>
            </motion.h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300",
                isDev 
                  ? "border-white/10 text-white/40 hover:border-primary hover:text-primary disabled:opacity-20" 
                  : "border-foreground/10 text-foreground/40 hover:border-primary hover:text-primary disabled:opacity-20"
              )}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300",
                isDev 
                  ? "border-white/10 text-white/40 hover:border-primary hover:text-primary disabled:opacity-20" 
                  : "border-foreground/10 text-foreground/40 hover:border-primary hover:text-primary disabled:opacity-20"
              )}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <Disc className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="font-mono text-sm uppercase tracking-widest opacity-60">Syncing with Spotify...</p>
          </div>
        ) : playlists.length === 0 ? null : (
          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-12 cursor-grab active:cursor-grabbing snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {/* Add spacer for leading alignment */}
            <div className="flex-none w-[1px]" />
            
            {playlists.map((pl, index) => {
              const img = pl.image ?? "https://picsum.photos/seed/playlist/800/800";
              return (
                <motion.div
                  key={pl.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex-none w-[280px] md:w-[350px] snap-start group"
                >
                  <a
                    href={pl.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block space-y-6"
                  >
                    {/* Image Container */}
                    <div className={cn(
                      "relative aspect-square w-full overflow-hidden transition-all duration-500",
                      isDev 
                        ? "rounded-lg border border-white/5 bg-[#161b22] group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(40,199,111,0.15)]" 
                        : "rounded-[2rem] shadow-xl group-hover:scale-105 group-hover:shadow-2xl"
                    )}>
                      {/* Dev-specific scanline overlay */}
                      {isDev && (
                        <div className="absolute inset-0 z-20 pointer-events-none opacity-20" 
                             style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.4) 50%)', backgroundSize: '100% 4px' }} />
                      )}
                      
                      <div className={cn(
                        "absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center",
                        isDev ? "bg-primary/20 backdrop-blur-sm" : "bg-primary/10 backdrop-blur-[2px]"
                      )}>
                        <div className="bg-white text-black p-4 rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 flex items-center justify-center">
                          <Music size={24} />
                        </div>
                      </div>

                      <Image
                        src={img}
                        alt={pl.name}
                        fill
                        sizes="(max-width: 768px) 280px, 350px"
                        className={cn(
                          "object-cover transition-all duration-700",
                          isDev ? "contrast-110" : "group-hover:scale-110"
                        )}
                      />
                    </div>

                    {/* Meta Section */}
                    <div className="space-y-3 px-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className={cn(
                          "text-xl md:text-2xl font-display leading-tight truncate",
                          isDev ? "uppercase tracking-tighter" : "tracking-tight"
                        )}>
                          {pl.name}
                        </h3>
                        <span className={cn(
                          "shrink-0 px-3 py-1 text-[9px] font-mono tracking-widest uppercase rounded-full border",
                          isDev 
                            ? "border-white/10 text-white/40 group-hover:border-primary group-hover:text-primary" 
                            : "border-foreground/10 text-foreground/40 group-hover:text-primary group-hover:border-primary/30"
                        )}>
                          {pl.trackCount} TRACKS
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
            
            {/* End spacer */}
            <div className="flex-none w-8" />
          </div>
        )}
        
        {/* Progress Bar Background */}
        {!loading && playlists.length > 0 && (
          <div className={cn(
            "h-[2px] w-full max-w-7xl relative mx-auto",
            isDev ? "bg-white/5" : "bg-foreground/5"
          )}>
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ 
                width: "100%",
                scaleX: 0, // Placeholder for scroll progress logic if needed
                transformOrigin: "left"
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

