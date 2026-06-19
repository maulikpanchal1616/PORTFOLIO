"use client";

import { motion, useSpring } from "framer-motion";
import { FC, useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/components/lib/utils";

interface Position {
  x: number;
  y: number;
}

export interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: SpringConfig;
  className?: string;
  size?: number;
  color?: string;
  hideOnLeave?: boolean;
  trailLength?: number;
  showTrail?: boolean;
  rotateOnMove?: boolean;
  scaleOnClick?: boolean;
  glowEffect?: boolean;
  magneticDistance?: number;
  magneticElements?: string;
  onCursorMove?: (position: Position) => void;
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
  disabled?: boolean;
}

const DefaultCursorSVG: FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = "#00e5ff",
  className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * 2}
      height={size * 2.16}
      viewBox="0 0 50 54"
      fill="none"
      className={cn("pointer-events-none", className)}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill={color}
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

// ─── Trail dot count ────────────────────────────────────────────────────────
const TRAIL_LEN = 7;

export function SmoothCursor({
  cursor,
  springConfig = {
    damping: 28,       // silky — was 45 (too stiff/snappy)
    stiffness: 180,   // was 400 (caused jitter on fast moves)
    mass: 0.6,
    restDelta: 0.001,
  },
  className,
  size = 18,
  color = "#00e5ff",
  hideOnLeave = true,
  rotateOnMove = true,
  scaleOnClick = true,
  glowEffect = true,
  magneticDistance = 50,
  magneticElements = "a, button, [data-magnetic]",
  onCursorMove,
  onCursorEnter,
  onCursorLeave,
  disabled = false,
}: SmoothCursorProps) {
  const [isVisible, setIsVisible] = useState(true);

  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);

  // Trail: pre-rendered div refs — positions written directly, ZERO React state
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trailPositions = useRef<Position[]>(Array.from({ length: TRAIL_LEN }, () => ({ x: 0, y: 0 })));

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, { ...springConfig, damping: 60, stiffness: 260 });
  const scale = useSpring(1, { ...springConfig, stiffness: 400, damping: 30 });

  const defaultCursor = <DefaultCursorSVG size={size} color={color} />;
  const cursorElement = cursor || defaultCursor;

  useEffect(() => {
    if (disabled) return;

    const updateVelocity = (pos: Position) => {
      const now = Date.now();
      const dt = now - lastUpdateTime.current;
      if (dt > 0) {
        velocity.current = {
          x: (pos.x - lastMousePos.current.x) / dt,
          y: (pos.y - lastMousePos.current.y) / dt,
        };
      }
      lastUpdateTime.current = now;
      lastMousePos.current = pos;
    };

    // Push new pos to front of trail array, write DOM directly
    const pushTrail = (pos: Position) => {
      trailPositions.current.unshift(pos);
      trailPositions.current.length = TRAIL_LEN;
      trailPositions.current.forEach((p, i) => {
        const el = trailRefs.current[i];
        if (!el) return;
        el.style.transform = `translate(calc(${p.x}px - 50%), calc(${p.y}px - 50%))`;
      });
    };

    const findMagnetic = (x: number, y: number) => {
      for (const el of Array.from(document.querySelectorAll(magneticElements))) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const d = Math.hypot(x - cx, y - cy);
        if (d < magneticDistance) return { x: cx, y: cy, distance: d };
      }
      return null;
    };

    let rafId = 0;
    const onMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        let pos = { x: e.clientX, y: e.clientY };
        const mag = findMagnetic(pos.x, pos.y);
        if (mag) {
          const s = 1 - mag.distance / magneticDistance;
          pos = { x: pos.x + (mag.x - pos.x) * s * 0.3, y: pos.y + (mag.y - pos.y) * s * 0.3 };
        }
        updateVelocity(pos);
        pushTrail(pos);
        cursorX.set(pos.x);
        cursorY.set(pos.y);
        onCursorMove?.(pos);

        if (rotateOnMove) {
          const spd = Math.hypot(velocity.current.x, velocity.current.y);
          if (spd > 0.1) {
            const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
            let diff = angle - previousAngle.current;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;
            accumulatedRotation.current += diff;
            rotation.set(accumulatedRotation.current);
            previousAngle.current = angle;
          }
        }
        rafId = 0;
      });
    };

    const onEnter = () => { setIsVisible(true); onCursorEnter?.(); };
    const onLeave = () => { if (hideOnLeave) setIsVisible(false); onCursorLeave?.(); };
    const onDown  = () => { if (scaleOnClick) scale.set(0.78); };
    const onUp    = () => { if (scaleOnClick) scale.set(1); };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    cursorX, cursorY, rotation, scale, disabled,
    rotateOnMove, scaleOnClick, hideOnLeave,
    magneticDistance, magneticElements,
    onCursorMove, onCursorEnter, onCursorLeave
  ]);

  if (disabled) return null;

  return (
    <>
      {/* Trail dots — pre-rendered, positions written via DOM refs */}
      {Array.from({ length: TRAIL_LEN }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          aria-hidden
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${10 - i}px`,
            height: `${10 - i}px`,
            borderRadius: "50%",
            backgroundColor: "#00e5ff",
            opacity: ((TRAIL_LEN - i) / TRAIL_LEN) * 0.22,
            filter: "blur(1px)",
            zIndex: 9998 - i,
            pointerEvents: "none",
            willChange: "transform",
            transform: "translate(-50%, -50%)",
            display: isVisible ? "block" : "none",
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotateOnMove ? rotation : 0,
          scale,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
          filter: glowEffect ? "drop-shadow(0 0 10px #00e5ffb0)" : "none",
          display: isVisible ? "block" : "none",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn("select-none", className)}
      >
        {cursorElement}
      </motion.div>
    </>
  );
}

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Correct mobile and touch detection
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return <SmoothCursor disabled={isTouch} />;
}
