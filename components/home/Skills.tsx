"use client";


import { motion } from "framer-motion";
import { 
  Video, 
  Camera, 
  Layout, 
  Terminal, 
  Atom, 
  FileCode2, 
  Code2, 
  Palette, 
  FileJson, 
  Database
} from "lucide-react";
import { useMode } from "@/lib/ModeContext";
import { cn } from "@/lib/utils";

const creativeSkills = [
  { name: "Video Editing", icon: Video, color: "text-primary", span: "md:col-span-4 md:row-span-2", id: "VID-01" },
  { name: "Photo Editing", icon: Camera, color: "text-primary", span: "md:col-span-2 md:row-span-1", id: "IMG-02" },
  { name: "UI UX Designs", icon: Layout, color: "text-primary", span: "md:col-span-2 md:row-span-1", id: "DES-03" },
];

const developerSkills = [
  { name: "Python", icon: Terminal, color: "text-[#ff7b72]", span: "md:col-span-4 md:row-span-2", id: "PY-01" },
  { name: "React", icon: Atom, color: "text-[#79c0ff]", span: "md:col-span-2 md:row-span-2", id: "RE-02" },
  { name: "Typescript", icon: FileCode2, color: "text-[#79c0ff]", span: "md:col-span-3 md:row-span-1", id: "TS-03" },
  { name: "SQL", icon: Database, color: "text-[#7ee787]", span: "md:col-span-3 md:row-span-1", id: "DB-04" },
  { name: "Javascript", icon: FileJson, color: "text-[#f2e05a]", span: "md:col-span-2 md:row-span-1", id: "JS-05" },
  { name: "HTML", icon: Code2, color: "text-[#ffa657]", span: "md:col-span-2 md:row-span-1", id: "ML-06" },
  { name: "CSS", icon: Palette, color: "text-[#d2a8ff]", span: "md:col-span-2 md:row-span-1", id: "ST-07" },
];

export const Skills = () => {
  const { mode } = useMode();

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-l-4 border-primary pl-8"
        >
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary/60 block">
              Capabilities
            </span>
            <h2 className={cn(
              "text-5xl md:text-8xl font-display uppercase tracking-tighter leading-none",
              mode === "developer" ? "text-[#f0f6fc]" : "text-foreground"
            )}>
              My <span className="text-stroke-primary text-transparent">Skills</span>
            </h2>
          </div>
          
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8b949e] max-w-[200px] leading-relaxed opacity-50">
            {mode === "developer" 
              ? "// System diagnostic: All modules operational and ready for deployment."
              : "Curated expertise at the intersection of aesthetic and motion."}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[160px] md:auto-rows-[180px] gap-4">
          {mode === "creative" ? (
            creativeSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-primary/10 bg-[#FFFDF7] p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5",
                  skill.span
                )}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                  <skill.icon size={skill.span.includes('row-span-2') ? 220 : 120} strokeWidth={1} />
                </div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:rotate-6 transition-transform duration-500">
                      <skill.icon size={24} />
                    </div>
                    <span className="font-serif italic text-primary/30 text-xs">
                      {skill.id}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className={cn(
                      "font-display uppercase tracking-tight text-foreground line-clamp-2",
                      skill.span.includes('row-span-2') ? "text-4xl md:text-5xl" : "text-2xl"
                    )}>
                      {skill.name}
                    </h3>
                    <div className="h-0.5 w-8 bg-primary/20 mt-4 group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            developerSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] p-6 transition-all duration-300 hover:border-primary/50 hover:bg-[#1c2128]",
                  skill.span
                )}
              >
                {/* Blueprint grid background for larger cards */}
                {skill.span.includes('row-span-2') && (
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                       style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                )}

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className={cn(
                      "p-3 rounded-lg bg-[#0D1117] border border-[#30363d] group-hover:border-primary/30 transition-colors shadow-inner",
                      skill.color
                    )}>
                      <skill.icon size={20} />
                    </div>
                    <div className="flex flex-col items-end gap-1 opacity-20 font-mono text-[8px] tracking-widest text-[#8b949e]">
                       <span>{skill.id}</span>
                       <span className="animate-pulse">STATUS: OK</span>
                    </div>
                  </div>

                  <div>
                    <h3 className={cn(
                      "font-mono text-[#f0f6fc] tracking-tight group-hover:text-primary transition-colors",
                      skill.span.includes('row-span-2') ? "text-3xl" : "text-lg"
                    )}>
                      {skill.name}
                    </h3>
                    <div className="mt-4 flex items-center gap-4 overflow-hidden">
                       <div className="flex gap-1.5 flex-shrink-0">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-all duration-500", i < 4 ? skill.color.replace('text', 'bg') : "bg-[#30363d] group-hover:bg-primary/20")} />
                          ))}
                       </div>
                       <div className="h-[1px] w-full bg-[#30363d] opacity-50 group-hover:bg-primary/20 transition-all duration-500" />
                    </div>
                  </div>
                </div>

                {/* Corner accent for industrial feel */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/0 group-hover:border-primary/50 transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/0 group-hover:border-primary/50 transition-all duration-300" />
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Background decorations */}
      {mode === "creative" ? (
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      ) : (
        <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#1f6feb 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      )}
    </section>
  );
};
