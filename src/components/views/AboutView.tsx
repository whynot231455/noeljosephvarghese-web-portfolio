import { motion } from 'motion/react';
import { Sparkles, Star, ArrowRight } from 'lucide-react';
import { ViewType } from '../../types';
import portrait from '../../assets/images/noel_portrait_1782397914325.jpg';

interface AboutViewProps {
  onNavigate: (view: ViewType) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <div className="relative min-h-[75vh] flex flex-col justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-4 right-10 w-32 h-8 bg-accent-yellow border-4 border-neutral-dark transform rotate-12 -z-10 brutalist-shadow-dark hidden md:block"></div>
      <div className="absolute bottom-10 left-10 w-48 h-12 bg-secondary/20 border-4 border-neutral-dark transform -rotate-6 -z-10 brutalist-shadow-dark hidden md:block"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        {/* Left Column: Heading, intro & roles */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-6 z-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="space-y-4"
          >
            <h1 className="font-display uppercase leading-none tracking-tight select-none mt-2">
              <span className="block text-4xl sm:text-5xl md:text-6xl text-neutral-dark font-sans font-medium tracking-tight">
                Noel Joseph
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl text-primary drop-shadow-[4px_4px_0px_#131b2e] -rotate-1 origin-left mt-2">
                Varghese:
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl bg-neutral-dark text-neutral-light px-4 py-3 border-4 border-neutral-light brutalist-shadow-primary inline-block mt-4 rotate-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                Building for Fun
              </span>
            </h1>
          </motion.div>

          {/* Core Roles Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <div className="bg-primary text-neutral-light font-mono font-bold text-sm px-5 py-3 border-4 border-neutral-dark rounded-full brutalist-shadow-dark transform -rotate-3 hover:rotate-0 transition-transform cursor-default select-none">
              VIDEO EDITOR
            </div>
            <div className="bg-accent-red text-neutral-light font-mono font-bold text-sm px-5 py-3 border-4 border-neutral-dark rounded-full brutalist-shadow-dark transform rotate-2 hover:rotate-0 transition-transform cursor-default select-none">
              AI ENGINEER
            </div>
            <div className="bg-accent-yellow text-neutral-dark font-mono font-bold text-sm px-5 py-3 border-4 border-neutral-dark rounded-full brutalist-shadow-dark transform -rotate-1 hover:rotate-0 transition-transform cursor-default select-none">
              UI/UX DESIGNER
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-sans text-base sm:text-lg text-neutral-muted max-w-xl bg-neutral-light/50 p-5 border-2 border-neutral-dark border-dashed mt-4 backdrop-blur-xs leading-relaxed"
          >
            I’m an AI & Robotics student at VIT Chennai working at the intersection of technology, data, and visual design. My experience spans building enterprise AI copilots and marketing dashboards (Python, SQL, PowerBI) to crafting end-to-end UI/UX ecosystems in Figma. As a part-time content creator, I combine analytical thinking with creative strategy to build digital products that look great and drive engagement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mt-6"
          >
            <button
              onClick={() => onNavigate(ViewType.GALLERY)}
              className="group bg-primary text-neutral-light font-mono font-bold px-8 py-5 border-4 border-neutral-dark brutalist-shadow-dark hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase tracking-wider text-base flex items-center gap-3 cursor-pointer"
            >
              Explore my work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Interactive Cutout Portrait */}
        <div className="col-span-1 lg:col-span-5 relative mt-12 lg:mt-0 flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0.9, rotate: 5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.3 }}
            className="relative w-full aspect-[3/4] max-w-sm"
          >
            {/* Foreground image container with zine cutout styled border */}
            <div className="absolute inset-0 bg-neutral-light border-4 border-neutral-dark z-10 overflow-hidden cutout-border-3 p-3 flex flex-col justify-between">
              <div className="relative flex-1 bg-neutral-dark overflow-hidden group">
                {/* Halftone texture overlay inside card */}
                <div className="absolute inset-0 halftone-overlay z-10"></div>
                
                {/* Main colored portrait */}
                <img
                  className="w-full h-full object-cover contrast-125 transition-all duration-700 ease-out scale-105 group-hover:scale-110"
                  src={portrait}
                  alt="Noel Joseph Varghese Portrait"
                  referrerPolicy="no-referrer"
                />

                {/* Glitch color bars on hover */}
                <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-accent-red to-accent-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
              </div>

              {/* Monospace credit strip inside the cutout card */}
              <div className="h-10 mt-2 border-t-2 border-neutral-dark pt-2 flex justify-between items-center font-mono text-xs text-neutral-dark">
                <span className="font-bold">SYSTEM.ENG // CO: 2026</span>
                <span>VER: 4.12</span>
              </div>
            </div>

            {/* Overlapping sticker badges */}
            {/* 1. Rotated star badge */}
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="absolute -top-6 -right-6 z-20 transform rotate-12 cursor-pointer"
            >
              <div className="bg-accent-yellow text-neutral-dark p-3 rounded-full border-4 border-neutral-dark brutalist-shadow-dark flex items-center justify-center w-20 h-20 group">
                <Star size={36} fill="#131b2e" className="group-hover:fill-accent-red transition-colors duration-300" />
              </div>
            </motion.div>
          </motion.div>

          {/* 2. Tape label moved cleanly below the polaroid picture */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="z-20 transform -rotate-2"
          >
            <div className="bg-neutral-light text-neutral-dark font-mono text-xs font-bold px-5 py-2.5 border-4 border-neutral-dark brutalist-shadow-dark flex items-center gap-2 uppercase select-none">
              <Sparkles size={14} className="text-primary animate-pulse" />
              EST. 2004 // NOEL
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
