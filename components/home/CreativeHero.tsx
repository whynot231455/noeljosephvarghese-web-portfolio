"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export const CreativeHero = () => {
  return (
    <section className="min-h-screen pt-44 pb-20 px-8 relative overflow-hidden bg-[#FFFDF7]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto flex flex-col items-center text-center"
      >
        <span className="font-serif text-lg md:text-2xl text-primary italic mb-6 tracking-wide drop-shadow-sm">
          UI/UX Designer & Cinematic Editor
        </span>
        
        <h1 className="text-[12vw] md:text-[8vw] font-display leading-[0.85] uppercase tracking-[-0.04em] text-foreground mb-12">
          Noel Joseph <br />
          Varghese
        </h1>

        <div className="flex flex-col md:flex-row gap-8 items-center text-left max-w-4xl mx-auto">
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/80 font-light flex-1">
            Creating immersive digital experiences through deliberate 
            visual storytelling and meticulous user research. All in pursuit 
            of the perfect pixel.
          </p>
          <div className="flex-none">
             <motion.button
              whileHover={{ rotate: 15 }}
              className="w-24 h-24 rounded-full border border-primary flex items-center justify-center text-primary"
            >
              <ArrowDownRight size={40} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Decorative Text in background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 select-none opacity-[0.03]">
        <span className="text-[25vw] font-display uppercase leading-none block">CREATIVE</span>
      </div>
    </section>
  );
};
