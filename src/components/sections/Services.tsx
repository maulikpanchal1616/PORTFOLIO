"use client";

import { motion } from "framer-motion";

const services = [
  "Premium 3D Animated Website Development",
  "Futuristic UI/UX Design with AI-Assisted Workflows",
  "Modern Frontend Development",
  "Interactive Portfolio & Startup Website Design",
  "AI-Powered Web Experience Integration"
];

export default function Services() {
  return (
    <section id="services" className="relative w-full py-20 md:py-32 bg-gradient-to-b from-[var(--color-matte-black)] to-[var(--color-charcoal)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4">
            Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-neon-purple)]">Services</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Delivering world-class digital solutions engineered for the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl border border-white/10 hover:border-[var(--color-cyan)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 rounded-full border border-[var(--color-cyan)]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 glow-blue">
                <div className="w-4 h-4 bg-[var(--color-cyan)] rounded-full animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[var(--color-cyan)] transition-colors relative z-10 leading-snug">
                {service}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
