"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FlipCard3D({ title, desc, tech, image, github }: { title: string, desc: string, tech: string[], image?: string, github?: string }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="relative w-full aspect-[4/3] [perspective:1000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] glass rounded-2xl p-6 flex flex-col justify-end overflow-hidden border border-white/10 group bg-[var(--color-charcoal)]">
          {image && (
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 z-0" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          <motion.div 
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 240, 255, 0.15), transparent 40%)`
            }}
          />
          <div className="relative z-30">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-cyan)] transition-colors">{title}</h3>
            <p className="text-white/60 text-sm line-clamp-2">{desc}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] glass rounded-2xl p-6 flex flex-col items-center justify-center border border-[var(--color-electric-blue)] bg-[var(--color-navy)] shadow-[0_0_30px_rgba(0,240,255,0.2)]" style={{ transform: "rotateX(180deg)" }}>
          <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {tech.map((t) => (
              <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[var(--color-cyan)] glow-text">
                {t}
              </span>
            ))}
          </div>
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform magnetic inline-flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3.4 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/></svg>
              View on GitHub
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
