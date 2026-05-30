"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import HeroParticles from "@/components/3d/HeroParticles";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "done">("idle");

  const handleDownload = () => {
    setDownloadStatus("downloading");
    setTimeout(() => {
      setDownloadStatus("done");
      setTimeout(() => {
        setDownloadStatus("idle");
      }, 2000);
    }, 1500);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/#${targetId}`);
    }
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-transparent" style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)' }}>
      {/* Hero content */}

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <HeroParticles />
        </Canvas>
      </div>

      {/* Cursor Mask Reveal / Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-40 mix-blend-screen"
        animate={{
          background: `radial-gradient(circle 600px at ${(mousePosition.x + 1) * 50}vw ${(1 - mousePosition.y) * 50}vh, rgba(0,240,255,0.15), transparent 80%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <span className="text-[var(--color-cyan)] font-mono tracking-widest text-sm md:text-base uppercase mb-4 block">
            Full Stack Developer
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/20 pb-4">
            MAULIK
            <br />
            PANCHAL
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/60 font-light max-w-2xl mt-6 tracking-wide"
        >
          I build premium interactive websites, futuristic user interfaces, and AI-powered digital experiences with modern technologies and cinematic design systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none justify-center"
        >
          <a 
            href="/#projects" 
            onClick={(e) => handleScrollTo(e, "projects")}
            className="magnetic group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden w-full sm:w-auto text-center"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-neon-purple)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
          </a>
          
          <a 
            href="/MAULIK V PANCHAL .pdf" 
            download="Maulik_Panchal_Resume.pdf"
            onClick={handleDownload}
            className={`magnetic group relative px-8 py-4 font-medium rounded-full transition-all duration-500 w-full sm:w-auto text-center flex items-center justify-center gap-2 overflow-hidden ${
              downloadStatus === "downloading" ? "text-[var(--color-cyan)] bg-white/10" : 
              downloadStatus === "done" ? "text-green-400 bg-green-500/20" : 
              "text-white glass hover:bg-white/10"
            }`}
          >
            {/* Background progress animation for downloading */}
            {downloadStatus === "downloading" && (
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="absolute inset-0 bg-[var(--color-cyan)]/20 z-0"
              />
            )}
            
            <div className="relative z-10 flex items-center gap-2">
              {downloadStatus === "idle" && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform duration-300"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  <span>Download Resume</span>
                </>
              )}
              {downloadStatus === "downloading" && (
                <>
                  <motion.svg animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></motion.svg>
                  <span>Downloading...</span>
                </>
              )}
              {downloadStatus === "done" && (
                <>
                  <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></motion.svg>
                  <span>Downloaded!</span>
                </>
              )}
            </div>
          </a>

          <a 
            href="/#contact" 
            onClick={(e) => handleScrollTo(e, "contact")}
            className="magnetic group relative px-8 py-4 text-white/60 hover:text-white font-medium rounded-full transition-all duration-500 w-full sm:w-auto text-center flex items-center justify-center gap-2"
          >
            <span>Let's Build Something</span>
            <motion.svg 
              animate={{ x: [0, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
            >
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </motion.svg>
          </a>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
        />
      </div>
    </section>
  );
}
