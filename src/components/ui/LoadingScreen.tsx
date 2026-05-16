"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";

function LoadingCore() {
  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <Icosahedron args={[1, 2]}>
        <meshStandardMaterial 
          color="#00f0ff" 
          wireframe 
          transparent 
          opacity={0.6} 
          emissive="#00f0ff"
          emissiveIntensity={2}
        />
      </Icosahedron>
      <Icosahedron args={[0.8, 1]}>
        <MeshDistortMaterial
          color="#a855f7"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#a855f7"
          emissiveIntensity={0.5}
        />
      </Icosahedron>
    </Float>
  );
}

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[var(--color-matte-black)] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 3D Background for Loader */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
              <LoadingCore />
            </Canvas>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-heading font-black tracking-[0.2em] text-white flex items-center gap-2"
            >
              MP<span className="text-[var(--color-electric-blue)]">.</span>
            </motion.div>

            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-neon-purple)] shadow-[0_0_10px_rgba(0,240,255,0.8)]"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/40 text-xs tracking-[0.3em] uppercase"
            >
              Initializing Digital Experience
            </motion.p>
          </div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-electric-blue)]/5 rounded-full blur-[120px] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
