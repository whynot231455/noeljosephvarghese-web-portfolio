"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/lib/ModeContext";
import { ProjectCard } from "./ProjectCard";
import projectsData from "@/content/projects.json";

type ProjectType = {
  id: string;
  title: string;
  category: string;
  summary: string;
  coverImage: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  publishedAt: string;
};

export const ProjectGrid = () => {
  const { mode } = useMode();
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    const isCreative = mode === "creative";
    const categoriesToShow = isCreative ? ["uiux", "photo", "video"] : ["dev"];
    
    const filtered = projectsData.filter((project: ProjectType) => 
      categoriesToShow.includes(project.category) && project.featured
    );
    
    setFilteredProjects(filtered);
  }, [mode]);

  return (
    <section id="work" className="py-32 px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-primary/20 pb-12">
           <div className="space-y-4">
             <span className="text-primary font-mono text-sm uppercase tracking-[0.3em]">
               Selected Works
             </span>
             <h2 className="text-5xl md:text-8xl font-display uppercase leading-[0.8] tracking-tighter">
               Curated <br /> Portfolio
             </h2>
           </div>
           
           <p className="max-w-sm text-lg font-light leading-relaxed opacity-60 text-right">
             {mode === "creative" 
               ? "Visual-led projects focusing on aesthetic precision and user emotion." 
               : "Logic-driven applications focusing on performance, scalability, and code clarity."}
           </p>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 opacity-40 font-mono italic">
             No featured projects found for {mode} mode.
          </div>
        )}
      </div>
    </section>
  );
};
