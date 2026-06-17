"use client";

import { motion } from "framer-motion";

const services = [
  {
    name: "Business Website Development",
    description: "Professional websites for small businesses and local businesses to establish a strong online presence.",
  },
  {
    name: "Portfolio Website Development",
    description: "Stunning portfolio websites for creatives, professionals, freelancers, and students.",
  },
  {
    name: "Startup Website Development",
    description: "Fast, modern websites for startups looking to attract investors and customers.",
  },
  {
    name: "Landing Page Development",
    description: "High-converting landing pages designed to drive leads and grow your business.",
  },
  {
    name: "Full Stack Web Development",
    description: "End-to-end web application development with Next.js, React, and modern backend technologies.",
  },
  {
    name: "Custom Website Development",
    description: "Fully custom websites tailored to your specific business goals and requirements.",
  },
  {
    name: "SEO Friendly Website Development",
    description: "Websites built with SEO best practices, fast load times, and structured data for better Google rankings.",
  },
  {
    name: "Website Redesign Services",
    description: "Modernize and upgrade your existing website with a fresh, high-performance design.",
  },
  {
    name: "Next.js Development",
    description: "Blazing-fast, SEO-optimized web apps and websites built with the Next.js framework.",
  },
  {
    name: "React Development",
    description: "Dynamic, interactive user interfaces and web applications built with React.",
  },
  {
    name: "Performance Optimization",
    description: "Improve your website's Core Web Vitals, speed, and overall performance for better rankings.",
  },
  {
    name: "Personal Branding Website",
    description: "Establish your professional identity online with a premium personal branding website.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-label="Web development services offered by MaulikVP — freelance web developer in Ahmedabad, Gujarat, India"
      className="relative w-full py-20 md:py-32 bg-transparent overflow-hidden"
      style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">
            Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-neon-purple)] filter drop-shadow-[0_0_25px_rgba(0,229,255,0.5)]">Services</span>
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
              itemScope
              itemType="https://schema.org/Service"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 rounded-full border border-[var(--color-cyan)]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 glow-blue">
                <div className="w-4 h-4 bg-[var(--color-cyan)] rounded-full animate-pulse" />
              </div>
              <h3
                className="text-xl font-bold text-white group-hover:text-[var(--color-cyan)] transition-colors relative z-10 leading-snug"
                itemProp="name"
              >
                {service.name}
              </h3>
              <p className="sr-only" itemProp="description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
