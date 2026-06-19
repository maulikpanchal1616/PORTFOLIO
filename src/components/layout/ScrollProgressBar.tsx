"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Sections the indicator labels as you scroll past them
const SECTIONS = [
  { id: "hero",       label: "Intro" },
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "projects",   label: "Work" },
  { id: "services",   label: "Services" },
  { id: "experience", label: "Journey" },
  { id: "contact",    label: "Contact" },
];

export default function ScrollProgressBar() {
  // Raw scroll progress [0..1]
  const { scrollYProgress } = useScroll();

  // Spring-smooth the raw value for the fill line
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  // Height of the fill bar as a percentage string
  const fillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Dot Y position (top offset %)
  const dotY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Glow opacity — pulses slightly based on scroll speed (via spring overshoot)
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.4, 0.9, 0.4]);

  // Active section label
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Update the active section label imperatively — no React state = no re-render
    const updateLabel = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.5;
      let active = SECTIONS[0].label;

      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) active = s.label;
      }

      if (labelRef.current) labelRef.current.textContent = active;
    };

    window.addEventListener("scroll", updateLabel, { passive: true });
    updateLabel();
    return () => window.removeEventListener("scroll", updateLabel);
  }, []);

  return (
    // Hidden on touch / mobile — no hover interaction there and it wastes screen space
    <div
      aria-hidden
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-0"
      style={{ height: "55vh" }}
    >
      {/* Track rail */}
      <div className="relative flex flex-col items-center w-[2px] flex-1">
        {/* Dim background rail */}
        <div className="absolute inset-0 bg-white/[0.06] rounded-full" />

        {/* Filled progress line — animated height */}
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full origin-top"
          style={{
            height: fillHeight,
            background: "linear-gradient(180deg, var(--color-cyan), var(--color-neon-purple))",
            willChange: "height",
          }}
        />

        {/* Glow blur behind the fill line */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] rounded-full origin-top pointer-events-none"
          style={{
            height: fillHeight,
            background: "linear-gradient(180deg, rgba(0,229,255,0.5), rgba(168,85,247,0.3))",
            filter: "blur(4px)",
            opacity: glowOpacity,
            willChange: "height, opacity",
          }}
        />

        {/* Travelling dot at current scroll position */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: dotY, willChange: "top" }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 -m-2 rounded-full"
            style={{ background: "rgba(0,229,255,0.2)", filter: "blur(6px)" }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Core dot */}
          <div
            className="relative w-[7px] h-[7px] rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "linear-gradient(135deg, var(--color-cyan), var(--color-neon-purple))",
              boxShadow: "0 0 10px rgba(0,229,255,0.7)",
            }}
          />
        </motion.div>
      </div>

      {/* Active section label — sits below the track, updated imperatively */}
      <div className="mt-3 flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-[var(--color-cyan)] opacity-60" />
        <span
          ref={labelRef}
          className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/40"
        >
          Intro
        </span>
      </div>
    </div>
  );
}
