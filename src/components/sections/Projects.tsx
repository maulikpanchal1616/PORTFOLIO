"use client";

import FlipCard3D from "@/components/ui/FlipCard3D";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Scholar AI",
    desc: "An AI-powered educational platform focused on solving mathematical problems with step-by-step explanations and smarter student learning experiences.",
    tech: ["React", "AI APIs", "TailwindCSS", "JavaScript"],
    image: "/images/project_scholar.png",
    github: "https://github.com/maulikpanchal1616/Scholar-AI"
  },
  {
    title: "Garage Management System",
    desc: "A complete management system designed to handle customer records, vehicle service details, workflow tracking, and operational management efficiently.",
    tech: ["Python", "SQL", "Django"],
    image: "/images/project_garage.png",
    github: "https://github.com/maulikpanchal1616/AUTO-ELITE-GARAGE"
  },
  {
    title: "Tuition Management System",
    desc: "A premium admin platform for managing tuition classes, student records, and automated administrative workflows with secure access controls.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    image: "/images/project_tuition.png",
    github: "https://github.com/maulikpanchal1616/TUTIION-MANAGEMENT-SYSTEM"
  },
  {
    title: "Khanipini",
    desc: "An online food ordering platform where shop owners can upload products and customers can browse and place orders seamlessly.",
    tech: ["HTML", "CSS", "JavaScript", "DBMS"],
    image: "/images/project_khanipini.png",
    github: "https://github.com/maulikpanchal1616/PANIPURI.COM"
  },
  {
    title: "Creative Portfolios",
    desc: "Designed responsive and visually engaging portfolio websites with modern layouts, animations, and premium user experiences.",
    tech: ["Next.js", "Framer Motion", "Tailwind"],
    image: "/images/project_portfolio.png",
    github: "https://github.com/maulikpanchal1616/Video-Editor-Portfolio"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-20 md:py-32 bg-gradient-to-b from-[var(--color-navy)] to-[var(--color-matte-black)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan)] to-white">Works</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A curated selection of cinematic digital experiences, blending engineering precision with aesthetic luxury.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <FlipCard3D 
                title={project.title}
                desc={project.desc}
                tech={project.tech}
                image={project.image}
                github={project.github}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
