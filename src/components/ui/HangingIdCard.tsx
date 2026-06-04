"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { cn } from "@/components/lib/utils";
import Image from "next/image";

// ─── Physics constants ────────────────────────────────────────────────────────
const SPRING_K = 0;          // No spring! A real pendulum relies only on gravity
const DAMPING  = 0.9;        // Light air resistance so it swings naturally
const GRAVITY  = 3000;       // Gravity scalar for satisfying snappy momentum
const MASS     = 1;

interface CardPhysicsState {
  angle:  number;   // radians from vertical
  vel:    number;   // angular velocity  rad/s
}

export interface HangingIdCardProps {
  children?: React.ReactNode;
  ropeLength?: number;
  ropeColor?: string;
  className?: string;
  name?: string;
  role?: string;
  badgeId?: string;
  accentColor?: string;
  profileImage?: string;
}

// ─── SVG Thick Lanyard / Ribbon ──────────────────────────────────────────────────────
const Lanyard = ({ length, color }: { length: number; color: string }) => {
  return (
    <svg 
      width="30" 
      height={length} 
      viewBox={`0 0 30 ${length}`} 
      style={{ display: "block", margin: "0 auto", overflow: "visible" }}
    >
      {/* Anchor ring */}
      <circle cx="15" cy="0" r="5" fill={color} />
      
      {/* Left thick ribbon */}
      <path d={`M 13 0 L 10 ${length}`} stroke={color} strokeWidth="6" opacity="0.9" />
      
      {/* Right thick ribbon */}
      <path d={`M 17 0 L 20 ${length}`} stroke={color} strokeWidth="6" opacity="0.9" />
      
      {/* Metal clip part connecting to card */}
      <rect x="10" y={length - 6} width="10" height="8" rx="2" fill="#94a3b8" />
      <circle cx="15" cy={length + 2} r="3" fill="#e2e8f0" />
    </svg>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const HangingIdCard = ({
  children,
  ropeLength   = 130, // Increased height for a more prominent drop
  ropeColor    = "#3b82f6", // Electric blue / Cyan matching rope
  className,
  name         = "Maulik Panchal",
  role         = "Full Stack Developer",
  badgeId      = "MP-2026",
  accentColor  = "#00e5ff", // Cyan
  profileImage = "/images/Maulik Photo.jpeg",
}: HangingIdCardProps) => {
  const physRef      = useRef<CardPhysicsState>({ angle: 0, vel: 0 });
  const rafRef       = useRef<number | null>(null);
  const prevTimeRef  = useRef<number | null>(null);
  const prevAngleRef = useRef<number>(0);
  const isDraggingRef= useRef(false);

  const [angle, setAngle] = useState(0);
  const [isDragState, setIsDragState] = useState(false);
  const dragStartX   = useRef(0);
  const dragAngle0   = useRef(0);

  // ── Physics loop ────────────────────────────────────────────────────────────
  const tick = useCallback((now: number) => {
    if (prevTimeRef.current === null) { prevTimeRef.current = now; }
    const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05); // cap at 50ms
    prevTimeRef.current = now;

    const s = physRef.current;
    if (!isDraggingRef.current) {
      // Realistic pendulum: L is approximate center of mass
      const L = ropeLength + 100; 
      const torque =
        -(GRAVITY / L)    * Math.sin(s.angle) -
        (DAMPING  / MASS) * s.vel             -
        (SPRING_K / MASS) * s.angle;

      s.vel   += torque * dt;
      s.angle += s.vel  * dt;

      setAngle(s.angle);

      if (Math.abs(s.angle) > 0.001 || Math.abs(s.vel) > 0.001) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // settled perfectly at bottom
        s.angle = 0; s.vel = 0;
        setAngle(0);
      }
    } else {
      // Track velocity while dragging so we can "flick" it
      if (dt > 0) {
        s.vel = (s.angle - prevAngleRef.current) / dt;
      }
      prevAngleRef.current = s.angle;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [ropeLength]);

  const startPhysics = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // ── Pointer events ──────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    setIsDragState(true);
    dragStartX.current   = e.clientX;
    dragAngle0.current   = physRef.current.angle;
    prevAngleRef.current = physRef.current.angle;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    const L = ropeLength + 100; 
    // angle = asin(dx / L) but clamped
    const newAngle = dragAngle0.current + dx / L;
    const clamped  = Math.max(-1.4, Math.min(1.4, newAngle));
    physRef.current.angle = clamped;
    setAngle(clamped);
  }, [ropeLength]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDraggingRef.current = false;
    setIsDragState(false);
  }, []);

  // ── Click impulse (tap) ─────────────────────────────────────────────────────
  const onCardClick = useCallback(() => {
    if (Math.abs(physRef.current.vel) < 0.1 && Math.abs(physRef.current.angle) < 0.05) {
      physRef.current.vel = 4.0; // Give it a satisfying push
      startPhysics();
    }
  }, [startPhysics]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const cardRotateDeg = angle * (180 / Math.PI);

  return (
    <div
      className={cn("flex flex-col items-center select-none", className)}
      style={{ touchAction: "none" }}
    >
      {/* Ceiling anchor */}
      <div
        className="w-3 h-3 rounded-full shadow-md z-10 relative"
        style={{ background: accentColor }}
      />

      {/* The Pendulum Assembly (Rope + Card) */}
      <div 
        className="flex flex-col items-center cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onCardClick}
        style={{
          transform: `rotate(${cardRotateDeg}deg)`,
          transformOrigin: "top center",
          willChange: "transform",
          marginTop: "-6px" // slight overlap with anchor
        }}
      >
        {/* Lanyard */}
        <div style={{ pointerEvents: "none" }}>
          <Lanyard length={ropeLength} color={ropeColor} />
        </div>

        {/* ID Card */}
        <div className="relative w-52 rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 bg-zinc-900 pointer-events-none mt-[-2px]">
          {children ?? (
            <div className="flex flex-col h-full">
              {/* Card header banner */}
              <div
                className="px-4 py-3 flex flex-col items-center gap-1"
                style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #a855f7 100%)` }}
              >
                <p className="text-[9px] font-bold tracking-[0.25em] text-white/90 uppercase">
                  DEVELOPER PASS
                </p>
                <div className="flex h-20 w-16 relative items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm mt-1 shadow-inner overflow-hidden border border-white/10">
                  <Image
                    src={profileImage}
                    alt="Maulik Panchal Profile, Full Stack Developer"
                    fill
                    sizes="64px"
                    className="object-cover object-[center_20%] mix-blend-normal filter brightness-100"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Card body */}
              <div className="bg-zinc-950 px-4 py-4 flex flex-col items-center gap-2 flex-1">
                <p className="text-sm font-bold text-white text-center leading-tight">
                  {name}
                </p>
                <p className="text-[11px] text-zinc-400 font-medium">
                  {role}
                </p>

                <div className="my-2 w-full border-t border-zinc-800" />

                {/* Barcode mock */}
                <div className="flex gap-[2px] items-end h-7 px-1">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-zinc-200 rounded-[1px]"
                      style={{
                        width: i % 3 === 0 ? "3px" : "1.5px",
                        height: `${(50 + Math.sin(i * 1.3) * 35).toFixed(2)}%`,
                      }}
                    />
                  ))}
                </div>

                <p
                  className="text-[10px] font-mono font-bold mt-1 tracking-widest"
                  style={{ color: accentColor }}
                >
                  {badgeId}
                </p>

                {/* Status badge */}
                <div
                  className="mt-1 px-3 py-0.5 rounded-full text-[9px] font-bold text-black uppercase tracking-widest font-mono"
                  style={{ background: accentColor }}
                >
                  ACTIVE
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drag hint */}
      <p className="mt-8 text-[11px] text-zinc-500 font-medium select-none pointer-events-none uppercase tracking-widest font-mono animate-pulse">
        Drag or click the badge
      </p>
    </div>
  );
};

export default HangingIdCard;
