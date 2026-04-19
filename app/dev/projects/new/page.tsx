"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, AlertCircle, Link as LinkIcon, FileImage, LayoutTemplate, Github, Figma, Plus, Lock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProjectSidebar } from "@/components/dev/ProjectSidebar";
import { DEV_AUTH_HEADER } from "@/lib/auth";
import { slugifyProjectId, type ProjectRecord } from "@/lib/projects";

export default function NewProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [devPassword, setDevPassword] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const emptyFormData = {
    id: "",
    title: "",
    category: "dev",
    summary: "",
    description: "",
    tags: "",
    featured: false,
    repoUrl: "",
    figmaUrl: "",
    liveUrl: ""
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Fetch projects on load
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/dev/projects', {
        headers: { [DEV_AUTH_HEADER]: devPassword }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data as ProjectRecord[]);
        setApiError("");
      } else if (data.error) {
        // Only set error if not first load or if explicitly failed
        if (devPassword) setApiError(data.error);
      }
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  }, [devPassword]);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle selecting a project from sidebar
  const handleSelectProject = (id: string | null) => {
    setSelectedId(id);
    setApiError("");
    setSuccess(false);

    if (id === null) {
      setFormData(emptyFormData);
      setFile(null);
      setPreviewUrl(null);
    } else {
      const project = projects.find((p) => p.id === id);
      if (project) {
        setFormData({
          id: project.id,
          title: project.title,
          category: project.category,
          summary: project.summary,
          description: project.description || "",
          tags: (project.tags || []).join(', '),
          featured: !!project.featured,
          repoUrl: project.repoUrl || "",
          figmaUrl: project.figmaUrl || "",
          liveUrl: project.liveUrl || ""
        });
        setPreviewUrl(project.coverImage || null);
        setFile(null); // No new file selected yet
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/dev/projects/${id}`, {
        method: 'DELETE',
        headers: { 
          [DEV_AUTH_HEADER]: devPassword
        }
      });
      const data = await res.json();
      if (data.success) {
        if (selectedId === id) handleSelectProject(null);
        fetchProjects();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError("");
    
    try {
      let coverImage = previewUrl || "";
      
      // Upload image if a new one is selected
      if (file) {
        const fileData = new FormData();
        fileData.append('file', file);
        
        const uploadRes = await fetch('/api/dev/upload', {
          method: 'POST',
          headers: { [DEV_AUTH_HEADER]: devPassword },
          body: fileData
        });
        
        const uploadJson = await uploadRes.json();
        if (!uploadJson.success) throw new Error(uploadJson.error || "Upload failed");
        coverImage = uploadJson.url;
      }

      if (!coverImage) throw new Error("Thumbnail is required");
      
      const generatedId = slugifyProjectId(formData.id || formData.title);
      const selectedProject = selectedId ? projects.find((project) => project.id === selectedId) : undefined;

      const projectPayload: Record<string, unknown> = {
        id: generatedId,
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        description: formData.description,
        coverImage,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        featured: formData.featured,
        publishedAt: selectedProject?.publishedAt || new Date().toISOString().split('T')[0],
        repoUrl: formData.repoUrl || undefined,
        figmaUrl: formData.figmaUrl || undefined,
        liveUrl: formData.liveUrl || undefined,
      };

      if (selectedId) {
        projectPayload.oldId = selectedId;
      }
      
      // Use PUT if editing, POST if new
      const method = selectedId ? 'PUT' : 'POST';
      const res = await fetch('/api/dev/projects', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          [DEV_AUTH_HEADER]: devPassword
        },
        body: JSON.stringify(projectPayload)
      });
      
      const resJson = await res.json();
      if (resJson.success) {
        setSuccess(true);
        await fetchProjects();
        if (!selectedId) {
          setTimeout(() => {
            setSuccess(false);
            handleSelectProject(null);
          }, 2000);
        } else {
          // If the ID was renamed, update selectedId to the new one
          setSelectedId(generatedId);
          setTimeout(() => setSuccess(false), 2000);
        }
      } else {
        throw new Error(resJson.error || "Failed to save project");
      }
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-[#010409]/50 border border-[#30363d] focus:border-primary focus:bg-[#010409] p-3 pl-4 text-white rounded-lg outline-none transition-all duration-300 placeholder:text-[#8b949e]/50 text-[15px]";
  const labelClass = "block text-[13px] font-mono text-[#8b949e] mb-2 uppercase tracking-wide";

  return (
    <div className="flex h-[calc(100vh-65px)]">
      
      <ProjectSidebar 
        projects={projects}
        selectedId={selectedId}
        onSelect={handleSelectProject}
        onDelete={handleDeleteProject}
        refreshProjects={fetchProjects}
      />

      <div className="flex-1 overflow-y-auto p-10 bg-[#010409]">
        <div className="max-w-4xl mx-auto mb-10 flex items-center justify-end">
             <div className="relative group">
               <Lock className={cn(
                 "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
                 devPassword ? "text-primary" : "text-[#8b949e]"
               )} size={14} />
               <input 
                 type="password"
                 value={devPassword}
                 onChange={(e) => setDevPassword(e.target.value)}
                 placeholder="Auth Password"
                 className="bg-[#0d1117] border border-[#30363d] pl-10 pr-4 py-2 rounded-lg text-xs font-mono focus:border-primary outline-none transition-all w-48 text-white"
               />
               <div className="absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-[#8b949e] font-mono whitespace-nowrap">
                 Required for all operations
               </div>
             </div>
        </div>

        <motion.div 
          key={selectedId || "new"}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-4xl mx-auto space-y-10"
        >
          <div className="flex items-center justify-between border-b border-[#30363d] pb-6">
            <div>
              <h2 className="text-4xl font-display uppercase tracking-tight text-white mb-1">
                {selectedId ? "Edit Project" : "New Project"}
              </h2>
              <p className="text-[#8b949e] font-light">
                {selectedId ? `Modifying project ID: ${selectedId}` : "Create a new entry for your portfolio."}
              </p>
            </div>
            {selectedId && (
               <button 
                 onClick={() => handleSelectProject(null)}
                 className="flex items-center gap-2 px-4 py-2 border border-[#30363d] hover:border-primary text-[#8b949e] hover:text-white transition-all font-mono text-xs uppercase"
               >
                 <Plus size={14} /> Create New
               </button>
            )}
          </div>
          
          <AnimatePresence>
            {success && (
              <motion.div 
                key="success-message"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-green-500/10 text-green-400 p-4 rounded-lg border border-green-500/20 flex items-center gap-3 font-mono text-sm"
              >
                <CheckCircle size={18} />
                Project {selectedId ? 'updated' : 'added'} successfully!
              </motion.div>
            )}
            
            {apiError && (
              <motion.div 
                key="error-message"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 text-red-400 p-4 rounded-lg border border-red-500/20 flex items-center gap-3 font-mono text-sm"
              >
                <AlertCircle size={18} />
                {apiError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-12 pb-20">
            
            <section className="bg-[#0d1117] border border-[#30363d] p-8 rounded-2xl shadow-xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-20" />
              
              <div className="flex items-center gap-3 border-b border-[#30363d] pb-4">
                <LayoutTemplate className="text-primary" size={20} />
                <h3 className="font-mono text-white text-lg tracking-wide uppercase">Fundamental Details</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Title <span className="text-primary">*</span></label>
                    <input 
                      required name="title" value={formData.title} onChange={handleChange}
                      className={inputClass} placeholder="Project Name" 
                    />
                  </div>
                  
                  <div>
                    <label className={labelClass}>ID (Unique Identifier)</label>
                    <input 
                      name="id" value={formData.id} onChange={handleChange}
                      className={inputClass} 
                      placeholder="acme-project" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Category <span className="text-primary">*</span></label>
                      <select
                        required name="category" value={formData.category} onChange={handleChange}
                        className={cn(inputClass, "appearance-none cursor-pointer")}
                      >
                        <option value="dev">Dev</option>
                        <option value="software">Software</option>
                        <option value="uiux">UI/UX</option>
                        <option value="photo">Photo</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-center pt-8">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-6 h-6 bg-[#010409] border border-[#30363d] rounded transition-colors group-hover:border-primary">
                          <input 
                            type="checkbox" name="featured" checked={formData.featured} onChange={handleChange}
                            className="opacity-0 absolute inset-0 cursor-pointer"
                          />
                          {formData.featured && <CheckCircle className="text-primary" size={16} />}
                        </div>
                        <span className="text-sm font-mono tracking-wide text-white group-hover:text-primary transition-colors">Featured</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Summary <span className="text-primary">*</span></label>
                    <input 
                      required name="summary" value={formData.summary} onChange={handleChange}
                      className={inputClass} placeholder="Short overview" 
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Description <span className="text-primary">*</span></label>
                    <textarea 
                      required name="description" value={formData.description} onChange={handleChange} rows={5}
                      className={cn(inputClass, "resize-none")} placeholder="Full project story..." 
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Tags (Separated by comma) <span className="text-primary">*</span></label>
                    <input 
                      required name="tags" value={formData.tags} onChange={handleChange}
                      className={inputClass} placeholder="React, Node.js, etc." 
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#0d1117] border border-[#30363d] p-8 rounded-2xl shadow-xl space-y-8">
              <div className="flex items-center gap-3 border-b border-[#30363d] pb-4">
                <LinkIcon className="text-primary" size={20} />
                <h3 className="font-mono text-white text-lg tracking-wide uppercase">Media & Links</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className={labelClass}>Thumbnail Image <span className="text-primary">*</span></label>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "relative h-[240px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden group",
                      previewUrl ? "border-primary bg-[#010409]" : "border-[#30363d] bg-[#010409]/50 hover:border-primary hover:bg-[#010409]"
                    )}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    
                    {previewUrl ? (
                      <>
                        <Image 
                          src={previewUrl} 
                          alt="Preview" 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
                          unoptimized={previewUrl.includes('picsum.photos') || previewUrl.startsWith('blob:')} 
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/80 px-4 py-2 rounded-lg font-mono text-xs text-white flex items-center gap-2">
                            <Upload size={14} /> Update Media
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center space-y-3 p-6 text-[#8b949e]">
                        <FileImage size={24} className="mx-auto text-primary" />
                        <span className="block font-mono text-[11px] uppercase tracking-tighter">Click to Upload Thumbnail</span>
                        <span className="text-[10px] opacity-40 leading-none block">800x1000px | 4:5 Aspect Ratio Reccomended</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6 flex flex-col justify-center">
                  <div className="relative">
                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b949e]" size={18} />
                    <input name="repoUrl" value={formData.repoUrl} onChange={handleChange} className={cn(inputClass, "pl-12")} placeholder="GitHub URL" />
                  </div>
                  <div className="relative">
                    <Figma className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b949e]" size={18} />
                    <input name="figmaUrl" value={formData.figmaUrl} onChange={handleChange} className={cn(inputClass, "pl-12")} placeholder="Figma URL" />
                  </div>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b949e]" size={18} />
                    <input name="liveUrl" value={formData.liveUrl} onChange={handleChange} className={cn(inputClass, "pl-12")} placeholder="Live Link" />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-6 pt-10">
              <button 
                type="button" 
                onClick={() => handleSelectProject(null)}
                className="px-8 py-4 font-mono text-xs uppercase tracking-widest text-[#8b949e] hover:text-white transition-all underline underline-offset-4 decoration-primary/20 hover:decoration-primary"
              >
                Reset Form
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-12 py-4 bg-primary text-white font-mono uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(232,99,74,0.4)] disabled:opacity-50 transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                {isSubmitting ? "Processing..." : selectedId ? "Update Project" : "Add Project"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
