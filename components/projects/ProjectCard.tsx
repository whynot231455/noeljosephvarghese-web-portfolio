"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMode } from "@/lib/ModeContext";

import Image from "next/image";

interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  coverImage: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export const ProjectCard = ({ project }: { project: Project }) => {
  const { mode } = useMode();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={cn(
        "group relative overflow-hidden transition-all duration-500",
        mode === "creative" 
          ? "bg-white border-2 border-[#1a1a1a]/5 hover:border-primary/50" 
          : "bg-[#161b22] border border-[#30363d] hover:border-primary/50"
      )}
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <Image 
          src={project.coverImage} 
          alt={project.title}
          fill
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          unoptimized={project.coverImage.includes('picsum.photos')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
           <div className="flex gap-4">
             {project.repoUrl && (
               <a href={project.repoUrl} className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center">
                 <Github size={20} />
               </a>
             )}
             {project.liveUrl && (
               <a href={project.liveUrl} className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center">
                 <ExternalLink size={20} />
               </a>
             )}
           </div>
        </div>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
           <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
             {project.category}
           </span>
           <motion.div
            whileHover={{ rotate: 45 }}
            className="text-primary cursor-pointer"
           >
            <ArrowUpRight size={24} />
           </motion.div>
        </div>
        
        <h3 className="text-3xl font-display uppercase tracking-tight leading-none">
          {project.title}
        </h3>
        
        <p className={cn(
          "text-sm font-light leading-relaxed line-clamp-2",
          mode === "creative" ? "text-foreground/60" : "text-[#8b949e]"
        )}>
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-2 pt-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono uppercase px-2 py-1 bg-primary/5 border border-primary/10 text-primary">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
