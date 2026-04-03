"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Cpu, Globe } from "lucide-react";

import { TerminalWindow } from "@/components/shared/TerminalWindow";
import { SegmentedText } from "@/components/shared/SegmentedText";

export const DeveloperHero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-4 md:px-8 relative overflow-hidden bg-[#0D1117] text-[#f0f6fc]">
      <div className="max-w-7xl mx-auto">
        <TerminalWindow title="Noel@Developer: ~ /portfolio-research-preview">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-[0.2em]">
                <Terminal size={14} />
                <span>Software Engineer & Architect</span>
              </div>
              
              <div className="py-4">
                <SegmentedText 
                  text="Noel Joseph Varghese" 
                  size={6} 
                  charGap={12}
                  lineGap={24}
                  className="max-w-full"
                />
              </div>

              <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-lg font-mono text-xs md:text-sm text-[#8b949e] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/30" />
                <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">profile</span> = {"{"} <br />
                &nbsp;&nbsp;<span className="text-[#7ee787]">role:</span> <span className="text-[#a5d6ff]">"Full Stack Developer"</span>, <br />
                &nbsp;&nbsp;<span className="text-[#7ee787]">focus:</span> [<span className="text-[#a5d6ff]">"Next.js"</span>, <span className="text-[#a5d6ff]">"AI Integration"</span>, <span className="text-[#a5d6ff]">"Edge Computing"</span>], <br />
                &nbsp;&nbsp;<span className="text-[#7ee787]">status:</span> <span className="text-[#a5d6ff]">"Optimizing digital performance"</span> <br />
                {"}"};
              </div>

              <div className="flex gap-6 pt-2">
                <div className="flex flex-col items-center gap-2">
                   <Cpu className="text-primary" size={20} />
                   <span className="text-[10px] font-mono uppercase text-[#8b949e]">Backend</span>
                </div>
                <div className="w-px h-10 bg-[#30363d]" />
                <div className="flex flex-col items-center gap-2">
                   <Globe className="text-primary" size={20} />
                   <span className="text-[10px] font-mono uppercase text-[#8b949e]">Edge</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-square flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  borderRadius: ["20% 40% 60% 80%", "80% 60% 40% 20%", "20% 40% 60% 80%"]
                }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-0 bg-primary/10 border border-primary/20 backdrop-blur-3xl"
              />
              <div className="relative z-10">
                <Code size={160} className="text-primary/40" />
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>

      {/* Decorative Matrix-style background */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-5 overflow-hidden">
        <ClientOnlyMatrix />
      </div>
    </section>
  );
};

const ClientOnlyMatrix = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col font-mono text-[8px] leading-none text-primary">
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} className="whitespace-nowrap">
          {Array.from({ length: 200 }).map(() => Math.round(Math.random())).join(' ')}
        </div>
      ))}
    </div>
  );
};
