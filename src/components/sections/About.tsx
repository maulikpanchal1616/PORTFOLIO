"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HangingIdCard from "@/components/ui/HangingIdCard";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "done">("idle");
  
  const handleDownload = () => {
    setDownloadStatus("downloading");
    setTimeout(() => {
      setDownloadStatus("done");
      setTimeout(() => setDownloadStatus("idle"), 2000);
    }, 1500);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-20 md:py-40 bg-transparent overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10 md:gap-20">
        
        {/* Interactive Physics-based Hanging Developer Badge */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="relative w-full md:w-1/2 flex items-center justify-center min-h-[380px] md:min-h-[450px]"
        >
          {/* Subtle background cosmic glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-cyan)]/10 to-[var(--color-neon-purple)]/10 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none" />
          
          <HangingIdCard 
            accentColor="var(--color-cyan)"
            ropeColor="rgba(255, 255, 255, 0.15)"
            className="z-10"
          />
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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <a 
              href="/MAULIK V PANCHAL.pdf" 
              download="Maulik_Panchal_Resume.pdf"
              onClick={handleDownload}
              className={`magnetic group relative inline-flex items-center gap-3 px-8 py-4 font-bold rounded-2xl border transition-all duration-300 overflow-hidden ${
                downloadStatus === "downloading" ? "bg-[var(--color-cyan)]/10 text-[var(--color-cyan)] border-[var(--color-cyan)]/30" :
                downloadStatus === "done" ? "bg-green-500/10 text-green-400 border-green-500/30" :
                "bg-white/5 hover:bg-white/10 text-white border-white/10"
              }`}
            >
              {downloadStatus === "downloading" && (
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 bg-[var(--color-cyan)]/10 z-0"
                />
              )}
              
              <div className="relative z-10 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  downloadStatus === "downloading" ? "bg-[var(--color-cyan)]/20" :
                  downloadStatus === "done" ? "bg-green-500/20" :
                  "bg-[var(--color-cyan)]/20 group-hover:bg-[var(--color-cyan)]"
                }`}>
                  {downloadStatus === "idle" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-cyan)] group-hover:text-black transition-colors duration-300"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  )}
                  {downloadStatus === "downloading" && (
                    <motion.svg animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-cyan)]"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></motion.svg>
                  )}
                  {downloadStatus === "done" && (
                    <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M20 6 9 17l-5-5"/></motion.svg>
                  )}
                </div>
                <span className="tracking-wide">
                  {downloadStatus === "idle" ? "Download Full Resume" : 
                   downloadStatus === "downloading" ? "Downloading..." : "Downloaded!"}
                </span>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
