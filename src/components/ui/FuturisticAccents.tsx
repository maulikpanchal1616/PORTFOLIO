"use client";

import { motion } from "framer-motion";

export function CreativeAccents() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-64 h-32 border border-white/10 rounded-lg bg-white/[0.02] backdrop-blur-md"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[15%] w-48 h-48 border border-white/10 rounded-full bg-cyan-500/[0.02] backdrop-blur-md"
      />
    </div>
  );
}

export function BusinessAccents() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
            <stop offset="50%" stopColor="rgba(56, 189, 248, 0.4)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 100 800 C 400 800, 300 200, 800 200 S 1200 600, 1800 600"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.path
          d="M 200 900 C 500 900, 400 300, 900 300 S 1300 700, 1900 700"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "mirror" }}
        />
      </svg>
      {/* Nodes */}
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-[30%] left-[25%] w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute bottom-[40%] right-[30%] w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6]" />
    </div>
  );
}

export function ScholarAccents() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0,transparent_50%)]" />
      {/* Abstract Neural Nodes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, (i * 13 % 40) - 20, 0],
            y: [0, (i * 17 % 40) - 20, 0],
            opacity: [0.2, 0.6, 0.2] 
          }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_10px_#67e8f9]"
          style={{
            top: `${20 + (i * 23 % 60)}%`,
            left: `${10 + (i * 29 % 80)}%`,
          }}
        />
      ))}
    </div>
  );
}

export function EnterpriseAccents() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 flex items-center justify-center">
      {/* Holographic Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] border border-cyan-500/20 rounded-full border-dashed"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] border-2 border-blue-500/10 rounded-full"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]" />
    </div>
  );
}

export function SocietyAccents() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
      {/* Smart City Grid Perspective */}
      <div 
        className="absolute inset-0 w-full h-[150%] top-[-25%] border-cyan-500/10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          transform: 'perspective(1000px) rotateX(60deg) scale(2)',
          transformOrigin: 'bottom center',
        }}
      />
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
      <motion.div
        animate={{ opacity: [0.1, 0.5, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/20 blur-[100px] rounded-full"
      />
    </div>
  );
}
