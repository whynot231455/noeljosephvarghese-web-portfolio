"use client";

import React from "react";
import { motion } from "framer-motion";
import { useMode } from "@/lib/ModeContext";
import { Palette, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
}

export const ModeToggle = ({ className }: ModeToggleProps) => {
  const { mode, toggleMode } = useMode();

  return (
    <div className={cn("relative", className)}>
      <motion.button
        onClick={toggleMode}
        aria-label={`Switch to ${mode === "creative" ? "developer" : "creative"} mode`}
        className={cn(
          "relative flex items-center p-1 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-all duration-500",
          "w-[220px] h-10 overflow-hidden"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Sliding Background Pill */}
        <motion.div
          animate={{ x: mode === "creative" ? 0 : 106 }}
          className={cn(
            "absolute left-1 w-[106px] h-8 rounded-full z-0 shadow-lg transition-colors duration-500",
            mode === "creative" ? "bg-primary" : "bg-primary"
          )}
          transition={{ 
            type: "spring", 
            stiffness: 500, // Slightly higher stiffness for crunchier snap
            damping: 30, // Balanced damping
            mass: 0.8 // Lighter weight for faster response
          }}
        />

        <div className="flex w-full relative z-10 h-full">
          <div className="flex-1 flex items-center justify-center gap-1.5 truncate">
            <Palette size={12} className={cn("transition-colors duration-500 shrink-0", mode === "creative" ? "text-white" : "text-foreground/40")} />
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-500",
              mode === "creative" ? "text-white" : "text-foreground/40"
            )}>
              Creative
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5 truncate">
            <Terminal size={12} className={cn("transition-colors duration-500 shrink-0", mode === "developer" ? "text-white" : "text-foreground/40")} />
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-500",
              mode === "developer" ? "text-white" : "text-foreground/40"
            )}>
              Developer
            </span>
          </div>
        </div>
      </motion.button>
    </div>
  );
};
