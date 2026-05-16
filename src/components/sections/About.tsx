"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-20 md:py-40 bg-gradient-to-b from-[var(--color-matte-black)] to-[var(--color-charcoal)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10 md:gap-20">
        
        {/* Profile Image / Abstract Frame */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="relative w-full md:w-1/2 aspect-square max-w-md"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-electric-blue)] to-[var(--color-neon-purple)] rounded-3xl blur-3xl opacity-30 animate-pulse" />
          <div className="relative w-full h-full glass rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center group">
            <img src="/images/profile.png" alt="Maulik Panchal Profile" className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none" />
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-[90%] h-[90%] border border-[var(--color-cyan)]/30 rounded-3xl pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Layered Typography */}
        <motion.div 
          style={{ y: y2, opacity }}
          className="w-full md:w-1/2 flex flex-col gap-8"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-electric-blue)]">Me</span>
          </h2>
          <div className="flex flex-col gap-4 text-lg text-white/70 font-light leading-relaxed">
            <p>
              I’m a passionate Full Stack Developer focused on building futuristic digital products, cinematic user interfaces, and AI-powered experiences. I enjoy combining modern technologies, interactive design, and creative problem-solving to create visually immersive and meaningful web applications.
            </p>
            <p>
              As a BCA final year student, I continuously explore modern frontend technologies, AI integrations, and startup-level digital experiences. My goal is to create products that feel innovative, visually memorable, and impactful for users.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap mt-4">
            {["Full Stack Development", "AI-Powered Applications", "Interactive UI/UX Design", "Modern Frontend Experiences", "Startup-Focused Product Building"].map((tech, i) => (
              <span key={i} className="px-4 py-2 rounded-full glass text-sm text-white/80 border border-white/5 hover:border-[var(--color-cyan)] hover:text-white transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
