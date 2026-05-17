"use client";

import { motion } from "framer-motion";

const certifications = [
  "Python with Django",
  "Ethical Hacking Fundamentals",
  "5G Technology & Networking — Nokia"
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative w-full py-20 md:py-32 bg-transparent overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-cyan)] filter drop-shadow-[0_0_25px_rgba(0,229,255,0.5)]">Certifications</span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-6 flex-wrap">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass px-8 py-6 rounded-2xl border border-[var(--color-neon-purple)]/20 hover:border-[var(--color-neon-purple)] transition-colors duration-500 flex items-center gap-4 group cursor-default"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--color-neon-purple)]/20 flex items-center justify-center group-hover:bg-[var(--color-neon-purple)]/40 transition-colors">
                <div className="w-2 h-2 bg-[var(--color-cyan)] rounded-full glow-blue" />
              </div>
              <span className="text-white font-medium text-lg">{cert}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
