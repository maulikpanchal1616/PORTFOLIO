"use client";

import { useState, useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Clock,
  CalendarDays,
  Sparkles,
  Rocket,
  TrendingUp,
  Diamond,
  CheckCircle2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeatureGroup {
  label: string;
  items: string[];
}

interface PricingTier {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: number;
  originalPrice?: number;
  discountPct?: number;
  tagline: string;
  audience: string[];
  everythingIn?: string;
  featureGroups: FeatureGroup[];
  bonus: string;
  support: string;
  delivery: string;
  popular?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS: PricingTier[] = [
  {
    id: "launch",
    name: "Launch Plan",
    icon: <Rocket className="w-5 h-5" strokeWidth={1.75} />,
    price: 2999,
    tagline: "Everything you need to establish a powerful online presence.",
    audience: ["Students", "Freelancers", "Creators", "Personal Brands"],
    featureGroups: [
      {
        label: "Requirement Discussion",
        items: [
          "1-on-1 discovery call to map your goals",
          "Competitive analysis of your niche",
          "Project scope & timeline document",
        ],
      },
      {
        label: "Industry Research",
        items: [
          "Niche-specific design benchmarking",
          "Audience persona mapping",
          "Content structure strategy",
        ],
      },
      {
        label: "Professional Website Design",
        items: [
          "Custom UI/UX tailored to your brand",
          "Mobile-first responsive layout",
          "Dark/light mode support",
        ],
      },
      {
        label: "Website Development",
        items: [
          "Next.js / React development",
          "Clean, maintainable codebase",
          "Performance-optimized build",
        ],
      },
      {
        label: "SEO Setup",
        items: [
          "Meta tags, OG tags & structured data",
          "Sitemap & robots.txt generation",
          "Core Web Vitals optimization",
        ],
      },
      {
        label: "Testing",
        items: [
          "Cross-browser compatibility check",
          "Mobile & tablet device testing",
          "Form & interaction QA pass",
        ],
      },
      {
        label: "Deployment",
        items: [
          "Vercel / Netlify production deploy",
          "Custom domain configuration",
          "SSL certificate setup",
        ],
      },
    ],
    bonus: "Premium Hero Section",
    support: "7 Days",
    delivery: "3–5 Days",
  },
  {
    id: "growth",
    name: "Growth Plan",
    icon: <TrendingUp className="w-5 h-5" strokeWidth={1.75} />,
    price: 5499,
    originalPrice: 8999,
    discountPct: 39,
    tagline: "Built to convert visitors into customers and scale with your brand.",
    audience: ["Small Businesses", "Local Businesses", "Startups", "Growing Brands"],
    everythingIn: "Launch",
    featureGroups: [
      {
        label: "Advanced UI/UX Design",
        items: [
          "Premium animated component library",
          "Brand identity integration",
          "Micro-interaction design",
        ],
      },
      {
        label: "Multi-Page Architecture",
        items: [
          "Up to 6 custom pages",
          "Internal linking & navigation strategy",
          "Dynamic routing setup",
        ],
      },
      {
        label: "Lead Generation Features",
        items: [
          "Contact forms with email routing",
          "Call-to-action conversion design",
          "Booking / inquiry flow setup",
        ],
      },
      {
        label: "E-commerce Ready",
        items: [
          "Product showcase layout",
          "Payment gateway integration (optional)",
          "Inventory-friendly structure",
        ],
      },
      {
        label: "Advanced SEO",
        items: [
          "Schema markup for local business",
          "Keyword-targeted page structure",
          "Blog/article section setup",
        ],
      },
      {
        label: "Analytics Integration",
        items: [
          "Google Analytics 4 setup",
          "Google Search Console configuration",
          "Event tracking for CTAs",
        ],
      },
      {
        label: "Post-Launch Support",
        items: [
          "Bug fixes & content updates",
          "Performance monitoring",
          "Priority email support",
        ],
      },
    ],
    bonus: "Google Analytics + Search Console Setup",
    support: "14 Days",
    delivery: "5–8 Days",
    popular: true,
  },
  {
    id: "signature",
    name: "Signature Plan",
    icon: <Diamond className="w-5 h-5" strokeWidth={1.75} />,
    price: 8999,
    originalPrice: 14999,
    discountPct: 40,
    tagline: "A cinematic, AI-powered digital experience built to dominate your market.",
    audience: ["Premium Businesses", "Entrepreneurs", "Advanced Startups", "Brands"],
    everythingIn: "Growth",
    featureGroups: [
      {
        label: "Cinematic Design System",
        items: [
          "Custom design language & token system",
          "3D / WebGL visual elements",
          "Signature animation sequences",
        ],
      },
      {
        label: "Full Stack Development",
        items: [
          "Database & API integration",
          "Authentication & user management",
          "Server-side rendering & caching",
        ],
      },
      {
        label: "AI-Powered Features",
        items: [
          "1 premium AI-integrated business feature",
          "Intelligent content personalization",
          "AI chatbot or recommendation engine",
        ],
      },
      {
        label: "Performance Engineering",
        items: [
          "Lighthouse score 95+ target",
          "Image optimization pipeline",
          "Edge CDN deployment strategy",
        ],
      },
      {
        label: "Advanced Analytics",
        items: [
          "Custom event funnel tracking",
          "Heatmap & session recording setup",
          "Conversion rate optimization audit",
        ],
      },
      {
        label: "Security & Compliance",
        items: [
          "Security headers & CSP configuration",
          "GDPR-compliant cookie handling",
          "Vulnerability scan & hardening",
        ],
      },
      {
        label: "Dedicated Support",
        items: [
          "30-day hands-on post-launch support",
          "Video walkthrough of the codebase",
          "Knowledge-transfer session",
        ],
      },
    ],
    bonus: "1 Premium AI Powered Business Feature",
    support: "30 Days",
    delivery: "7–12 Days",
  },
];

// ─── Shared easing (matches Hero / About component patterns) ──────────────────
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// ─── Feature Accordion ─────────────────────────────────────────────────────────

function FeatureAccordion({
  group,
  index,
  isOpen,
  onToggle,
  accentCyan,
}: {
  group: FeatureGroup;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  accentCyan?: boolean;
}) {
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        aria-expanded={isOpen}
        aria-controls={`feature-group-${index}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 gap-3 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-cyan)] rounded-sm"
        style={{ minHeight: "44px" }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <CheckCircle2
            className={`w-[15px] h-[15px] shrink-0 transition-colors duration-300 ${
              accentCyan
                ? "text-[var(--color-cyan)]"
                : "text-[var(--color-cyan)]/60"
            }`}
            strokeWidth={2}
          />
          <span
            className={`text-sm font-medium tracking-wide transition-colors duration-200 truncate ${
              isOpen ? "text-white" : "text-white/70 group-hover:text-white/90"
            }`}
          >
            {group.label}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 text-white/40 ${
            isOpen ? "rotate-180 text-[var(--color-cyan)]" : ""
          }`}
          strokeWidth={1.75}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`feature-group-${index}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <ul className="pb-3 flex flex-col gap-1.5 pl-[26px]">
              {group.items.map((item, i) => (
                <li
                  key={i}
                  className="text-xs text-white/50 leading-relaxed before:content-['—'] before:mr-2 before:text-white/20"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Pricing Card ──────────────────────────────────────────────────────────────

function PricingCard({ plan, cardIndex }: { plan: PricingTier; cardIndex: number }) {
  // Each group tracks open/closed independently
  const [openGroups, dispatch] = useReducer(
    (state: boolean[], action: number) =>
      state.map((v, i) => (i === action ? !v : v)),
    // On desktop, first group is open; mobile all closed
    plan.featureGroups.map((_, i) => i === 0)
  );

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "/#contact");
    }
  };

  const planParam = encodeURIComponent(plan.name);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: cardIndex * 0.1,
        ease: EASE_OUT_EXPO,
      }}
      /* Hover lift — CSS media hover so it never fires on touch */
      className={`relative flex flex-col rounded-2xl overflow-hidden group
        transition-all duration-350
        ${plan.popular ? "pricing-card--popular" : ""}
      `}
      aria-label={`${plan.name} — ₹${plan.price.toLocaleString("en-IN")} — ${plan.tagline}`}
    >
      {/* Card shell — glass treatment identical to Services cards */}
      <div
        className={`flex flex-col flex-1 p-7 md:p-8 glass rounded-2xl border transition-all duration-500
          ${
            plan.popular
              ? "border-[var(--color-cyan)]/40 shadow-[0_0_40px_rgba(0,229,255,0.12),inset_0_0_40px_rgba(0,229,255,0.03)]"
              : "border-white/10 hover:border-[var(--color-cyan)]/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.08)]"
          }
        `}
      >
        {/* Hover gradient overlay — mirrors Services card treatment */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-cyan)]/5 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
            ${plan.popular ? "opacity-100" : ""}
          `}
        />

        {/* Popular ambient glow ring — animates only opacity/filter, never layout props */}
        {plan.popular && (
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,229,255,0.12) 0%, rgba(168,85,247,0.08) 100%)",
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="relative z-10">
          {/* Popular pill */}
          {plan.popular && (
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-black font-mono"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-cyan), var(--color-neon-purple))",
              }}
            >
              <Sparkles className="w-3 h-3" strokeWidth={2} />
              Most Popular
            </div>
          )}

          {/* Icon + Plan name */}
          <div className="flex items-center gap-3 mb-1">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                ${
                  plan.popular
                    ? "bg-gradient-to-br from-[var(--color-cyan)]/20 to-[var(--color-neon-purple)]/20 border border-[var(--color-cyan)]/30"
                    : "glass border border-white/10 group-hover:border-[var(--color-cyan)]/30 transition-colors duration-500"
                }
              `}
            >
              <span
                className={
                  plan.popular ? "text-[var(--color-cyan)]" : "text-white/60"
                }
              >
                {plan.icon}
              </span>
            </div>
            <h3 className="text-lg font-heading font-bold text-white tracking-tight">
              {plan.name}
            </h3>
          </div>

          <p className="text-white/45 text-xs leading-relaxed mt-2 mb-5">
            {plan.tagline}
          </p>

          {/* Price block */}
          <div className="mb-5">
            <div className="flex items-end gap-2 flex-wrap">
              <span
                className={`font-heading font-black text-4xl md:text-5xl tracking-tighter leading-none
                  ${
                    plan.popular
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-neon-purple)]"
                      : "text-white"
                  }
                `}
                aria-label={`₹${plan.price.toLocaleString("en-IN")} Indian Rupees`}
              >
                ₹{plan.price.toLocaleString("en-IN")}
              </span>

              {plan.discountPct && (
                <span className="mb-1 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide bg-[var(--color-neon-purple)]/20 text-[var(--color-neon-purple)] border border-[var(--color-neon-purple)]/30">
                  {plan.discountPct}% OFF
                </span>
              )}
            </div>

            {plan.originalPrice && (
              <p className="text-white/30 text-sm mt-0.5">
                <span className="line-through">
                  ₹{plan.originalPrice.toLocaleString("en-IN")}
                </span>
                {" "}original
              </p>
            )}
          </div>

          {/* Audience pills */}
          <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Ideal for">
            {plan.audience.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide glass border border-white/[0.07] text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* "Everything in X +" */}
          {plan.everythingIn && (
            <p className="text-xs text-[var(--color-cyan)]/80 font-mono tracking-wide mb-4 font-semibold">
              Everything in {plan.everythingIn} +
            </p>
          )}

          {/* Divider */}
          <div
            className={`h-px mb-4 ${
              plan.popular
                ? "bg-gradient-to-r from-[var(--color-cyan)]/30 via-[var(--color-neon-purple)]/20 to-transparent"
                : "bg-white/[0.06]"
            }`}
          />
        </header>

        {/* ── Feature groups accordion ────────────────────────────────────── */}
        <div className="relative z-10 flex-1 mb-6">
          {plan.featureGroups.map((group, i) => (
            <FeatureAccordion
              key={i}
              group={group}
              index={i}
              isOpen={openGroups[i]}
              onToggle={() => dispatch(i)}
              accentCyan={plan.popular}
            />
          ))}
        </div>

        {/* ── Bonus highlight strip ───────────────────────────────────────── */}
        <div
          className={`relative z-10 mb-5 px-4 py-3 rounded-xl flex items-start gap-3
            ${
              plan.popular
                ? "bg-[var(--color-cyan)]/[0.07] border border-[var(--color-cyan)]/20"
                : "bg-white/[0.04] border border-white/[0.07]"
            }
          `}
        >
          <Sparkles
            className={`w-4 h-4 mt-0.5 shrink-0 ${
              plan.popular ? "text-[var(--color-cyan)]" : "text-white/40"
            }`}
            strokeWidth={1.75}
          />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-0.5">
              Free Bonus
            </p>
            <p className="text-xs text-white/80 leading-snug font-medium">
              {plan.bonus}
            </p>
          </div>
        </div>

        {/* ── Stat chips ──────────────────────────────────────────────────── */}
        <div className="relative z-10 grid grid-cols-2 gap-2.5 mb-6">
          <div className="glass border border-white/[0.07] rounded-xl px-3 py-2.5 flex items-center gap-2">
            <Clock
              className="w-3.5 h-3.5 text-white/30 shrink-0"
              strokeWidth={1.75}
            />
            <div>
              <p className="text-[9px] text-white/30 uppercase tracking-widest font-mono leading-none mb-0.5">
                Support
              </p>
              <p className="text-xs text-white/80 font-semibold leading-none">
                {plan.support}
              </p>
            </div>
          </div>
          <div className="glass border border-white/[0.07] rounded-xl px-3 py-2.5 flex items-center gap-2">
            <CalendarDays
              className="w-3.5 h-3.5 text-white/30 shrink-0"
              strokeWidth={1.75}
            />
            <div>
              <p className="text-[9px] text-white/30 uppercase tracking-widest font-mono leading-none mb-0.5">
                Delivery
              </p>
              <p className="text-xs text-white/80 font-semibold leading-none">
                {plan.delivery}
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <a
          href={`/#contact?plan=${planParam}`}
          onClick={handleScrollToContact}
          aria-label={`Start the ${plan.name}`}
          className={`relative z-10 w-full py-4 rounded-xl font-bold text-sm tracking-wide text-center
            flex items-center justify-center gap-2 overflow-hidden
            transition-all duration-350 group/btn
            ${
              plan.popular
                ? "bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-neon-purple)] text-black hover:shadow-[0_0_30px_rgba(0,229,255,0.35)]"
                : "glass border border-white/15 text-white hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]"
            }
          `}
          style={{ minHeight: "44px" }}
        >
          {plan.popular ? (
            <>
              <span>Start the {plan.name}</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                aria-hidden
              >
                →
              </motion.span>
            </>
          ) : (
            <>
              <span>Get Started</span>
              <span
                className="opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -ml-2 group-hover/btn:ml-0"
                aria-hidden
              >
                →
              </span>
            </>
          )}
        </a>
      </div>
    </motion.article>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function PricingPlans() {
  return (
    <div
      aria-label="Pricing plans for web development services by MaulikVP"
      className="relative w-full pt-8 pb-20 md:pb-32 bg-transparent overflow-hidden"
    >
      {/* Visual separator between services grid and pricing */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>
      {/* Ambient background glow — mirrors Contact section treatment */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-[var(--color-electric-blue)]/5 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-neon-purple)]/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* ── Section heading — same pattern as Services heading ───────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mb-16 text-center"
        >
          <p className="text-[var(--color-cyan)] font-mono tracking-widest text-xs md:text-sm uppercase mb-4">
            Engagement Plans
          </p>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-neon-purple)] filter drop-shadow-[0_0_25px_rgba(0,229,255,0.5)]">
              Plan
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Transparent, all-inclusive pricing — no hidden fees, no retainers.
            Every plan ships production-ready code you own.
          </p>
        </motion.div>

        {/* ── Card grid ────────────────────────────────────────────────────── */}
        {/*
          Mobile: Growth (popular) first, then Launch, then Signature.
          Desktop: natural order left-to-right. CSS order property handles this.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Launch */}
          <div className="md:order-1 order-2">
            <PricingCard plan={PLANS[0]} cardIndex={0} />
          </div>

          {/* Growth — Most Popular — elevated on desktop via margin trick ONLY on md+ */}
          <div className="md:order-2 order-1 md:-mt-5">
            <PricingCard plan={PLANS[1]} cardIndex={1} />
          </div>

          {/* Signature */}
          <div className="md:order-3 order-3">
            <PricingCard plan={PLANS[2]} cardIndex={2} />
          </div>
        </div>

        {/* ── Fine print ───────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="mt-12 text-center text-white/25 text-xs font-mono tracking-wide"
        >
          All prices in Indian Rupees (INR) · Delivery timelines start after
          full requirement sign-off · Plans are one-time project fees, not
          subscriptions
        </motion.p>
      </div>

      {/* Reduced-motion override — collapses all transitions for OS preference */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .pricing-card--popular [data-framer-animate],
          .pricing-card--popular [style*="animation"] {
            animation: none !important;
            transition: opacity 0.15s !important;
          }
        }
      `}</style>
    </div>
  );
}
