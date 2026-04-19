"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/lib/ModeContext";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/home/ModeToggle";

export const Navbar = () => {
  const { mode } = useMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
      isScrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/10" : "py-8"
    )}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <motion.a 
          href="/" 
          className={cn(
            "text-2xl font-display uppercase tracking-widest",
            mode === "creative" ? "text-foreground" : "text-white"
          )}
          style={{ color: mode === "creative" ? '#1a1a1a' : '#f0f6fc' }}
          whileHover={{ scale: 1.05 }}
        >
          NJV<span style={{ color: mode === "creative" ? '#1a1a1a' : '#f0f6fc' }}>
            .
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <div className="flex gap-10 items-center border-r border-white/10 pr-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                style={{ color: mode === "creative" ? '#1a1a1a' : '#f0f6fc' }}
                className={cn(
                  "text-[10px] uppercase font-bold tracking-[0.3em] transition-colors",
                  mode === "creative" ? "hover:text-foreground" : "hover:text-primary"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
            <ModeToggle />
            <a 
              href="#contact" 
              className="px-6 py-2 bg-primary text-background font-bold uppercase text-[10px] tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              Connect
            </a>
          </div>
        </div>

        {/* Mobile Toggle Group */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <button className="text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />} 
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-white/10 p-8 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                style={{ color: mode === "creative" ? '#1a1a1a' : '#f0f6fc' }}
                className="text-2xl font-display uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
