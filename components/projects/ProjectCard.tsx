"use client";


import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn, sanitizeUrl } from "@/lib/utils";
import { useMode } from "@/lib/ModeContext";
import type { ProjectRecord } from "@/lib/projects";

import Image from "next/image";

type Project = ProjectRecord;

export const ProjectCard = ({ project, priority = false }: { project: Project; priority?: boolean }) => {
  const { mode } = useMode();
  const tags = Array.isArray(project.tags) ? project.tags : [];

  // Determine the primary link for the entire card
  const primaryUrl = sanitizeUrl(project.liveUrl || project.repoUrl || project.figmaUrl);

  return (
    <motion.a
      layout
      href={primaryUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      whileHover={mode === "creative" ? { y: -12, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } : {}}
      className={cn(
        "group relative block overflow-hidden transition-all duration-700 cursor-pointer",
        mode === "creative" 
          ? "bg-white border border-[#1a1a1a]/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]" 
          : "bg-[#0d1117] border border-[#30363d] hover:border-primary/50"
      )}
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <Image 
          src={project.coverImage} 
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            mode === "creative" 
              ? "group-hover:scale-105" 
              : "opacity-40 group-hover:opacity-80 group-hover:scale-110 blur-[2px] group-hover:blur-0"
          )}
          unoptimized={project.coverImage.includes('picsum.photos')}
        />
        
        {/* Mode Specific Overlays */}
        {mode === "developer" && (
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
               <motion.div 
                 animate={{ y: ["0%", "100%", "0%"] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="w-full h-[1px] bg-primary/40 shadow-[0_0_10px_rgba(232,99,74,1)]"
               />
            </div>
          </div>
        )}

        {/* Cinematic Primary Action Overlay (Minimalist) */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             className={cn(
               "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md",
               mode === "creative" ? "bg-white/90 text-primary" : "bg-primary text-white"
             )}
           >
             <ArrowUpRight size={32} />
           </motion.div>
        </div>
      </div>

      <div className="p-10 space-y-4 relative">
        {mode === "developer" && (
           <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-20 transition-opacity text-[8px] font-mono leading-none">
             HEX_0x{project.id.slice(0, 4)}<br/>
             PTR_REF_AA7
           </div>
        )}

        <div className="flex justify-between items-start">
            <span className={cn(
              "text-[10px] font-mono uppercase tracking-[0.3em]",
              mode === "creative" ? "text-primary/60" : "text-primary shadow-[0_0_5px_rgba(232,99,74,0.3)]"
            )}>
              {project.category}
            </span>
            <div className="text-primary">
              <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
        </div>
        
        <h3 className={cn(
          "text-3xl font-display uppercase tracking-tight leading-none transition-colors",
          mode === "creative" ? "group-hover:text-primary" : "text-white"
        )}>
          {project.title}
        </h3>
        
        <p className={cn(
          "text-[15px] font-light leading-relaxed line-clamp-2 transition-colors",
          mode === "creative" ? "text-foreground/60 font-serif" : "text-[#8b949e] font-mono text-[13px]"
        )}>
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-2 pt-4">
          {tags.map(tag => (
            <span 
              key={tag} 
              className={cn(
                "text-[9px] font-mono uppercase px-2 py-0.5 border transition-all duration-300",
                mode === "creative" 
                  ? "bg-primary/5 border-primary/10 text-primary rounded-full shadow-sm" 
                  : "bg-transparent border-[#30363d] text-[#8b949e] group-hover:border-primary/40 group-hover:text-primary"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};
