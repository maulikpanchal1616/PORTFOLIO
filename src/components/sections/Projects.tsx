"use client";

import { motion } from "framer-motion";
import DigitalBook from "@/components/ui/book/DigitalBook";

const chapters = [
  {
    chapterTitle: "Creative Foundations",
    narrative: "Learning visual design, user experience, responsive development, and digital product presentation.",
    projects: [
      {
        title: "Creative Portfolios",
        desc: "Designed responsive and visually engaging portfolio websites with modern layouts, animations, and premium user experiences.",
        tech: ["Next.js", "Framer Motion", "Tailwind"],
        image: "/images/project_portfolio.png",
        github: "https://github.com/maulikpanchal1616/Video-Editor-Portfolio",
        impact: "Established a strong foundation in modern frontend architecture and aesthetic web design.",
        outcome: "Delivered highly immersive, interactive experiences for digital creatives."
      },
      {
        title: "Crush Coffee Shop",
        desc: "A premium, responsive digital menu and website experience for a luxury coffee brand, built with smooth scrolling animations and modern UI aesthetics.",
        tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        image: "/images/project_crushcoffee.png",
        github: "https://github.com/maulikpanchal1616/CRUSHCOFFE-WEBSITE.git",
        live: "https://crushcoffee.vercel.app/",
        impact: "Transformed a traditional cafe into a modern digital brand with a premium online presence.",
        outcome: "Increased customer engagement through a stunning visual presentation of luxury products."
      },
      {
        title: "Khanipini Store",
        desc: "An online food ordering platform where shop owners can upload products and customers can browse and place orders seamlessly.",
        tech: ["HTML", "CSS", "JavaScript", "DBMS"],
        image: "/images/project_khanipini.png",
        github: "https://github.com/maulikpanchal1616/PANIPURI.COM",
        live: "https://khanipinistore.vercel.app/",
        impact: "Bridged the gap between local vendors and digital commerce with an intuitive interface.",
        outcome: "Created a scalable foundation for multi-vendor e-commerce solutions."
      }
    ]
  },
  {
    chapterTitle: "Business Systems",
    narrative: "Moving beyond websites to solve operational and workflow challenges.",
    projects: [
      {
        title: "Garage Management System",
        desc: "A complete management system designed to handle customer records, vehicle service details, workflow tracking, and operational management efficiently.",
        tech: ["Python", "SQL", "Django"],
        image: "/images/project_garage.png",
        github: "https://github.com/maulikpanchal1616/AUTO-ELITE-GARAGE",
        live: "https://autoelitegarage.vercel.app/",
        impact: "Automated end-to-end operational workflows for automotive businesses.",
        outcome: "Provided a complete, scalable tracking system that eliminated manual paperwork."
      },
      {
        title: "Tuition Management System",
        desc: "A premium admin platform for managing tuition classes, student records, and automated administrative workflows with secure access controls.",
        tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
        image: "/images/project_tuition.png",
        github: "https://github.com/maulikpanchal1616/TUTIION-MANAGEMENT-SYSTEM",
        impact: "Engineered robust CRUD operations and secure multi-role architectures.",
        outcome: "Streamlined business operations and reduced administrative overhead for educational institutes."
      }
    ]
  },
  {
    chapterTitle: "Artificial Intelligence",
    narrative: "Exploring intelligent systems and AI-powered learning experiences.",
    projects: [
      {
        title: "Scholar AI",
        desc: "An AI-powered educational platform focused on solving mathematical problems with step-by-step explanations and smarter student learning experiences.",
        tech: ["React", "AI APIs", "TailwindCSS", "JavaScript"],
        image: "/images/project_scholar.png",
        github: "https://github.com/maulikpanchal1616/Scholar-AI",
        impact: "Pioneered intelligent tutoring systems to democratize advanced mathematical problem solving.",
        outcome: "Created an intuitive, AI-driven educational interface that adapts to student needs."
      }
    ]
  },
  {
    chapterTitle: "Enterprise Intelligence",
    narrative: "Building intelligent industrial platforms with analytics, monitoring, and operational intelligence.",
    projects: [
      {
        title: "AXAR AI & Enterprise",
        desc: "A premium industrial intelligence platform for high-efficiency Spray/Rotary Dryers. Powered by next-gen intelligent thermal engineering, featuring real-time energy efficiency dashboards and interactive industrial chatbot UI.",
        tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Recharts"],
        image: "/images/project_akshar.png",
        live: "https://aksharenterprise.vercel.app/",
        impact: "Revolutionized industrial analytics by bringing enterprise-grade intelligence to legacy manufacturing processes.",
        outcome: "Delivered a cutting-edge command center that monitors energy efficiency in real-time."
      }
    ]
  },
  {
    chapterTitle: "Future Vision",
    narrative: "The next evolution — creating scalable platforms that improve how communities operate and interact.",
    projects: [
      {
        title: "Shyamved Residency Portal",
        desc: "A premium society management SaaS platform featuring a luxury glassmorphism interface. Designed to modernize residential operations with secure access controls, intelligent billing, and resident hubs.",
        tech: ["Next.js 14", "Supabase", "TypeScript", "TailwindCSS", "PostgreSQL"],
        image: "/images/Shyamved.jpeg",
        impact: "Elevating community management by blending enterprise-level security with an ultra-premium aesthetic.",
        outcome: "Currently in active development. Building the foundation for future scalable communities."
      }
    ]
  }
];

export default function Projects() {
  return (
    <section
      id="projects"
      aria-label="Web development projects by MaulikVP — business websites, portfolio websites, startup websites, full stack applications built with Next.js and React"
      className="relative w-full min-h-screen py-24 md:py-32 bg-[#050505] overflow-hidden flex flex-col items-center"
    >
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/10 blur-[120px] rounded-[100%] pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-cyan-500/80 font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-4">
            The Interactive Archive
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-white tracking-tight mb-6">
            The Builder's <span className="italic font-light text-white/70">Journey</span>
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-cyan-500/50 to-transparent mx-auto"></div>
        </motion.div>

        {/* The Digital Book Area */}
        <div className="relative w-full max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-center min-h-[600px] gap-10 md:gap-0 mt-8 md:mt-0">
          
          {/* Preface (Top on Mobile, Left Side on Desktop) */}
          <motion.div 
            className="md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[45%] md:pr-10 z-0 flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "40px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-[1px] bg-cyan-500/80 mb-6 hidden md:block"
            />
            
            <h3 className="text-white/90 font-serif text-xl md:text-2xl lg:text-3xl mb-4 leading-tight italic">
              "Engineering is the closest thing to magic that exists in the world."
            </h3>
            
            <p className="text-[#777] font-mono text-[9px] lg:text-[10px] tracking-[0.2em] uppercase leading-relaxed max-w-[80%] md:max-w-full">
              An interactive archive of digital products, artificial intelligence systems, and luxury web experiences designed to redefine the standard.
            </p>
            
            <div className="mt-8 md:mt-12 flex items-center justify-center md:justify-start gap-4">
              <div className="relative flex items-center justify-center w-6 h-6">
                <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.8)]"></div>
              </div>
              <span className="text-[8px] font-mono tracking-[0.3em] text-cyan-500 uppercase opacity-70">
                Awaiting Interaction
              </span>
            </div>
          </motion.div>

          {/* The Book Itself */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full flex justify-center"
          >
            <DigitalBook chapters={chapters} />
          </motion.div>

          {/* Epilogue (Bottom on Mobile, Right Side on Desktop) */}
          <motion.div 
            className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[45%] md:pl-10 z-0 flex flex-col items-center md:items-end text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "40px" }}
              transition={{ duration: 1, delay: 1.4 }}
              className="h-[1px] bg-cyan-500/80 mb-6 hidden md:block"
            />
            
            <h3 className="text-white/90 font-serif text-xl md:text-2xl lg:text-3xl mb-4 leading-tight italic">
              "The journey doesn't end here. It scales."
            </h3>
            
            <p className="text-[#777] font-mono text-[9px] lg:text-[10px] tracking-[0.2em] uppercase leading-relaxed max-w-[80%] md:max-w-full">
              Let's build the next generation of digital infrastructure together. Ready to turn complex problems into elegant solutions.
            </p>
            
            <div className="mt-8 md:mt-12 flex items-center justify-center md:justify-end gap-4">
              <span className="text-[8px] font-mono tracking-[0.3em] text-cyan-500 uppercase opacity-70">
                End of Archive
              </span>
              <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full"></div>
            </div>
          </motion.div>

        </div>

        <div className="mt-12 text-center">
          <p className="text-white/30 font-mono text-[10px] tracking-widest uppercase">
            Interact to open • Drag edges to turn pages
          </p>
        </div>

      </div>
    </section>
  );
}
