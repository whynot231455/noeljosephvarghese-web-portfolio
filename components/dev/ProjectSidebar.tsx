"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Plus, 
  Trash2, 
  Search, 
  Code2,
  Brush
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  category: string;
}

interface ProjectSidebarProps {
  projects: Project[];
  onSelect: (id: string | null) => void;
  onDelete: (id: string) => void;
  selectedId: string | null;
  refreshProjects: () => void;
}

export const ProjectSidebar = ({ 
  projects, 
  onSelect, 
  onDelete, 
  selectedId
}: ProjectSidebarProps) => {
  const [search, setSearch] = useState("");
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    developer: true,
    creative: true
  });

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const creativeCategories = ["uiux", "photo", "video"];
  const developerCategories = ["dev", "software"];

  const filtered = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const developerProjects = filtered.filter(p => developerCategories.includes(p.category));
  const creativeProjects = filtered.filter(p => creativeCategories.includes(p.category));

  return (
    <div className="w-80 border-r border-[#30363d] bg-[#0d1117] h-full flex flex-col overflow-hidden">
      {/* Search Header */}
      <div className="p-4 space-y-4">
        <button 
          onClick={() => onSelect(null)}
          className="w-full h-10 bg-primary/10 border border-primary/30 text-primary rounded-lg flex items-center justify-center gap-2 hover:bg-primary/20 transition-all font-mono text-xs uppercase tracking-widest"
        >
          <Plus size={16} /> New Project
        </button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" size={14} />
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-[#010409] border border-[#30363d] pl-9 pr-3 py-2 rounded-md text-xs font-mono focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-1 pb-10">
        
        {/* Developer Folder */}
        <FolderGroup 
          title="Developer Cluster" 
          isOpen={openFolders.developer} 
          onToggle={() => toggleFolder('developer')}
          icon={<Code2 size={14} className="text-blue-400" />}
        >
          {developerProjects.map(project => (
            <ProjectItem 
              key={project.id}
              project={project}
              isSelected={selectedId === project.id}
              onClick={() => onSelect(project.id)}
              onDelete={() => onDelete(project.id)}
            />
          ))}
          {developerProjects.length === 0 && <span className="px-8 py-2 text-[10px] text-[#8b949e] font-mono italic">No items found</span>}
        </FolderGroup>

        {/* Creative Folder */}
        <FolderGroup 
          title="Creative Cluster" 
          isOpen={openFolders.creative} 
          onToggle={() => toggleFolder('creative')}
          icon={<Brush size={14} className="text-purple-400" />}
        >
          {creativeProjects.map(project => (
            <ProjectItem 
              key={project.id}
              project={project}
              isSelected={selectedId === project.id}
              onClick={() => onSelect(project.id)}
              onDelete={() => onDelete(project.id)}
            />
          ))}
          {creativeProjects.length === 0 && <span className="px-8 py-2 text-[10px] text-[#8b949e] font-mono italic">No items found</span>}
        </FolderGroup>

      </div>
    </div>
  );
};

interface FolderGroupProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const FolderGroup = ({ title, isOpen, onToggle, children, icon }: FolderGroupProps) => (
  <div className="space-y-0.5">
    <button 
      onClick={onToggle}
      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#161b22] rounded transition-colors group"
    >
      <div className="text-[#8b949e] transition-transform duration-200" style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
        <ChevronDown size={14} />
      </div>
      {icon}
      <span className="text-[11px] font-mono uppercase tracking-widest text-[#8b949e] group-hover:text-white transition-colors">{title}</span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden flex flex-col"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

interface ProjectItemProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
}

const ProjectItem = ({ project, isSelected, onClick, onDelete }: ProjectItemProps) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div 
      className="group relative px-2"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <button
        onClick={onClick}
        className={cn(
          "w-full flex items-center justify-between pl-8 pr-3 py-1.5 rounded transition-all text-left",
          isSelected 
            ? "bg-primary/20 text-white border-l-2 border-primary" 
            : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
        )}
      >
        <span className="truncate text-[12px] font-light tracking-wide">{project.title}</span>
        
        {showDelete && !isSelected && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1"
          >
            <div 
              onClick={(e) => {
                e.stopPropagation();
                if(confirm(`Delete ${project.title}?`)) onDelete();
              }}
              className="p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded transition-colors"
            >
              <Trash2 size={12} />
            </div>
          </motion.div>
        )}
      </button>
      
      {isSelected && (
         <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(232,99,74,0.6)] animate-pulse" />
         </div>
      )}
    </div>
  );
};
