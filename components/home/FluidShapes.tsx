"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useMode } from "@/lib/ModeContext";

export const FluidShapes = () => {
  const shouldReduceMotion = useReducedMotion();
  const { mode } = useMode();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 50,
        y: (e.clientY / window.innerHeight - 0.5) * 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const springX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200]);
  const blob1Y = useTransform(scrollY, [0, 1000], [0, -100]);
  const blob2Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const blob2X = useTransform(springX, (val) => -val);
  const accent2X = useTransform(springX, (val) => -val * 1.5);

  if (mode !== "creative") return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Soft gradient blob 1 */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : springX,
          y: shouldReduceMotion ? 0 : blob1Y,
          translateX: "10%",
          translateY: "20%",
        }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]"
      />
      
      {/* Soft gradient blob 2 */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : blob2X,
          y: shouldReduceMotion ? 0 : blob2Y,
          translateX: "-10%",
          translateY: "40%",
        }}
        className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-primary/3 blur-[140px]"
      />

      {/* Floating accent shape 1 */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ x: springX, y: parallaxY }}
          className="absolute top-[20%] left-[15%] w-32 h-32 border border-primary/10 rounded-full"
        />
      )}

      {/* Floating accent shape 2 */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            y: [0, 25, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{ x: accent2X, y: parallaxY }}
          className="absolute bottom-[30%] right-[10%] w-48 h-48 border border-primary/5 rounded-[40%]"
        />
      )}
    </div>
  );
};
