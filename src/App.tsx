import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Sparkles, ShieldCheck, Heart, FileText, Download, Briefcase, GraduationCap, Award, MapPin, Phone, Globe, Linkedin, Github, BookOpen, Layers } from 'lucide-react';
import { ViewType } from './types';
import Navigation from './components/Navigation';
import resumePdf from './assets/documents/noel-joseph-varghese-resume.pdf';

// Import Views
import AboutView from './components/views/AboutView';
import GalleryView from './components/views/GalleryView';
import StudioView from './components/views/StudioView';
import ToolsSkillsView from './components/views/ToolsSkillsView';

// URL path ↔ ViewType mapping
const VIEW_PATHS: Record<ViewType, string> = {
  [ViewType.ABOUT]: '/',
  [ViewType.GALLERY]: '/gallery',
  [ViewType.STUDIO]: '/studio',
  [ViewType.TOOLS_SKILLS]: '/tools-skills',
};

const PATH_TO_VIEW: Record<string, ViewType> = {
  '/': ViewType.ABOUT,
  '/gallery': ViewType.GALLERY,
  '/studio': ViewType.STUDIO,
  '/tools-skills': ViewType.TOOLS_SKILLS,
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    // Read initial path on mount — handle /gallery/* sub-routes
    const path = window.location.pathname.toLowerCase();
    return PATH_TO_VIEW[path] || (path.startsWith('/gallery') ? ViewType.GALLERY : ViewType.ABOUT);
  });
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [resumeTab, setResumeTab] = useState<'profile' | 'experience' | 'projects' | 'skills' | 'content'>('profile');
  const contactUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=noeljosephvarghese@gmail.com';

  // Sync URL when view changes (preserve gallery sub-routes)
  useEffect(() => {
    const path = VIEW_PATHS[currentView];
    // Don't override gallery sub-routes like /gallery/project-id
    if (currentView === ViewType.GALLERY && window.location.pathname.startsWith('/gallery/')) {
      return;
    }
    if (window.location.pathname !== path) {
      window.history.pushState({ view: currentView }, '', path);
    }
  }, [currentView]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const path = window.location.pathname.toLowerCase();
      const view = PATH_TO_VIEW[path] || ViewType.ABOUT;
      setCurrentView(view);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  const renderActiveView = () => {
    switch (currentView) {
      case ViewType.ABOUT:
        return <AboutView onNavigate={setCurrentView} />;
      case ViewType.GALLERY:
        return <GalleryView />;
      case ViewType.STUDIO:
        return <StudioView />;
      case ViewType.TOOLS_SKILLS:
        return <ToolsSkillsView />;
      default:
        return <AboutView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="bg-neutral-light text-neutral-dark min-h-screen relative font-sans overflow-x-hidden pb-24 lg:pb-0 select-none">
      
      {/* Absolute Global Screen overlays */}
      <div className="fixed inset-0 vhs-overlay pointer-events-none z-50 opacity-80"></div>
      <div className="fixed inset-0 halftone-overlay pointer-events-none z-40"></div>

      {/* Persistent Navigation */}
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        contactUrl={contactUrl}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Canvas Area */}
      <main className="lg:pl-64 p-6 sm:p-10 max-w-7xl mx-auto min-h-screen flex flex-col justify-between">
        
        {/* Active Animated View Layer */}
        <div className="flex-1 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tactical Zine Style Footer */}
        <footer className="w-full py-10 mt-12 border-t-8 border-dashed border-neutral-dark flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute inset-0 font-display text-[120px] leading-none text-neutral-dark/5 opacity-10 select-none pointer-events-none whitespace-nowrap overflow-hidden">
            GLITCHED FUTURE
          </div>
          
          <div className="font-mono text-xs text-neutral-dark font-bold z-10 bg-accent-yellow px-4 py-2 border-2 border-neutral-dark select-none shadow-[2px_2px_0px_#131b2e] -rotate-1">
            @2026 Noel Joseph Varghese
          </div>
          
          <div className="flex gap-6 z-10 flex-wrap justify-center font-mono text-xs font-bold uppercase">
            <a href="https://www.behance.net/noeljosephvarghese" target="_blank" rel="noopener noreferrer" className="hover:text-accent-red hover:underline decoration-2 underline-offset-4">BEHANCE</a>
            <a href="https://www.pinterest.com/why_not_231455/my-work/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-red hover:underline decoration-2 underline-offset-4">PINTEREST</a>
            <a href="https://www.linkedin.com/in/noel-joseph-varghese-576507273/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-red hover:underline decoration-2 underline-offset-4">LINKEDIN</a>
            <a href="https://github.com/whynot231455" target="_blank" rel="noopener noreferrer" className="hover:text-accent-red hover:underline decoration-2 underline-offset-4">GITHUB</a>
          </div>
        </footer>
      </main>

      {/* Majestic Sliding Resume Drawer / Overlay */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-dark/80 backdrop-blur-sm z-50 flex items-center justify-end"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-neutral-light w-full max-w-2xl h-full border-l-4 border-neutral-dark p-6 sm:p-8 flex flex-col justify-between relative overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Overlay CRT grid */}
              <div className="blueprint-grid absolute inset-0 opacity-15 pointer-events-none"></div>

              {/* Header */}
              <div className="flex justify-between items-center border-b-4 border-neutral-dark pb-4 z-10">
                <div className="flex items-center gap-2">
                  <FileText className="text-primary animate-pulse" size={20} />
                  <span className="font-mono text-sm font-bold tracking-widest text-neutral-dark">
                    Noel Joseph - CV
                  </span>
                </div>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="bg-neutral-dark text-neutral-light p-1.5 border-2 border-neutral-dark hover:bg-accent-red hover:text-neutral-light transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Resume Sheet Body */}
              <div className="flex-grow py-6 space-y-6 z-10 font-sans text-neutral-dark">
                {/* Header profile */}
                <div className="border-4 border-neutral-dark p-4 bg-accent-yellow/10 rotate-[0.5deg] relative">
                  <h3 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-none mb-1">
                    Noel Joseph Varghese
                  </h3>
                  <p className="font-mono text-[10px] uppercase font-bold text-neutral-muted mb-2">
                    Video Editor • Photo Editor • UI UX Designer • AI Engineer
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px] text-neutral-muted border-t border-dashed border-neutral-dark/30 pt-2">
                    <span className="flex items-center gap-1"><MapPin size={10} /> Sharjah, UAE // Remote</span>
                    <span>🌐 noeljosephvarghese@gmail.com</span>
                    <span>💻 github.com/whynot231455</span>
                  </div>
                </div>

                {/* Tab Selector Buttons */}
                <div className="flex flex-wrap gap-2 border-b-4 border-neutral-dark pb-4 z-10">
                  {(['profile', 'experience', 'projects', 'skills', 'content'] as const).map((tab) => {
                    const isActive = resumeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setResumeTab(tab)}
                        className={`px-3 py-1.5 font-mono text-[10px] sm:text-xs font-black uppercase border-2 border-neutral-dark hover:translate-y-0.5 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-accent-yellow text-neutral-dark shadow-[2px_2px_0px_#131b2e]'
                            : 'bg-neutral-light text-neutral-muted hover:text-neutral-dark hover:border-primary'
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content Panels */}
                <div className="min-h-[350px]">
                  {resumeTab === 'profile' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="font-mono text-xs font-black uppercase text-neutral-light bg-neutral-dark inline-block px-2 py-0.5 -rotate-1">
                        01 // PERSONAL PROFILE
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block">FULL NAME</span>
                          <span className="font-sans text-sm font-extrabold uppercase text-neutral-dark block">Noel Joseph Varghese</span>
                        </div>
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block">LOCATION</span>
                          <span className="font-sans text-xs text-neutral-dark font-bold flex items-center gap-1"><MapPin size={12} className="text-primary" /> Sharjah, UAE</span>
                        </div>
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block">EMAIL</span>
                          <span className="font-sans text-xs text-neutral-dark font-bold block overflow-hidden text-ellipsis">noeljosephvarghese@gmail.com</span>
                        </div>
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block">PHONE (UAE)</span>
                          <span className="font-sans text-xs text-neutral-dark font-bold block">+971 58 665 2189</span>
                        </div>
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block">PHONE (IND) &amp; WHATSAPP</span>
                          <span className="font-sans text-xs text-neutral-dark font-bold block">+91 97514 06969</span>
                        </div>
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block">PORTFOLIO</span>
                          <a href="https://noeljosephvarghese.vercel.app" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-primary font-bold block hover:underline">noeljosephvarghese.vercel.app</a>
                        </div>
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block">LINKEDIN</span>
                          <a href="https://linkedin.com/in/noel-joseph-varghese-576507273" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-primary font-bold block hover:underline overflow-hidden text-ellipsis">linkedin.com/in/noel-joseph-varghese-576507273</a>
                        </div>
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block">GITHUB</span>
                          <a href="https://github.com/whynot231455" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-primary font-bold block hover:underline">github.com/whynot231455</a>
                        </div>
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block">BEHANCE</span>
                          <a href="https://behance.net/noeljosephvarghese" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-primary font-bold block hover:underline">behance.net/noeljosephvarghese</a>
                        </div>
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block">PINTEREST</span>
                          <a href="https://www.pinterest.com/why_not_231455/my-work/" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-primary font-bold block hover:underline">pinterest.com/why_not_231455/my-work/</a>
                        </div>
                      </div>

                      <div className="border-2 border-neutral-dark p-3 bg-neutral-light mt-2">
                        <span className="font-mono text-[9px] font-black text-neutral-muted block mb-1">EDUCATION</span>
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="font-sans text-xs font-bold text-neutral-dark block">Vellore Institute of Technology, Chennai</span>
                            <span className="font-sans text-[11px] text-neutral-muted block">B.Tech in Artificial Intelligence &amp; Robotics</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono text-[10px] font-bold block bg-neutral-dark text-neutral-light px-1.5 py-0.5">2022 – 2026</span>
                            <span className="font-mono text-[10px] font-bold text-neutral-dark block mt-1">CGPA: 8.23 / 10</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-2 border-neutral-dark p-3 bg-neutral-light">
                        <span className="font-mono text-[9px] font-black text-neutral-muted block mb-2">LANGUAGES</span>
                        <div className="space-y-2 text-xs font-bold">
                          <div className="flex justify-between items-center border-b border-dashed border-neutral-dark/20 pb-1.5">
                            <span>ENGLISH</span>
                            <span className="font-mono text-[10px] text-neutral-muted">PROFESSIONAL PROFICIENCY</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-neutral-dark/20 pb-1.5">
                            <span>MALAYALAM</span>
                            <span className="font-mono text-[10px] text-neutral-muted">NATIVE</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-neutral-dark/20 pb-1.5">
                            <span>HINDI</span>
                            <span className="font-mono text-[10px] text-neutral-muted">BASIC PROFICIENCY</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {resumeTab === 'experience' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="font-mono text-xs font-black uppercase text-neutral-light bg-neutral-dark inline-block px-2 py-0.5 rotate-1">
                        02 // PROFESSIONAL EXPERIENCE
                      </h4>

                      <div className="border-2 border-neutral-dark p-3 bg-accent-yellow/5 text-xs text-neutral-dark leading-relaxed font-sans shadow-[2px_2px_0px_#131b2e]">
                        <span className="font-mono text-[9px] font-black text-neutral-muted block mb-1">SUMMARY</span>
                        Content-oriented technology professional with a dual background in AI/engineering and visual design, currently pursuing a B.Tech in Artificial Intelligence &amp; Robotics at VIT Chennai. Proven track record delivering cross-functional projects — from enterprise AI copilots and marketing analytics dashboards to end-to-end UI/UX design systems and full product ecosystems across web and mobile platforms. Combines strong data-informed decision-making with polished visual execution. Also an active part-time content creator with 600+ followers across YouTube and Instagram, bringing firsthand understanding of content strategy, audience engagement, and social media ecosystems.
                      </div>

                      <div className="space-y-4 pt-1 max-h-[300px] overflow-y-auto pr-1">
                        <div className="border-l-4 border-primary pl-3.5 space-y-1.5">
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-sans text-sm sm:text-base font-extrabold uppercase leading-none tracking-tight text-neutral-dark">UI/UX &amp; Visual Designer</h5>
                            <span className="font-mono text-[9px] font-bold bg-neutral-dark/5 px-2 py-0.5 text-neutral-dark border border-neutral-dark/10 shrink-0 uppercase">MAY 2025 - PRESENT</span>
                          </div>
                          <p className="font-mono text-[10px] sm:text-xs font-medium text-primary uppercase tracking-wide">TRIPSSECURE GROUP // UAE</p>
                          <ul className="text-[11px] sm:text-xs font-normal text-neutral-muted/90 list-disc list-inside space-y-1.5 pl-1 leading-relaxed">
                            <li>Led end-to-end UI/UX design for the company&apos;s official website and full digital product suite from discovery/user research through wireframes, high-fidelity Figma prototypes, and final delivery.</li>
                            <li>Built a comprehensive design system and component library from scratch: typography tokens, colour systems, interaction patterns, and style guides ensuring brand consistency.</li>
                            <li>Designed and produced social media assets, mood boards, storyboards, marketing comps, and client-facing presentation decks.</li>
                            <li>Optimised information architecture and site navigation, driving measurable improvements in engagement and session depth.</li>
                          </ul>
                        </div>

                        <div className="border-l-4 border-accent-red pl-3.5 space-y-1.5">
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-sans text-sm sm:text-base font-extrabold uppercase leading-none tracking-tight text-neutral-dark">Data Analyst &amp; AI Engineer Intern</h5>
                            <span className="font-mono text-[9px] font-bold bg-neutral-dark/5 px-2 py-0.5 text-neutral-dark border border-neutral-dark/10 shrink-0 uppercase">JAN 2026 - JUN 2026</span>
                          </div>
                          <p className="font-mono text-[10px] sm:text-xs font-medium text-accent-red uppercase tracking-wide">SOL ANALYTICS // DUBAI, UAE</p>
                          <ul className="text-[11px] sm:text-xs font-normal text-neutral-muted/90 list-disc list-inside space-y-1.5 pl-1 leading-relaxed">
                            <li>Maintained zero-defect handoffs across continuous delivery pipelines with stable cloud deployments by redesigning the release process, coordinating vendor delivery across data engineering and ML teams.</li>
                            <li>Owned the complete visual UX and information architecture for a Marketing Mix Modelling (MMM) analytics dashboard — user flows, KPI hierarchy, data visualisation patterns.</li>
                            <li>Collaborated with engineers in agile delivery; iterated across sprints, managed Vercel cloud deployment, and presented design concepts to stakeholders.</li>
                            <li>Led the end-to-end architecture and deployment of Sol Garage, an automotive ERP system optimizing workflow management.</li>
                          </ul>
                        </div>

                        <div className="border-l-4 border-accent-yellow pl-3.5 space-y-1.5">
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-sans text-sm sm:text-base font-extrabold uppercase leading-none tracking-tight text-neutral-dark">Graphic &amp; Brand Designer</h5>
                            <span className="font-mono text-[9px] font-bold bg-neutral-dark/5 px-2 py-0.5 text-neutral-dark border border-neutral-dark/10 shrink-0 uppercase">JUL 2025 - AUG 2025</span>
                          </div>
                          <p className="font-mono text-[10px] sm:text-xs font-medium text-tertiary uppercase tracking-wide">JIVIKA AI</p>
                          <ul className="text-[11px] sm:text-xs font-normal text-neutral-muted/90 list-disc list-inside space-y-1.5 pl-1 leading-relaxed">
                            <li>Produced digital and print design assets including storyboards, marketing comps, social content, and brand collateral for an AI-focused startup.</li>
                            <li>Delivered end-to-end creative concepts from initial mood boards and sketches to final execution in Photoshop and Figma.</li>
                          </ul>
                        </div>

                        <div className="border-l-4 border-neutral-dark pl-3.5 space-y-1.5">
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-sans text-sm sm:text-base font-extrabold uppercase leading-none tracking-tight text-neutral-dark">UI/UX Designer &amp; Business Analyst</h5>
                            <span className="font-mono text-[9px] font-bold bg-neutral-dark/5 px-2 py-0.5 text-neutral-dark border border-neutral-dark/10 shrink-0 uppercase">APR 2024 - SEP 2024</span>
                          </div>
                          <p className="font-mono text-[10px] sm:text-xs font-medium text-neutral-dark uppercase tracking-wide">PRIME PRO</p>
                          <ul className="text-[11px] sm:text-xs font-normal text-neutral-muted/90 list-disc list-inside space-y-1.5 pl-1 leading-relaxed">
                            <li>Managed the full end-to-end UX process: user research, insight synthesis, journey mapping, wireframes, and high-fidelity prototypes in Figma; validated designs through usability testing.</li>
                            <li>Led interaction design and visual design for web and mobile applications; collaborated with developers and product owners in an agile environment.</li>
                            <li>Presented design concepts and rationale directly to clients; facilitated design critiques and iterated based on structured feedback.</li>
                            <li>Delivered structured product delivery across web and mobile with on-time launch by conducting end-to-end requirements gathering, building investment cases, and translating user research.</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {resumeTab === 'projects' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="font-mono text-xs font-black uppercase text-neutral-light bg-neutral-dark inline-block px-2 py-0.5 -rotate-1">
                        03 // FEATURED DELIVERABLES
                      </h4>

                      <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                        <a
                          href="https://sol-garage-erp.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block border-2 border-neutral-dark p-3 bg-neutral-light shadow-[2px_2px_0px_#131b2e] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                        >
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <span className="font-sans text-xs sm:text-sm font-extrabold uppercase leading-tight tracking-tight text-neutral-dark">Multi-Tenant Automotive ERP System</span>
                            <span className="font-mono text-[9px] font-black bg-accent-yellow px-1.5 py-0.5 border border-neutral-dark">ERP SYSTEM</span>
                          </div>
                          <p className="text-[11px] text-neutral-muted leading-relaxed font-sans">
                            Transformed fragmented workshop operations into a scalable multi-tenant SaaS architecture. Reduced developmental scope creep by 30% through detailed Product Requirement Documents (PRDs) and interactive functional wireframes. Achieved zero privilege escalation vulnerabilities during system testing through strict tenant permission hierarchy design.
                          </p>
                           <div className="mt-2 pt-1.5 border-t border-dashed border-neutral-dark/10 flex justify-between items-center text-[10px] font-mono">
                            <span className="text-neutral-muted">DEMO</span>
                            <a href="https://sol-garage-erp.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">sol-garage-erp.vercel.app</a>
                          </div>
                        </a>

                        <div className="border-2 border-neutral-dark p-3 bg-neutral-light shadow-[2px_2px_0px_#131b2e]">
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <span className="font-sans text-xs sm:text-sm font-extrabold uppercase leading-tight tracking-tight text-neutral-dark">Enterprise Marketing Analytics Dashboard (MMM)</span>
                            <span className="font-mono text-[9px] font-black bg-primary text-neutral-light px-1.5 py-0.5 border border-neutral-dark">DASHBOARD</span>
                          </div>
                          <p className="text-[11px] text-neutral-muted leading-relaxed font-sans">
                            Reduced time-to-insight for non-technical corporate executives by 40% through end-to-end delivery management of a complex data visualization layer. Translated advanced ML outputs (MMM and predictive analytics) into intuitive corporate tools.
                          </p>
                          <div className="mt-2 pt-1.5 border-t border-dashed border-neutral-dark/10 flex justify-between items-center text-[10px] font-mono">
                            <span className="text-neutral-muted">GITHUB REPO</span>
                            <a href="https://github.com/whynot231455/mmm-sol-dashboard" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">github.com/mmm-sol-dashboard</a>
                          </div>
                        </div>

                        <div className="border-2 border-neutral-dark p-3 bg-neutral-light shadow-[2px_2px_0px_#131b2e]">
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <span className="font-sans text-xs sm:text-sm font-extrabold uppercase leading-tight tracking-tight text-neutral-dark">Tripssecure Website Design</span>
                            <span className="font-mono text-[9px] font-black bg-accent-red text-neutral-light px-1.5 py-0.5 border border-neutral-dark">WEB DESIGN</span>
                          </div>
                          <p className="text-[11px] text-neutral-muted leading-relaxed font-sans">
                            Built a full visual identity and design system from the ground up — typography, colour tokens, component library, interaction patterns — extended consistently across web, mobile, and marketing touchpoints.
                          </p>
                          <div className="mt-2 pt-1.5 border-t border-dashed border-neutral-dark/10 flex justify-between items-center text-[10px] font-mono">
                            <span className="text-neutral-muted">WEBSITE DESIGN</span>
                            <a href="https://www.figma.com/proto/OryYKib7f2D4dWnQ0BXVlN/tripssecure-website?page-id=0%3A1&node-id=293-178&starting-point-node-id=293%3A178&t=SyBhwERguJpZ4YbH-1" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">figma.com/tripssecure-website</a>
                          </div>
                        </div>

                        <div className="border-2 border-neutral-dark p-3 bg-neutral-light shadow-[2px_2px_0px_#131b2e]">
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <span className="font-sans text-xs sm:text-sm font-extrabold uppercase leading-tight tracking-tight text-neutral-dark">Web-Blocker Chrome Extension</span>
                            <span className="font-mono text-[9px] font-black bg-neutral-dark text-neutral-light px-1.5 py-0.5 border border-neutral-dark">CHROME EXT</span>
                          </div>
                          <p className="text-[11px] text-neutral-muted leading-relaxed font-sans">
                            Designed and developed a Chrome extension UI (HTML/CSS/JS), demonstrating end-to-end ownership from concept and interaction design through front-end implementation.
                          </p>
                          <div className="mt-2 pt-1.5 border-t border-dashed border-neutral-dark/10 flex justify-between items-center text-[10px] font-mono">
                            <span className="text-neutral-muted">WEBSITE</span>
                            <a href="https://ctrl-blck.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">ctrl-blck.vercel.app</a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {resumeTab === 'skills' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="font-mono text-xs font-black uppercase text-neutral-light bg-neutral-dark inline-block px-2 py-0.5 rotate-1">
                        04 // TECHNICAL SPECIFICATION
                      </h4>

                      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-primary block uppercase">Project Delivery &amp; Governance</span>
                          <p className="text-[11px] text-neutral-muted mt-0.5 font-sans">
                            Agile Delivery, Scrum Methodology, Sprint Planning &amp; Execution, Release Management, Business Analysis, Project Lifecycle Tracking, Technical Documentation, Requirements Gathering (BRD/FRD), Status Reporting, Vendor Management, Stakeholder Communication.
                          </p>
                        </div>

                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-accent-red block uppercase">AI Enablement &amp; Emerging Tech</span>
                          <p className="text-[11px] text-neutral-muted mt-0.5 font-sans">
                            Enterprise AI Implementations, Generative AI Copilots, Multi-Agent Architecture Frameworks (LangGraph, ReACT), Retrieval-Augmented Generation (RAG), Automated Workflows, Dataiku DSS (Certified Generative AI &amp; ML Practitioner).
                          </p>
                        </div>

                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-dark block uppercase">Data, Systems &amp; Analytics</span>
                          <p className="text-[11px] text-neutral-muted mt-0.5 font-sans">
                            SQL/MySQL, Python, Power BI, REST APIs, FastAPI, ETL Pipelines, Predictive Analytics, Marketing Mix Modelling (MMM), Data Visualization, KPI Hierarchy Design, Multi-Tenant ERP Architecture, Digital Financial Services.
                          </p>
                        </div>

                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-accent-yellow block uppercase">Visual Engineering &amp; UX Design</span>
                          <p className="text-[11px] text-neutral-muted mt-0.5 font-sans">
                            <strong>Figma (Expert)</strong> — wireframes, interactive prototypes, high-fidelity designs, design systems, component libraries. <strong>Adobe Creative Suite</strong> — Photoshop, Illustrator, Premiere Pro, After Effects. UI/UX Prototyping, Design Systems, Visual KPI Hierarchies, User Research &amp; Testing, Journey Mapping, Service Blueprints.
                          </p>
                        </div>

                        <div className="border-2 border-neutral-dark p-2.5 bg-neutral-light">
                          <span className="font-mono text-[9px] font-black text-neutral-muted block uppercase">Front-End &amp; Tools</span>
                          <p className="text-[11px] text-neutral-muted mt-0.5 font-sans">
                            HTML, CSS, JavaScript (foundational, enables smooth dev handoff and feasibility assessment), Chrome Extension Development. Git/Version Control, Advanced Excel, PowerPoint, Canva, Supabase, Figma Make, Lovable.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {resumeTab === 'content' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="font-mono text-xs font-black uppercase text-neutral-light bg-neutral-dark inline-block px-2 py-0.5 -rotate-1">
                        05 // SOCIAL ECOSYSTEM &amp; CREDENTIALS
                      </h4>

                      <div className="border-2 border-neutral-dark p-3 bg-neutral-light font-sans">
                        <span className="font-mono text-[9px] font-black text-primary block uppercase mb-1.5">Content Creation &amp; Audience Growth</span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="border border-dashed border-neutral-dark/20 p-2">
                            <span className="font-bold text-neutral-dark block">YouTube &amp; Instagram</span>
                            <span className="text-[11px] text-neutral-muted">600+ combined followers organic growth. Reels, short-form editing.</span>
                          </div>
                          <div className="border border-dashed border-neutral-dark/20 p-2">
                            <span className="font-bold text-neutral-dark block">Content Focus</span>
                            <span className="text-[11px] text-neutral-muted">Tech, design, productivity, lifestyle content creation.</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-neutral-muted mt-2 leading-relaxed">
                          Firsthand understanding of content strategy, audience engagement, social media algorithms, and content production ecosystems. Direct experience applicable to visual production and content operations.
                        </p>
                      </div>

                      <div className="border-2 border-neutral-dark p-3 bg-neutral-light">
                        <span className="font-mono text-[9px] font-black text-accent-red block uppercase mb-1.5">PROFESSIONAL CERTIFICATIONS</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono">
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5">
                            <span className="font-bold">GEN AI PRACTITIONER</span>
                            <span className="text-neutral-muted">DATAIKU DSS // 2026</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5">
                            <span className="font-bold">ML PRACTITIONER</span>
                            <span className="text-neutral-muted">DATAIKU DSS // 2026</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5">
                            <span className="font-bold">ADVANCED DESIGNER</span>
                            <span className="text-neutral-muted">DATAIKU DSS // 2026</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5">
                            <span className="font-bold">DEVELOPER</span>
                            <span className="text-neutral-muted">DATAIKU DSS // 2026</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5">
                            <span className="font-bold">CORE DESIGNER</span>
                            <span className="text-neutral-muted">DATAIKU DSS // 2026</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5">
                            <span className="font-bold">AZURE AI (AZ-900)</span>
                            <span className="text-neutral-muted">MICROSOFT // 2024</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5 text-[10px]">
                            <span className="font-bold">MODERN AI CERTIFICATE</span>
                            <span className="text-neutral-muted">CISCO // 2025</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5 text-[10px]">
                            <span className="font-bold">CLAUDE 101</span>
                            <span className="text-neutral-muted">ANTHROPIC // 2026</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5 text-[10px]">
                            <span className="font-bold">CLAUDE CODE 101</span>
                            <span className="text-neutral-muted">ANTHROPIC // 2026</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5 text-[10px]">
                            <span className="font-bold">CLAUDE COWORK</span>
                            <span className="text-neutral-muted">ANTHROPIC // 2026</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5 text-[10px]">
                            <span className="font-bold">C PROGRAMMING</span>
                            <span className="text-neutral-muted">IIT BOMBAY // 2023</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5 text-[10px]">
                            <span className="font-bold">C++ PROGRAMMING</span>
                            <span className="text-neutral-muted">IIT BOMBAY // 2023</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5 text-[10px]">
                            <span className="font-bold">PYTHON TRAINING</span>
                            <span className="text-neutral-muted">IIT BOMBAY // 2023</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5 text-[10px]">
                            <span className="font-bold">NETWORKING BASICS</span>
                            <span className="text-neutral-muted">CISCO // 2024</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5 text-[10px]">
                            <span className="font-bold">AI WITH PYTHON</span>
                            <span className="text-neutral-muted">COINCENT // 2023</span>
                          </div>
                          <div className="flex justify-between border-b border-neutral-dark/10 pb-0.5 text-[10px]">
                            <span className="font-bold">THINKUP IDEATHON</span>
                            <span className="text-neutral-muted">VIT CHENNAI // 2024</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Download / Print Actions */}
              <div className="border-t-4 border-neutral-dark pt-4 flex gap-3 z-10">
                <a
                  href={resumePdf}
                  download="Noel Joseph Varghese - Resume.pdf"
                  className="flex-1 bg-primary hover:bg-neutral-dark text-neutral-light font-mono text-xs font-bold py-3.5 border-2 border-neutral-dark brutalist-shadow-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2"
                >
                  DOWNLOAD CV <Download size={14} />
                </a>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="bg-neutral-dark hover:bg-accent-red text-neutral-light font-mono text-xs font-bold py-3 px-6 border-2 border-neutral-dark brutalist-shadow-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase cursor-pointer"
                >
                  CLOSE
                </button>
              </div>

              {/* Bottom strip spacer */}
              <div className="mt-4">
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
