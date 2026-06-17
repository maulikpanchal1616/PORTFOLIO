"use client";

import { Canvas } from "@react-three/fiber";
import SkillsSpheres from "@/components/3d/SkillsSpheres";
import { motion } from "framer-motion";
import { OrbitControls } from "@react-three/drei";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-label="Technical skills of MaulikVP — Next.js, React, TypeScript, Python, Django, JavaScript, full stack web development technologies"
      className="relative w-full h-[80vh] md:h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center"
      style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}
    >
      
      {/* Background is handled globally by Global3DBackground */}
 
      <div className="absolute top-20 md:top-24 left-0 right-0 z-30 text-center pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white tracking-tight px-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
        >
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-cyan)] filter drop-shadow-[0_0_25px_rgba(0,229,255,0.5)]">Arsenal</span>
        </motion.h2>
      </div>

      <div className="absolute inset-0 z-10 cursor-move">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
          <SkillsSpheres />
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <p className="text-white/40 text-sm tracking-widest uppercase glow-text">Drag to explore</p>
      </div>
    </section>
  );
}
