import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Film, Sliders, FileText, Mail, Star, Menu, X } from 'lucide-react';
import { ViewType } from '../types';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  contactUrl: string;
  onOpenResume: () => void;
}

export default function Navigation({ currentView, onViewChange, contactUrl, onOpenResume }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Tab details list - removed LABS and JOURNAL, renamed GEAR to TOOLS_SKILLS
  const navTabs = [
    { view: ViewType.ABOUT, label: 'ABOUT', icon: <Star size={18} /> },
    { view: ViewType.GALLERY, label: 'GALLERY', icon: <LayoutGrid size={18} /> },
    { view: ViewType.STUDIO, label: 'STUDIO', icon: <Film size={18} /> },
    { view: ViewType.TOOLS_SKILLS, label: 'TOOLS & SKILLS', icon: <Sliders size={18} /> },
  ];

  return (
    <>
      {/* 1. Persistent Desktop Left Side Nav Panel */}
      <nav className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 border-r-4 border-neutral-dark bg-neutral-light py-8 px-4 z-40 select-none">
        
        {/* Sidebar Header Profile block */}
        <div className="mb-10 text-center relative pt-4">
          <h1 className="font-display text-3xl uppercase text-neutral-dark leading-none tracking-tighter">
            Noel Joseph Varghese
          </h1>
          <p className="font-mono text-[10px] text-neutral-muted mt-2 tracking-widest uppercase">
            Video • AI • Design
          </p>
        </div>

        {/* Dynamic Nav link tabs vertical list */}
        <div className="flex-grow flex flex-col gap-3">
          {navTabs.map((tab) => {
            const isActive = currentView === tab.view;
            return (
              <button
                key={tab.view}
                onClick={() => onViewChange(tab.view)}
                className={`w-full flex items-center gap-3 font-mono text-sm font-bold uppercase transition-all py-3 px-3.5 border-4 border-transparent cursor-pointer relative text-left ${
                  isActive
                    ? 'bg-primary text-neutral-light border-neutral-dark -translate-x-1 shadow-[4px_4px_0px_#131b2e]'
                    : 'text-neutral-muted hover:bg-neutral-dark/5 hover:pl-5'
                }`}
              >
                {tab.icon}
                <span className="mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Contact and Resume triggers inside Desktop Nav */}
        <div className="mt-auto pt-6 flex flex-col gap-3">
          <a 
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-accent-yellow text-neutral-dark font-mono text-xs font-bold py-3 border-4 border-neutral-dark brutalist-shadow-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2"
          >
            GET IN TOUCH <Mail size={14} />
          </a>
          <button 
            onClick={onOpenResume}
            className="w-full bg-accent-red text-neutral-light font-mono text-xs font-bold py-3 border-4 border-neutral-dark brutalist-shadow-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2"
          >
            MY RESUME <FileText size={14} />
          </button>
        </div>
      </nav>

      {/* 2. Top App Bar Header Panel for Mobile / Tablets */}
      <header className="lg:hidden bg-neutral-light/95 backdrop-blur-md flex justify-between items-center w-full px-6 py-4 docked sticky top-0 z-40 border-b-4 border-neutral-dark shadow-[0px_4px_12px_rgba(0,0,0,0.15)] select-none">
        {/* Custom logo banner rotated slightly */}
        <div 
          onClick={() => {
            onViewChange(ViewType.ABOUT);
            setIsMobileMenuOpen(false);
          }}
          className="font-display text-2xl sm:text-3xl tracking-tighter uppercase text-neutral-light border-4 border-neutral-dark px-3 py-0.5 -rotate-2 bg-primary brutalist-shadow-dark cursor-pointer flex items-center gap-1.5"
        >
          <span>NJV.WORK</span>
        </div>

        {/* Hamburger Menu Trigger Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-accent-yellow text-neutral-dark font-mono text-xs font-black py-2 px-3 border-2 border-neutral-dark brutalist-shadow-dark hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all uppercase flex items-center gap-1.5 cursor-pointer"
        >
          <span>MENU</span>
          <Menu size={16} />
        </button>
      </header>

      {/* Mobile Hamburger Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-dark/80 backdrop-blur-sm z-50 flex justify-end lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-neutral-light w-full max-w-[280px] h-full border-l-4 border-neutral-dark p-6 flex flex-col justify-between relative overflow-y-auto shadow-[-8px_0px_0px_rgba(19,27,46,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Overlay CRT blueprint grid */}
              <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none"></div>

              {/* Drawer Header */}
              <div className="flex justify-between items-center border-b-4 border-neutral-dark pb-4 z-10">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-dark">
                  NAVIGATION_MENU
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-neutral-dark text-neutral-light p-1.5 border-2 border-neutral-dark hover:bg-accent-red hover:text-neutral-light transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-grow py-8 flex flex-col gap-3.5 z-10">
                {navTabs.map((tab) => {
                  const isActive = currentView === tab.view;
                  return (
                    <button
                      key={tab.view}
                      onClick={() => {
                        onViewChange(tab.view);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3.5 font-mono text-sm font-bold uppercase transition-all py-3 px-4 border-4 cursor-pointer text-left ${
                        isActive
                          ? 'bg-primary text-neutral-light border-neutral-dark shadow-[4px_4px_0px_#131b2e] -translate-x-0.5'
                          : 'text-neutral-muted border-transparent hover:bg-neutral-dark/5 hover:pl-5'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Actions at the bottom of Hamburger Menu */}
              <div className="border-t-4 border-neutral-dark pt-6 flex flex-col gap-3 z-10">
                <a
                  href={contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-accent-yellow text-neutral-dark font-mono text-xs font-bold py-3 border-4 border-neutral-dark brutalist-shadow-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2"
                >
                  GET IN TOUCH <Mail size={14} />
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full bg-accent-red text-neutral-light font-mono text-xs font-bold py-3 border-4 border-neutral-dark brutalist-shadow-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2"
                >
                  MY RESUME <FileText size={14} />
                </button>
              </div>

              {/* Footer metadata inside Drawer */}
              <div className="mt-6 border-t-2 border-neutral-dark pt-4 flex items-center justify-between font-mono text-[9px] text-neutral-muted z-10">
                <span>NJV.WORK // v1.0</span>
                <span>SECURE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
