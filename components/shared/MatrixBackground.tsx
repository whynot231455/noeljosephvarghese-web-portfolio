"use client";

import { useEffect, useRef } from "react";
import { useMode } from "@/lib/ModeContext";

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = "01010101010101010101";
    const fontSize = 10;
    const columns = Math.floor(width / fontSize);

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let frameCount = 0;
    const draw = () => {
      // If reduced motion is preferred, we only draw every 4th frame to slow it down significantly
      if (prefersReducedMotion && frameCount % 4 !== 0) {
        frameCount++;
        return;
      }
      frameCount++;

      ctx.fillStyle = "rgba(13, 17, 23, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#58A6FF"; 
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      cancelAnimationFrame(animationId);
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);

      if (newColumns > drops.length) {
          for (let i = drops.length; i < newColumns; i++) {
              drops[i] = Math.random() * -100;
          }
      } else {
          drops.length = newColumns;
      }
      
      animate();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (mode !== "developer") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: 0.15 }}
    />
  );
};
