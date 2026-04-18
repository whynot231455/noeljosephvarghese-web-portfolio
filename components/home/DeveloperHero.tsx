import { motion, useReducedMotion } from "framer-motion";
import { Terminal, Cpu, Globe } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { TerminalWindow } from "@/components/shared/TerminalWindow";
import { SegmentedText } from "@/components/shared/SegmentedText";

export const DeveloperHero = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
    },
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (i: number) => ({
      width: "100%",
      opacity: 1,
      transition: {
        width: { delay: shouldReduceMotion ? 0.3 + i * 0.05 : 1.2 + i * 0.1, duration: 0.8, ease: "easeOut" },
        opacity: { delay: shouldReduceMotion ? 0.3 + i * 0.05 : 1.2 + i * 0.1, duration: 0.2 }
      } as any
    }),
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 md:px-8 relative overflow-hidden bg-[#0D1117] text-[#f0f6fc]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <TerminalWindow title="Noel@Developer: ~ /portfolio-research-preview">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-[0.2em]">
                <Terminal size={14} />
                <span>AI & Data Engineer</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="py-4">
                <SegmentedText 
                  text="Noel Joseph Varghese" 
                  size={6} 
                  charGap={12}
                  lineGap={24}
                  className="max-w-full"
                />
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="p-5 bg-[#161b22] border border-[#30363d] rounded-lg font-mono text-xs md:text-sm text-[#8b949e] relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/30" />
                
                <div className="space-y-1">
                  {[
                    <div key="1"><span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">profile</span> = {"{"}</div>,
                    <div key="2">&nbsp;&nbsp;<span className="text-[#7ee787]">role:</span> <span className="text-[#a5d6ff]">&quot;AI & Data Engineer&quot;</span>,</div>,
                    <div key="3">&nbsp;&nbsp;<span className="text-[#7ee787]">focus:</span> [<span className="text-[#a5d6ff]">&quot;Machine Learning&quot;</span>, <span className="text-[#a5d6ff]">&quot;AI Integration&quot;</span>, <span className="text-[#a5d6ff]">&quot;LLM Applications&quot;</span>],</div>,
                    <div key="4">&nbsp;&nbsp;<span className="text-[#7ee787]">status:</span> <span className="text-[#a5d6ff]">&quot;Building intelligent systems&quot;</span></div>,
                    <div key="5">{"}"};</div>
                  ].map((line, i) => (
                    <motion.div 
                      key={i}
                      custom={i}
                      variants={lineVariants}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-6 pt-2">
                <div className="flex flex-col items-start gap-2 group cursor-crosshair">
                   <div className="flex items-center gap-2 text-primary">
                     <Cpu size={16} />
                     <span className="text-[10px] font-mono uppercase tracking-widest">Backend</span>
                   </div>
                   <div className="flex gap-1">
                      {[1,1,1,1,0].map((v, i) => (
                        <div key={i} className={cn("w-1 h-1 rounded-full", v ? "bg-primary" : "bg-[#30363d]")} />
                      ))}
                   </div>
                </div>
                
                <div className="w-px h-8 bg-[#30363d]" />
                
                <div className="flex flex-col items-start gap-2 group cursor-crosshair">
                   <div className="flex items-center gap-2 text-primary">
                     <Globe size={16} />
                     <span className="text-[10px] font-mono uppercase tracking-widest">Edge</span>
                   </div>
                   <div className="flex gap-1">
                      {[1,1,1,0,0].map((v, i) => (
                        <div key={i} className={cn("w-1 h-1 rounded-full", v ? "bg-primary" : "bg-[#30363d]")} />
                      ))}
                   </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants} 
              className="hidden md:flex relative aspect-[4/5] md:aspect-square items-center justify-center rounded-xl overflow-hidden border border-[#30363d] bg-[#161b22] group"
            >
              {/* Scanline effect overlay */}
              <div className="absolute inset-0 z-20 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px' }} />
              
              {/* Terminal-like tint overlay */}
              <div className="absolute inset-0 z-10 bg-primary/20 mix-blend-color pointer-events-none transition-opacity duration-500 group-hover:opacity-10" />
              
              <Image 
                src="/pixel_char.jpg" 
                alt="Developer Profile"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center contrast-110 brightness-95 transition-all duration-700 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-105"
                priority
              />
            </motion.div>
          </div>
        </TerminalWindow>
      </motion.div>
    </section>
  );
};
