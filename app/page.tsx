"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/shared/Navbar";
import { CreativeHero } from "@/components/home/CreativeHero";
import { DeveloperHero } from "@/components/home/DeveloperHero";
import { ModeToggle } from "@/components/home/ModeToggle";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SpotifyPlaylists } from "@/components/spotify/SpotifyPlaylists";
import { useMode } from "@/lib/ModeContext";

export default function Home() {
  const { mode } = useMode();

  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {mode === "creative" ? <CreativeHero /> : <DeveloperHero />}
        </motion.div>
      </AnimatePresence>

      <ProjectGrid />

      <SpotifyPlaylists />
      
      {/* Contact Section */}
      <section id="contact" className="py-40 px-8 bg-foreground text-background">
         <div className="max-w-7xl mx-auto text-center space-y-12">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.4em]">Get in touch</span>
            <h2 className="text-6xl md:text-[10vw] font-display uppercase tracking-tighter leading-none">
               Let's <span className="text-stroke-primary text-transparent">Collaborate</span>
            </h2>
            <div className="flex flex-col items-center gap-8">
               <p className="max-w-xl text-xl opacity-60 font-light">
                  Whether you have a vision for a cinematic brand film or a complex technical 
                  challenge, I'm ready to bring my dual-identity expertise to your next project.
               </p>
               <a 
                href="mailto:hello@noel.com" 
                className="text-4xl md:text-6xl font-display uppercase hover:text-primary transition-colors border-b-4 border-primary pb-2"
               >
                noeljosephvarghese@gmail.com
               </a>
            </div>
         </div>
      </section>

      <footer className="py-20 px-8 border-t border-white/10 text-center opacity-40 font-mono text-[10px] uppercase tracking-widest">
         © 2026 Noel Joseph Varghese.
      </footer>
    </main>
  );
}
