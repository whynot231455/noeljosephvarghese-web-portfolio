import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, ExternalLink } from 'lucide-react';
import { Project } from '../../types';
import { PROJECTS } from '../../data';

export default function GalleryView() {
  const [filter, setFilter] = useState<'ALL' | 'AI_CODE' | 'DESIGN'>('ALL');

  // Read initial project from URL on mount
  const getProjectFromPath = (): Project | null => {
    const match = window.location.pathname.match(/^\/gallery\/(.+)$/i);
    if (match) {
      return PROJECTS.find(p => p.id === match[1]) || null;
    }
    return null;
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(getProjectFromPath);

  // Sync URL to selected project
  useEffect(() => {
    if (selectedProject) {
      const expected = `/gallery/${selectedProject.id}`;
      if (window.location.pathname !== expected) {
        window.history.pushState({ galleryProject: selectedProject.id }, '', expected);
      }
    } else {
      const plain = '/gallery';
      if (window.location.pathname !== plain && !window.location.pathname.match(/^\/gallery\/(.+)$/i)) {
        // already on /gallery, no need to push
      } else if (window.location.pathname !== plain) {
        window.history.pushState({ galleryProject: null }, '', plain);
      }
    }
  }, [selectedProject]);

  // Handle browser back/forward for project modals
  useEffect(() => {
    const handlePopState = () => {
      const project = getProjectFromPath();
      setSelectedProject(project);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Filter logic
  const filteredProjects = PROJECTS.filter(project => {
    if (filter === 'ALL') return true;
    if (filter === 'AI_CODE') return project.category === 'AI_CODE';
    if (filter === 'DESIGN') return project.category === 'DESIGN';
    return true;
  });

  return (
    <div className="relative pt-6">

      {/* Header Section */}
      <header className="mb-12 relative flex flex-col md:flex-row justify-between items-start md:items-end border-b-8 border-neutral-dark pb-8 border-dashed">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl sm:text-6xl md:text-8xl text-accent-yellow drop-shadow-[4px_4px_0px_#131b2e] tracking-tighter uppercase"
          >
            Selected<br />Projects
          </motion.h1>
          <p className="font-mono text-neutral-light mt-4 text-sm sm:text-base bg-neutral-dark inline-block px-4 py-2 border-2 border-accent-yellow shadow-[4px_4px_0px_0px_#ffe083] rotate-1">
            // 2024 - 2026 ARCHIVE
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-3 mt-6 md:mt-0 relative z-20">
          {(['ALL', 'AI_CODE', 'DESIGN'] as const).map((cat, idx) => {
            const isSelected = filter === cat;
            const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-xs font-bold px-4 py-2.5 border-4 border-neutral-dark transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-accent-red text-neutral-light brutalist-shadow-dark -translate-y-1' 
                    : 'bg-neutral-light text-neutral-dark hover:-translate-y-1 hover:brutalist-shadow-dark'
                } ${rotations[idx % rotations.length]}`}
              >
                {cat === 'AI_CODE' ? 'AI / CODE' : cat}
              </button>
            );
          })}
        </div>
      </header>

      {/* Grid Layout of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr gap-8 md:gap-12">
        {filteredProjects.map((project) => {
            return (
              <article
                key={project.id}
                className="group relative flex h-full flex-col bg-neutral-light border-4 border-neutral-dark brutalist-shadow-dark"
              >
                {/* Sticker badge pinned on top right */}
                {project.badge && (
                  <div className="absolute -top-4 -right-4 z-20 bg-accent-yellow text-neutral-dark font-mono text-xs font-bold px-4 py-2 border-2 border-neutral-dark sticker-shadow rotate-[6deg] group-hover:rotate-12 transition-transform">
                    {project.badge}
                  </div>
                )}

                {/* Cover visual representation */}
                <div className="relative w-full aspect-video border-b-4 border-neutral-dark overflow-hidden bg-neutral-dark">
                  <>
                    <div className="absolute inset-0 halftone-overlay z-10"></div>
                    <img 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal"
                      src={project.imageUrl} 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                    />
                  </>
                </div>

                {/* Details Section */}
                <div className="p-6 relative flex-1 flex flex-col justify-between bg-neutral-light">
                  <div className="blueprint-grid absolute inset-0 opacity-20 pointer-events-none"></div>
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-neutral-dark bg-accent-yellow/20 inline-block px-2 border-2 border-neutral-dark shadow-[2px_2px_0px_0px_#131b2e] -rotate-1">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-neutral-muted mt-4 line-clamp-2 border-l-4 border-accent-red pl-3 bg-neutral-light/75 py-1">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t-2 border-neutral-dark border-dashed flex justify-between items-center z-10">
                    <span className="font-mono text-xs text-neutral-muted tracking-widest">
                      {project.date}
                    </span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="font-mono text-xs font-bold text-primary hover:text-accent-red flex items-center gap-1.5 cursor-pointer"
                    >
                      View Details
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
      </div>

      {/* Case Study Full Zine-Style Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, rotate: -1 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 30, rotate: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-neutral-light border-4 border-neutral-dark brutalist-shadow-dark w-full max-w-4xl rounded-none relative overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Zine Header Banner */}
              <div className="bg-primary text-neutral-light p-4 brutalist-border-md border-t-0 border-x-0 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-neutral-dark text-accent-yellow">
                    PROJECT_CASE_STUDY_V1.0
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-neutral-dark text-neutral-light p-1.5 border-2 border-neutral-light hover:bg-accent-red hover:text-neutral-light transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Core Layout */}
              <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                  <div className="col-span-1 md:col-span-12 flex flex-col gap-6">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase bg-neutral-dark text-accent-yellow px-2 py-1">
                        {selectedProject.category.replace('_', ' ')}
                      </span>
                      <h2 className="font-display text-4xl uppercase tracking-tight text-neutral-dark mt-2 border-b-4 border-neutral-dark pb-2">
                        {selectedProject.title}
                      </h2>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs font-bold text-neutral-muted uppercase mb-1">
                        THE CHALLENGE // INTENT
                      </h4>
                      <p className="font-sans text-sm text-neutral-dark leading-relaxed">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>

                    {/* Tags / Subcategories */}
                    <div>
                      <h4 className="font-mono text-xs font-bold text-neutral-muted uppercase mb-2">
                        TACTICAL CLASSIFICATIONS
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map(tag => (
                          <span key={tag} className="font-mono text-[10px] font-bold px-2 py-1 bg-neutral-light border-2 border-neutral-dark text-neutral-dark shadow-[1.5px_1.5px_0px_#131b2e]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Technologies/Software stack */}
                    <div>
                      <h4 className="font-mono text-xs font-bold text-neutral-muted uppercase mb-2">
                        COMPILER / UTILITY RUNTIME
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map(t => {
                          const rot = (Math.random() * 4 - 2).toFixed(1);
                          return (
                            <span 
                              key={t} 
                              style={{ transform: `rotate(${rot}deg)` }}
                              className="font-mono text-xs font-bold px-3 py-1 bg-accent-yellow text-neutral-dark border-2 border-neutral-dark shadow-[2px_2px_0px_#131b2e] inline-block"
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* External links */}
                    <div className="mt-auto pt-6 border-t-2 border-neutral-dark border-dashed flex justify-end gap-4">
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary text-neutral-light font-mono text-xs font-bold px-4 py-3 border-2 border-neutral-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-1.5 uppercase"
                        >
                          CHECK OUT MY WORK <ExternalLink size={12} />
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="bg-neutral-dark text-neutral-light font-mono text-xs font-bold px-4 py-3 border-2 border-neutral-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase cursor-pointer"
                      >
                        RETURN TO ARCHIVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
