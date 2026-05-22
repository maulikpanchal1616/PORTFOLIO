"use client";

import FlipCard3D from "@/components/ui/FlipCard3D";
import { motion } from "framer-motion";

const projects = [
  {
    title: "AXAR AI & Enterprise",
    desc: "A premium industrial intelligence platform for high-efficiency Spray/Rotary Dryers. Powered by next-gen intelligent thermal engineering, featuring real-time energy efficiency dashboards and interactive industrial chatbot UI.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    image: "/images/project_akshar.png",
    live: "https://aksharenterprise.vercel.app/"
  },
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
    github: "https://github.com/maulikpanchal1616/AUTO-ELITE-GARAGE",
    live: "https://autoelitegarage.vercel.app/"
  },
  {
    title: "Tuition Management System",
    desc: "A premium admin platform for managing tuition classes, student records, and automated administrative workflows with secure access controls.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    image: "/images/project_tuition.png",
    github: "https://github.com/maulikpanchal1616/TUTIION-MANAGEMENT-SYSTEM"
  },
  {
    title: "Khanipini Store",
    desc: "An online food ordering platform where shop owners can upload products and customers can browse and place orders seamlessly.",
    tech: ["HTML", "CSS", "JavaScript", "DBMS"],
    image: "/images/project_khanipini.png",
    github: "https://github.com/maulikpanchal1616/PANIPURI.COM",
    live: "https://khanipinistore.vercel.app/"
  },
  {
    title: "Crush Coffee Shop",
    desc: "A premium, responsive digital menu and website experience for a luxury coffee brand, built with smooth scrolling animations and modern UI aesthetics.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    image: "/images/project_crushcoffee.png",
    github: "https://github.com/maulikpanchal1616/CRUSHCOFFE-WEBSITE.git",
    live: "https://crushcoffee.vercel.app/"
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
    <section id="projects" className="relative w-full py-20 md:py-32 bg-transparent overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}>
      <div className="max-w-7xl mx-auto px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-neon-purple)] filter drop-shadow-[0_0_25px_rgba(0,229,255,0.5)]">Works</span>
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
                live={project.live}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
