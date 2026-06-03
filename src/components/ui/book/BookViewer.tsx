"use client";

import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

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

// Types
interface ProjectInfo {
  title: string;
  desc: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  impact?: string;
  outcome?: string;
}

interface Chapter {
  chapterTitle: string;
  narrative: string;
  projects: ProjectInfo[];
}

// -------------------------------------------------------------
// PAGE COMPONENT (Must use forwardRef for react-pageflip)
// -------------------------------------------------------------
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; number?: number; isCover?: boolean }>(
  ({ children, number, isCover }, ref) => {
    return (
      <div 
        className={`page relative bg-[#e3ded9] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] overflow-hidden ${isCover ? 'cover-page' : 'standard-page'}`} 
        ref={ref}
      >
        {/* Subtle Paper Texture Overlay (Optimized for Mobile GPU) */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
        
        {/* Page Content */}
        <div className="relative w-full h-full p-6 md:p-10 flex flex-col z-10">
          {children}
        </div>

        {/* Page Number (if not cover) */}
        {!isCover && number && (
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-[10px] md:text-xs font-mono text-black/40">
            {number}
          </div>
        )}
        {!isCover && number && number % 2 !== 0 && (
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-[10px] md:text-xs font-mono text-black/40">
            {number}
          </div>
        )}

        {/* Realistic Inner Shadow/Gradient for Spine */}
        {!isCover && (
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-20" />
        )}
      </div>
    );
  }
);

Page.displayName = 'Page';

// -------------------------------------------------------------
// COVER DESIGN
// -------------------------------------------------------------
const BookCover = React.forwardRef<HTMLDivElement, { title: string; subtitle: string; desc: string }>(
  ({ title, subtitle, desc }, ref) => {
    return (
      <div 
        className="page relative bg-[#111] border-r border-[#333] shadow-2xl overflow-hidden" 
        ref={ref}
      >
        {/* Leather/Premium Texture */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-leather.png")' }}></div>
        
        <div className="relative w-full h-full p-10 md:p-16 flex flex-col justify-center items-center text-center z-10">
          
          <div className="border border-white/20 p-8 md:p-12 w-full h-full flex flex-col items-center justify-center relative">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40"></div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-widest uppercase mb-4 font-serif"
              style={{ textShadow: '0 2px 10px rgba(255,255,255,0.3)' }}
            >
              {title}
            </motion.h1>
            
            <div className="w-16 h-px bg-cyan-500/50 my-6"></div>

            <h2 className="text-xl md:text-2xl text-cyan-400 font-mono tracking-[0.3em] uppercase mb-8">
              {subtitle}
            </h2>

            <p className="text-white/40 text-xs md:text-sm tracking-widest uppercase max-w-[80%] leading-relaxed font-light">
              {desc}
            </p>
          </div>

        </div>
        
        {/* Spine Lighting */}
        <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black via-white/5 to-transparent pointer-events-none z-20" />
      </div>
    );
  }
);

BookCover.displayName = 'BookCover';


// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
export default function BookViewer({ chapters }: { chapters: Chapter[] }) {
  const bookRef = useRef<any>(null);

  let pageCounter = 1;

  return (
    <div className="w-full flex justify-center items-center perspective-[2000px]">
      {/* @ts-ignore - react-pageflip typings are sometimes tricky in TS */}
      <HTMLFlipBook 
        width={400} 
        height={500} 
        size="stretch"
        minWidth={300}
        maxWidth={450}
        minHeight={400}
        maxHeight={550}
        maxShadowOpacity={0.6}
        showCover={true}
        mobileScrollSupport={true}
        className="demo-book shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        style={{ margin: '0 auto' }}
        ref={bookRef}
        usePortrait={true}
        drawShadow={true}
        flippingTime={750}
      >
        
        {/* FRONT COVER */}
        <BookCover 
          title="Maulik Panchal" 
          subtitle="The Builder's Journey" 
          desc="Web Development • AI Systems • SaaS Products • Enterprise Platforms" 
        />

        {/* INNER PAGES (Chapters & Projects) */}
        {chapters.flatMap((chapter, chapterIdx) => {
          
          return chapter.projects.flatMap((project, projIdx) => {
            const leftPageNum = pageCounter++;
            const rightPageNum = pageCounter++;
            
            return [
                // LEFT PAGE - HERO VISUAL
                <Page key={`left-${chapterIdx}-${projIdx}`} number={leftPageNum}>
                  <div className="w-full h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-mono text-cyan-700 tracking-[0.2em] uppercase">Chapter {chapterIdx + 1} — {chapter.chapterTitle}</span>
                    </div>
                    
                    <div className="flex-1 w-full bg-[#111] rounded-sm p-2 shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-[#222] flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-cyan-500/10 to-transparent z-10" />
                      <img 
                        src={project.image} 
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top opacity-90 brightness-90 contrast-125"
                      />
                    </div>
                  </div>
                </Page>,

                // RIGHT PAGE - TYPOGRAPHY & DETAILS
                <Page key={`right-${chapterIdx}-${projIdx}`} number={rightPageNum}>
                  <div className="w-full h-full flex flex-col">
                    <h3 className="text-3xl font-serif font-bold text-[#111] mb-2 leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="w-8 h-0.5 bg-cyan-600 mb-6"></div>

                    <p className="text-[#333] text-sm md:text-base leading-relaxed font-serif mb-8">
                      {project.desc}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-[10px] font-mono text-[#666] tracking-widest uppercase mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(tech => (
                          <span key={tech} className="px-2 py-1 text-[10px] font-medium text-[#444] border border-[#ddd] bg-white/50 rounded-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-5 mt-auto pb-4">
                      {project.impact && (
                        <div>
                          <h4 className="text-[10px] font-mono text-[#666] tracking-widest uppercase mb-1">Narrative / Impact</h4>
                          <p className="text-[#333] text-xs font-serif leading-relaxed italic border-l-2 border-cyan-600/30 pl-3 py-1">
                            {project.impact}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex gap-4 pt-4 border-t border-[#ddd]">
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-black hover:text-cyan-600 transition-colors">
                            <span>Live Demo</span>
                            <ExternalLink size={12} strokeWidth={2} />
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-[#555] hover:text-black transition-colors">
                            <Github size={12} />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </Page>
            ];
          });
        })}

        {/* BACK COVER */}
        <BookCover 
          title="" 
          subtitle="The End." 
          desc="Thank you for reading." 
        />

      </HTMLFlipBook>
    </div>
  );
}
