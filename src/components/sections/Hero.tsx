"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import HeroParticles from "@/components/3d/HeroParticles";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[var(--color-matte-black)]">
      {/* Bottom Fade Overlay for 3D Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-matte-black)] to-transparent z-20 pointer-events-none" />

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
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none"
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
            href="/#contact" 
            onClick={(e) => handleScrollTo(e, "contact")}
            className="magnetic group relative px-8 py-4 text-white font-medium rounded-full glass hover:bg-white/10 transition-colors duration-500 w-full sm:w-auto text-center"
          >
            Let's Build Something
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
