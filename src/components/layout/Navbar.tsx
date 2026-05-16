"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const links = [
  { name: "Home", href: "hero" },
  { name: "About", href: "about" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Services", href: "services" },
  { name: "Experience", href: "experience" },
  { name: "Contact", href: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const ratioMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let maxId = "";
        
        ratioMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        });

        if (maxRatio > 0.1 && maxId) {
          setActiveSection(maxId);
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Cleanly update the URL without causing Next.js hash duplication bugs
    const newUrl = targetId === "hero" ? "/" : `/#${targetId}`;
    window.history.pushState(null, "", newUrl);

    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1 
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
      >
        <nav 
          className={`pointer-events-auto transition-all duration-500 rounded-full px-6 py-3 flex items-center gap-8 relative z-50 border border-white/10 ${
            scrolled 
              ? "bg-black/60 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] py-2.5 scale-[0.98]" 
              : "bg-white/5 backdrop-blur-md"
          }`}
        >
          <a href="/#hero" onClick={(e) => handleScrollTo(e, "hero")} className="text-white font-bold text-xl tracking-tighter magnetic outline-none focus-visible:text-[var(--color-cyan)]">
            MP<span className="text-[var(--color-electric-blue)]">.</span>
          </a>
          <ul className="hidden md:flex items-center gap-6">
            {links.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.name}>
                  <a
                    href={`/#${link.href}`}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`text-sm font-medium transition-colors relative group magnetic outline-none focus-visible:text-[var(--color-cyan)] ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[var(--color-electric-blue)] glow-blue"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white/80 hover:text-white magnetic text-sm font-medium outline-none">Menu</button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center pointer-events-auto"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="absolute top-8 right-8 text-white/60 hover:text-white p-2 outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <ul className="flex flex-col items-center gap-8">
              {links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <li key={link.name}>
                    <a
                      href={`/#${link.href}`}
                      onClick={(e) => {
                        handleScrollTo(e, link.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-3xl font-heading font-bold transition-colors ${isActive ? 'text-[var(--color-cyan)]' : 'text-white hover:text-white/80'}`}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
