"use client";


import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/lib/ModeContext";
import { ProjectCard } from "./ProjectCard";
import projectsData from "@/content/projects.json";
import { cn } from "@/lib/utils";
import type { ProjectRecord } from "@/lib/projects";



export const ProjectGrid = () => {
  const { mode } = useMode();
  const isCreative = mode === "creative";
  const categoriesToShow = isCreative ? ["uiux", "photo", "video"] : ["dev", "software"];
  const filteredProjects = (projectsData as ProjectRecord[]).filter(
    (project) => categoriesToShow.includes(project.category) && project.featured
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="work" className={cn(
      "py-32 px-8 transition-colors duration-1000",
      mode === "creative" ? "bg-[#FFFDF7]" : "bg-[#010409]"
    )}>
      <div className="max-w-7xl mx-auto space-y-20">
        <div className={cn(
          "flex flex-col md:flex-row justify-between items-end gap-12 border-b pb-12 transition-colors duration-500",
          mode === "creative" ? "border-[#1a1a1a]/10" : "border-[#30363d]"
        )}>
           <div className="space-y-4">
             <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-primary font-mono text-sm uppercase tracking-[0.3em] block"
              >
               Selected Works
             </motion.span>
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-5xl md:text-8xl font-display uppercase leading-[0.8] tracking-tighter"
              >
               Curated <br /> Portfolio
             </motion.h2>
           </div>
           
           <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="max-w-sm text-lg font-light leading-relaxed opacity-60 md:text-right"
            >
             {mode === "creative" 
               ? "Visual-led projects focusing on aesthetic precision and user emotion." 
               : "Logic-driven applications focusing on performance, scalability, and code clarity."}
           </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={`${mode}-${project.id}`} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 opacity-40 font-mono italic"
          >
             No featured projects found for {mode} mode.
          </motion.div>
        )}
      </div>
    </section>
  );
};
