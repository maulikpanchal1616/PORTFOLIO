"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const Github = ({ size = 24, className = "" }: { size?: number | string, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface EvolutionChapterProps {
  title: string;
  projectTitle: string;
  desc: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  impact?: string;
  outcome?: string;
  scrollYProgress: MotionValue<number>;
  range: [number, number, number, number]; // [start fade in, fully in, start fade out, fully out]
  accent: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function EvolutionChapter({
  title,
  projectTitle,
  desc,
  tech,
  image,
  github,
  live,
  impact,
  outcome,
  scrollYProgress,
  range,
  accent,
  isFirst = false,
  isLast = false,
}: EvolutionChapterProps) {
  // True 3D Depth Corridor Effect
  const z = useTransform(scrollYProgress, range, [isFirst ? 0 : -1000, 0, 0, isLast ? 0 : 800]);
  const rotateX = useTransform(scrollYProgress, range, [isFirst ? 0 : 10, 0, 0, isLast ? 0 : -10]);
  const opacity = useTransform(scrollYProgress, range, [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]);

  return (
    <motion.div
      style={{
        z,
        rotateX,
        opacity,
        transformOrigin: "center center",
        pointerEvents: useTransform(scrollYProgress, (v) => 
          v >= range[1] && v <= range[2] ? "auto" : "none"
        )
      }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
    >
      {/* Background Accent */}
      {accent}

      <div className="relative z-10 w-full max-w-[95%] md:max-w-4xl lg:max-w-5xl flex flex-col items-center max-h-[90vh]">
        
        {/* Chapter Header */}
        <div className="text-center mb-4 md:mb-6 shrink-0">
          <span className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase mb-1 md:mb-2 block drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            {title}
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter drop-shadow-lg">
            {projectTitle}
          </h2>
        </div>

        {/* Hero Image - Perfectly Medium Sized */}
        <div className="w-full relative shrink min-h-[160px] max-h-[30vh] md:max-h-[40vh] rounded-xl md:rounded-2xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#050505] group mb-4 md:mb-6 flex-1">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] pointer-events-none z-10" />
          
          <img 
            src={image} 
            alt={projectTitle} 
            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-700 ease-out"
          />
        </div>

        {/* Metadata Grid */}
        <div className="w-full shrink-0 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-5 md:p-6 rounded-xl md:rounded-2xl overflow-y-auto max-h-[40vh] md:max-h-none scrollbar-hide shadow-xl">
          
          <div className="md:col-span-2 flex flex-col">
            <h3 className="text-sm md:text-base font-semibold text-white mb-2">Project Overview</h3>
            <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-4 font-light">
              {desc}
            </p>
            
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-5">
              {tech.map((item) => (
                <span 
                  key={item} 
                  className="px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-medium text-cyan-50 bg-cyan-950/30 rounded-full border border-cyan-500/20"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex gap-2 md:gap-3 mt-auto">
              {live && (
                <Link 
                  href={live} 
                  target="_blank" 
                  className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold text-black bg-white px-3 md:px-5 py-2 rounded-full hover:bg-cyan-400 hover:scale-105 transition-all duration-300"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={12} strokeWidth={2.5} />
                </Link>
              )}
              {github && (
                <Link 
                  href={github} 
                  target="_blank" 
                  className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold text-white bg-white/10 px-3 md:px-5 py-2 rounded-full hover:bg-white/20 border border-white/10 transition-all duration-300"
                >
                  <Github size={12} />
                  <span>Source Code</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 justify-center">
            <div>
              <h3 className="text-[9px] md:text-[10px] font-mono text-cyan-400 mb-1 uppercase tracking-wider">Impact</h3>
              <p className="text-white/90 text-[11px] md:text-xs leading-relaxed">{impact || "High-efficiency performance and scalable architecture."}</p>
            </div>
            <div>
              <h3 className="text-[9px] md:text-[10px] font-mono text-cyan-400 mb-1 uppercase tracking-wider">Outcome</h3>
              <p className="text-white/90 text-[11px] md:text-xs leading-relaxed">{outcome || "Delivered a premium digital experience with cutting-edge tech."}</p>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
