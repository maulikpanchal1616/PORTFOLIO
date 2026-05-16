"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    year: "Aug 2025 – Mar 2026",
    role: "MERN Stack Intern",
    company: "Brainy Beam InfoTech Pvt. Ltd.",
    desc: "Developing full-stack web applications, optimizing databases, and engineering robust backend APIs using MongoDB, Express, React, and Node.js."
  },
  {
    year: "Dec 2025 – Feb 2026",
    role: "Cybersecurity Intern",
    company: "Patel Web Solution",
    desc: "Conducted security audits, identified system vulnerabilities, and implemented secure coding practices."
  },
  {
    year: "Dec 2025 – Feb 2026",
    role: "Technology Intern (5G & Networking)",
    company: "ITI Kuber Nagar",
    desc: "Gained hands-on experience in 5G technology, modern networking protocols, and telecommunications infrastructure."
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="relative w-full py-20 md:py-32 bg-transparent overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
      <div className="max-w-4xl mx-auto px-4 relative">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight">
            Journey & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-neon-purple)]">Evolution</span>
          </h2>
        </motion.div>

        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-[200px] bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div 
            className="w-full bg-gradient-to-b from-[var(--color-cyan)] to-[var(--color-neon-purple)] glow-blue origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="flex flex-col gap-20">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[var(--color-matte-black)] border-2 border-[var(--color-cyan)] rounded-full -translate-x-1/2 z-10 glow-blue" />
                
                <div className="w-full md:w-1/2 pl-12 md:pl-0 flex flex-col" style={{ alignItems: isEven ? 'flex-start' : 'flex-end', textAlign: isEven ? 'left' : 'right' }}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="glass p-8 rounded-2xl border border-white/10 hover:border-[var(--color-cyan)]/50 transition-colors group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[var(--color-cyan)] text-sm font-bold tracking-widest uppercase mb-2 block">{exp.year}</span>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[var(--color-electric-blue)] transition-colors">{exp.role}</h3>
                    <h4 className="text-white/80 font-medium mb-4">{exp.company}</h4>
                    <p className="text-white/60 font-light">{exp.desc}</p>
                  </motion.div>
                </div>
                
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
