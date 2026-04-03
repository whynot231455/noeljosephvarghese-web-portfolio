"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const TerminalWindow = ({
  children,
  title = "Welcome to the Portfolio research preview!",
  className,
}: TerminalWindowProps) => {
  return (
    <div className={cn(
      "border border-[#30363d] bg-[#0D1117] rounded-xl overflow-hidden shadow-2xl",
      className
    )}>
      {/* OS Header Bar */}
      <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-[#30363d]">
        <div className="flex gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
      </div>

      {/* Info Bar (like the reference image) */}
      <div className="px-6 py-3 border-b border-[#D97757]/30 bg-[#D97757]/5 flex items-center gap-2 font-mono text-xs md:text-sm text-[#D97757]/80">
        <span className="text-[#D97757]">*</span>
        <span>{title}</span>
      </div>

      {/* Terminal Content */}
      <div className="p-8 md:p-12 font-mono min-h-[400px]">
        {children}
      </div>
    </div>
  );
};
