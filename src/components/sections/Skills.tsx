"use client";

import { Canvas } from "@react-three/fiber";
import SkillsSpheres from "@/components/3d/SkillsSpheres";
import { motion } from "framer-motion";
import { OrbitControls } from "@react-three/drei";

export default function Skills() {
  return (
    <section id="skills" className="relative w-full h-screen bg-gradient-to-b from-[var(--color-charcoal)] to-[var(--color-navy)] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Seamless Fade Overlays for 3D Elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[var(--color-charcoal)] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-navy)] to-transparent z-20 pointer-events-none" />

      <div className="absolute top-20 left-0 right-0 z-30 text-center pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white tracking-tight px-4"
        >
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-cyan)]">Arsenal</span>
        </motion.h2>
      </div>

      <div className="absolute inset-0 z-10 cursor-move">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
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
