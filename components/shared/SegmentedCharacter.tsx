"use client";

import React from "react";
import { motion } from "framer-motion";
import { CHARACTER_MAP } from "@/lib/character-map";
import { cn } from "@/lib/utils";

interface SegmentedCharacterProps {
  char: string;
  size?: number; // Base size of each grid cell in px
  activeColor?: string;
  className?: string;
  staggerIndex?: number; // For stagger animation
}

export const SegmentedCharacter = ({
  char,
  size = 12,
  activeColor = "var(--primary)",
  className,
  staggerIndex = 0,
}: SegmentedCharacterProps) => {
  const normalizedChar = char.toUpperCase();
  const activeIndices = CHARACTER_MAP[normalizedChar] || [];

  return (
    <div
      className={cn("grid grid-cols-5 gap-[1px]", className)}
      style={{
        width: size * 5 + 4, // 5 cols + gaps
        height: size * 7 + 6, // 7 rows + gaps
      }}
    >
      {Array.from({ length: 35 }).map((_, i) => {
        const isActive = activeIndices.includes(i);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isActive ? { 
              opacity: 1, 
              scale: 1,
              transition: { 
                delay: staggerIndex * 0.1 + (i % 5) * 0.02 + Math.floor(i / 5) * 0.02 
              } 
            } : { opacity: 0 }}
            className="rounded-[1px]"
            style={{
              width: size,
              height: size,
              backgroundColor: isActive ? activeColor : "transparent",
              boxShadow: isActive ? `2px 2px 0px rgba(0,0,0,0.3)` : "none",
            }}
          />
        );
      })}
    </div>
  );
};
