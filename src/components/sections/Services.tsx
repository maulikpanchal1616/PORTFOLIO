"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import PricingPlans from "@/components/sections/PricingPlans";
import {
  Building2, BriefcaseBusiness, Rocket, Target,
  Layers3, Wand2, SearchCheck, RefreshCcw,
  Zap, Code2, Gauge, UserCheck,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <Building2 strokeWidth={1.5} className="w-6 h-6" />,
    name: "Business Website Development",
    beat: "Your brand, amplified to the world.",
    description: "Professional, conversion-focused websites for local businesses and SMEs — engineered to attract, convert, and retain.",
  },
  {
    icon: <UserCheck strokeWidth={1.5} className="w-6 h-6" />,
    name: "Portfolio Website Development",
    beat: "Turn talent into an undeniable presence.",
    description: "Immersive, cinematic portfolios that make creatives, freelancers, and professionals impossible to forget.",
  },
  {
    icon: <Rocket strokeWidth={1.5} className="w-6 h-6" />,
    name: "Startup Website Development",
    beat: "Where bold ideas meet their first stage.",
    description: "Fast, investor-ready digital presence for startups — built to scale from MVP to market leader.",
  },
  {
    icon: <Target strokeWidth={1.5} className="w-6 h-6" />,
    name: "Landing Page Development",
    beat: "One page. One message. Maximum impact.",
    description: "High-converting landing pages meticulously crafted to drive leads, signups, and measurable growth.",
  },
  {
    icon: <Layers3 strokeWidth={1.5} className="w-6 h-6" />,
    name: "Full Stack Web Development",
    beat: "From idea to infrastructure, end to end.",
    description: "End-to-end application development — Next.js, React, and battle-tested backend technologies.",
  },
  {
    icon: <Wand2 strokeWidth={1.5} className="w-6 h-6" />,
    name: "Custom Website Development",
    beat: "Engineered around your vision, nothing less.",
    description: "Fully bespoke digital experiences built precisely around your vision, goals, and brand personality.",
  },
  {
    icon: <SearchCheck strokeWidth={1.5} className="w-6 h-6" />,
    name: "SEO Friendly Website Development",
    beat: "Built to be found. Designed to be chosen.",
    description: "Sites architected for Google from day one — structured data, Core Web Vitals, and semantic markup.",
  },
  {
    icon: <RefreshCcw strokeWidth={1.5} className="w-6 h-6" />,
    name: "Website Redesign Services",
    beat: "Breathe new life into what you've built.",
    description: "Modernise your existing site with a high-performance redesign that preserves SEO equity while elevating aesthetics.",
  },
  {
    icon: <Zap strokeWidth={1.5} className="w-6 h-6" />,
    name: "Next.js Development",
    beat: "Speed that users feel. Power they don't see.",
    description: "Blazing-fast, SEO-optimised web apps with server components, edge rendering, and streaming built in.",
  },
  {
    icon: <Code2 strokeWidth={1.5} className="w-6 h-6" />,
    name: "React Development",
    beat: "Interfaces that respond like they're thinking.",
    description: "Dynamic, interactive interfaces that feel alive — built with clean React architecture and smooth state management.",
  },
  {
    icon: <Gauge strokeWidth={1.5} className="w-6 h-6" />,
    name: "Performance Optimization",
    beat: "Milliseconds matter. Every single one.",
    description: "Lighthouse 95+ scores, sub-second load times, and perfect Core Web Vitals — because speed is a feature.",
  },
  {
    icon: <BriefcaseBusiness strokeWidth={1.5} className="w-6 h-6" />,
    name: "Personal Branding Website",
    beat: "Make the world know exactly who you are.",
    description: "Premium personal brand presence that communicates authority, expertise, and vision at first glance.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Neural Canvas ────────────────────────────────────────────────────────────
// Single canvas over the whole grid: particles + constellation + cursor aurora + scan line.
// All drawing via Canvas 2D API in a single rAF loop — zero React state updates.

function NeuralCanvas({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let scanY = 0;
    let lastTs = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    interface P { x: number; y: number; vx: number; vy: number; s: number; a: number; r: number; g: number; b: number; }
    let pts: P[] = [];

    const palette = [
      { r: 0, g: 229, b: 255 }, { r: 0, g: 229, b: 255 },
      { r: 168, g: 85, b: 247 }, { r: 200, g: 200, b: 255 },
    ];

    const init = () => {
      W = section.clientWidth;
      H = section.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(DPR, DPR);

      const n = Math.min(60, Math.max(28, Math.floor((W * H) / 11000)));
      pts = Array.from({ length: n }, () => {
        const c = palette[Math.floor(Math.random() * palette.length)];
        return {
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
          s: 0.8 + Math.random() * 1.3, a: 0.15 + Math.random() * 0.45,
          r: c.r, g: c.g, b: c.b,
        };
      });
    };

    const ro = new ResizeObserver(() => { ctx.resetTransform(); init(); });
    ro.observe(section);
    init();

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave, { passive: true });

    const draw = (ts: number) => {
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      scanY = (scanY + 55 * dt) % (H + 120);

      ctx.clearRect(0, 0, W, H);

      // ── Cursor aurora ───────────────────────────────────────────────────
      if (mouse.x > -999) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
        g.addColorStop(0, "rgba(0,229,255,0.045)");
        g.addColorStop(0.5, "rgba(168,85,247,0.025)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Scan line (CRT / radar sweep) ──────────────────────────────────
      const sg = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
      sg.addColorStop(0, "transparent");
      sg.addColorStop(0.45, "rgba(0,229,255,0.0)");
      sg.addColorStop(0.5, "rgba(0,229,255,0.06)");
      sg.addColorStop(0.55, "rgba(0,229,255,0.0)");
      sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 80, W, 160);

      // ── Particles + constellation ───────────────────────────────────────
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Mouse repulsion
        const mx = p.x - mouse.x, my = p.y - mouse.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 160 && md > 0) {
          const f = ((160 - md) / 160) * 0.18;
          p.vx += (mx / md) * f;
          p.vy += (my / md) * f;
        }

        p.vx *= 0.97; p.vy *= 0.97;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.x = Math.max(0, Math.min(W, p.x));
        p.y = Math.max(0, Math.min(H, p.y));

        // Particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a})`;
        ctx.fill();

        // Constellation lines
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 110) continue;

          const midX = (p.x + q.x) * 0.5, midY = (p.y + q.y) * 0.5;
          const cmx = midX - mouse.x, cmy = midY - mouse.y;
          const cd = Math.sqrt(cmx * cmx + cmy * cmy);
          const boost = cd < 220 ? (1 - cd / 220) * 0.35 : 0;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,229,255,${(1 - d / 110) * 0.07 + boost})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
  magnetRef,
}: {
  service: (typeof services)[number];
  index: number;
  magnetRef: (el: HTMLDivElement | null) => void;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const cx = useRef(0), cy = useRef(0);
  const tx = useRef(0), ty = useRef(0);
  const hovered = useRef(false);

  const tick = useCallback(() => {
    cx.current += (tx.current - cx.current) * 0.08;
    cy.current += (ty.current - cy.current) * 0.08;

    const tilt = tiltRef.current;
    const spot = spotRef.current;
    const num = numRef.current;

    if (tilt) {
      tilt.style.transform = hovered.current
        ? `perspective(900px) rotateX(${cy.current * 8}deg) rotateY(${cx.current * -8}deg) translateY(-6px)`
        : `perspective(900px) rotateX(${cy.current * 8}deg) rotateY(${cx.current * -8}deg)`;
    }
    if (spot) {
      const px = ((cx.current + 1) / 2) * 100;
      const py = ((cy.current + 1) / 2) * 100;
      spot.style.background = `radial-gradient(circle 200px at ${px}% ${py}%, rgba(0,229,255,0.13), transparent 70%)`;
      spot.style.opacity = hovered.current ? "1" : "0";
    }
    if (num) {
      num.style.transform = `translate(${cx.current * -14}px, ${cy.current * -14}px)`;
    }

    const settling =
      Math.abs(tx.current - cx.current) > 0.001 ||
      Math.abs(ty.current - cy.current) > 0.001;
    if (settling || hovered.current) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = 0;
    }
  }, []);

  const startRaf = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = tiltRef.current?.getBoundingClientRect();
    if (!rect) return;
    tx.current = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    ty.current = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    startRaf();
  }, [startRaf]);

  const onEnter = useCallback(() => {
    hovered.current = true;
    if (descRef.current) {
      descRef.current.style.maxHeight = "120px";
      descRef.current.style.opacity = "1";
    }
    startRaf();
  }, [startRaf]);

  const onLeave = useCallback(() => {
    hovered.current = false;
    tx.current = 0; ty.current = 0;
    if (descRef.current) {
      descRef.current.style.maxHeight = "0px";
      descRef.current.style.opacity = "0";
    }
    startRaf();
  }, [startRaf]);

  useEffect(() => () => { cancelAnimationFrame(rafRef.current); }, []);

  const n = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={magnetRef}
      initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: EASE }}
      style={{ willChange: "transform, opacity, clip-path" }}
      itemScope
      itemType="https://schema.org/Service"
    >
      <div
        ref={tiltRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="relative group cursor-default h-full"
        style={{ willChange: "transform" }}
      >
        {/* Glass card */}
        <div className="glass rounded-2xl border border-white/10 p-8 overflow-hidden relative h-full flex flex-col">

          {/* Cursor spotlight */}
          <div
            ref={spotRef}
            aria-hidden
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
            style={{ opacity: 0 }}
          />

          {/* Hover border glow */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: "inset 0 0 0 1px rgba(0,229,255,0.4), 0 0 30px rgba(0,229,255,0.06)" }}
          />

          {/* Top accent line */}
          <div aria-hidden className="absolute top-0 left-8 right-8 h-px overflow-hidden pointer-events-none">
            <div className="h-full bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
          </div>

          {/* Parallax watermark number */}
          <div
            ref={numRef}
            aria-hidden
            className="absolute bottom-4 right-5 font-heading font-black select-none pointer-events-none"
            style={{ fontSize: "72px", lineHeight: 1, color: "rgba(255,255,255,0.028)", letterSpacing: "-3px" }}
          >
            {n}
          </div>

          {/* Icon */}
          <div className="relative mb-6 shrink-0">
            <div
              aria-hidden
              className="absolute inset-0 w-14 h-14 rounded-full border border-dashed border-[var(--color-cyan)]/20 group-hover:border-[var(--color-cyan)]/50 group-hover:rotate-[360deg] transition-all duration-[1100ms] ease-linear"
            />
            <div className="relative w-14 h-14 rounded-full flex items-center justify-center border border-[var(--color-cyan)]/25 bg-[var(--color-cyan)]/5 group-hover:bg-[var(--color-cyan)]/12 group-hover:border-[var(--color-cyan)]/55 transition-all duration-500 text-[var(--color-cyan)]">
              <div className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] transition-all duration-400">
                {service.icon}
              </div>
            </div>
          </div>

          {/* Service name */}
          <h3
            className="text-lg font-heading font-bold text-white/90 leading-snug mb-1.5 relative z-10 group-hover:text-white transition-colors duration-300"
            itemProp="name"
          >
            {service.name}
          </h3>

          {/* Cinematic story beat — always visible, muted */}
          <p className="text-[var(--color-cyan)]/50 text-xs font-mono tracking-wide mb-3 italic group-hover:text-[var(--color-cyan)]/80 transition-colors duration-400">
            {service.beat}
          </p>

          {/* Description — height-reveals on hover */}
          <div
            ref={descRef}
            className="overflow-hidden"
            style={{
              maxHeight: "0px",
              opacity: 0,
              transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease 0.06s",
            }}
          >
            <p className="text-white/50 text-sm leading-relaxed" itemProp="description">
              {service.description}
            </p>
          </div>

          {/* Bottom glow */}
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  // One ref per card for magnetic pull
  const magnetRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Section-level magnetic pull — reads one shared mouse position,
  // writes translate to each card's outer wrapper. Single rAF, zero React state.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(hover: none)").matches) return; // skip touch

    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    // Per-card lerp state
    const state = services.map(() => ({ cx: 0, cy: 0, tx: 0, ty: 0 }));

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave, { passive: true });

    const loop = () => {
      const sRect = section.getBoundingClientRect();
      magnetRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = state[i];
        const r = el.getBoundingClientRect();
        const cardCx = r.left - sRect.left + r.width * 0.5;
        const cardCy = r.top - sRect.top + r.height * 0.5;
        const dx = mouse.x - cardCx, dy = mouse.y - cardCy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxR = 260;

        if (dist < maxR && dist > 0) {
          const f = Math.pow(1 - dist / maxR, 2) * 5;
          s.tx = (dx / dist) * f;
          s.ty = (dy / dist) * f;
        } else {
          s.tx = 0; s.ty = 0;
        }

        s.cx += (s.tx - s.cx) * 0.06;
        s.cy += (s.ty - s.cy) * 0.06;

        // Only write if card is not being hovered (tilt takes over on hover)
        const isHovered = el.querySelector(".group:hover");
        if (!isHovered) {
          el.style.transform = `translate(${s.cx.toFixed(2)}px,${s.cy.toFixed(2)}px)`;
        }
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Web development services — MaulikVP, freelance web developer in Ahmedabad, Gujarat, India"
      className="relative w-full py-20 md:py-32 bg-transparent overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom,transparent,black 5%,black 95%,transparent)",
        WebkitMaskImage: "linear-gradient(to bottom,transparent,black 5%,black 95%,transparent)",
      }}
    >
      {/* Neural constellation canvas — behind everything */}
      <NeuralCanvas sectionRef={sectionRef} />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-20 text-center"
        >
          <p className="text-[var(--color-cyan)] font-mono tracking-widest text-xs md:text-sm uppercase mb-4">
            What I Build
          </p>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">
            Specialized{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-neon-purple)] filter drop-shadow-[0_0_25px_rgba(0,229,255,0.5)]">
              Services
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering world-class digital solutions engineered for the future.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <ServiceCard
              key={i}
              service={svc}
              index={i}
              magnetRef={(el) => { magnetRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>

      {/* Pricing sub-section */}
      <PricingPlans />
    </section>
  );
}
