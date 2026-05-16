"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full py-12 bg-transparent border-t border-white/5 overflow-hidden flex flex-col items-center justify-center">
      {/* Glowing Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent opacity-50" />
      
      {/* Subtle animated background */}
      <motion.div 
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-electric-blue)]/5 to-transparent pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <p className="text-white/60 font-light tracking-wide">
          Designed & Developed by <span className="text-white font-medium">Maulik Panchal</span>
        </p>

        <div className="flex gap-8 text-sm font-medium">
          <a href="https://github.com/maulikpanchal1616" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[var(--color-cyan)] transition-colors magnetic">GitHub</a>
          <a href="https://linkedin.com/in/maulik-panchal-260621295" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[var(--color-cyan)] transition-colors magnetic">LinkedIn</a>
          <a href="mailto:maulikvpanchal2006@gmail.com" className="text-white/50 hover:text-[var(--color-cyan)] transition-colors magnetic">Email</a>
        </div>
      </div>
    </footer>
  );
}
