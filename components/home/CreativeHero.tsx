import { motion, useScroll, useTransform, useReducedMotion, useSpring, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export const CreativeHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.4em", "1em"]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotate: 2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.19, 1, 0.22, 1] as any,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.1, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen pt-28 pb-20 px-6 md:px-12 relative overflow-hidden bg-[#FFFDF7] flex items-center"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-y-12 relative z-10"
      >
        {/* Editorial Title Section */}
        <div className="md:col-span-8 lg:col-span-7 flex flex-col justify-center order-2 md:order-1">
          <motion.div variants={lineVariants} className="mb-3">
            <span className="font-serif italic text-primary text-xl md:text-2xl tracking-tight">
              Multidisciplinary Artist & 
            </span>
            <span className="block font-serif text-foreground/40 text-sm uppercase tracking-[0.3em] mt-1">
              Based in Sharjah, UAE 
            </span>
          </motion.div>

          <motion.h1 
            className="text-[13vw] md:text-[8vw] lg:text-[7vw] font-display leading-[0.8] uppercase tracking-[-0.05em] text-foreground flex flex-col"
          >
            <motion.span variants={lineVariants} className="relative">
              Noel <br className="md:hidden" /> Joseph
            </motion.span>
            <motion.span 
              variants={lineVariants} 
              className="md:ml-24 lg:ml-32 text-stroke-primary text-transparent"
            >
              Varghese
            </motion.span>
          </motion.h1>

          <motion.div 
            variants={lineVariants}
            className="mt-6 max-w-xl self-end md:self-start lg:ml-24"
          >
            <p className="font-serif text-xl md:text-2xl leading-[1.4] text-foreground/70 font-light italic">
              &quot;Crafting intuitive UI/UX experiences, compelling visual identities, and engaging video content through design and storytelling.&quot;
            </p>
            
            <motion.div 
              className="mt-10 flex items-center gap-6 group cursor-pointer"
              whileHover="hover"
            >
              <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center text-primary overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-primary"
                  initial={{ y: "100%" }}
                  variants={{ hover: { y: 0 } }}
                  transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.6 }}
                />
                <ArrowUpRight className="relative z-10 group-hover:text-white transition-colors duration-300" size={20} />
              </div>
              <span className="font-serif text-lg tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                Explore Work
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Cinematic Imagery Section */}
        <div className="hidden md:flex md:col-span-4 lg:col-span-5 relative order-1 md:order-2 justify-center items-center">
          <motion.div
            variants={imageVariants}
            style={{ y: springY1 }}
            className="relative w-full aspect-[3/4] md:aspect-[4/5] max-w-[450px] overflow-hidden group"
          >
            {/* Elegant Frame */}
            <div className="absolute inset-4 border border-white/20 z-20 pointer-events-none transition-inset duration-700 group-hover:inset-0" />
            
            <Image 
              src="/link profile pic.png" 
              alt="Noel Joseph Varghese"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
            
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10 pointer-events-none" />
          </motion.div>

          {/* Floating Geometric Elements */}
          <motion.div 
            style={{ y: springY2 }}
            className="absolute -bottom-10 -left-10 w-40 h-40 border border-primary/20 -z-10 hidden lg:block"
          />
        </div>
      </motion.div>

      {/* Large Background Typography */}
      <motion.div 
        style={{ letterSpacing, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none w-full text-center"
      >
        <span className="text-[25vw] font-display uppercase leading-none opacity-[0.03] inline-block whitespace-nowrap">
          NOEL JOSEPH
        </span>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-12 flex flex-col items-center gap-4 hidden md:flex"
      >
        <div className="h-16 w-[1px] bg-foreground/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-primary"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="font-serif text-[10px] uppercase tracking-[0.4em] text-foreground/40 [writing-mode:vertical-lr]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
};


