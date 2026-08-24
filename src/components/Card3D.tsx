"use client";

import { useCallback, useEffect, useRef } from "react";

type Card3DProps = {
  children: React.ReactNode;
  className?: string;
  /** Peak rotation in degrees at the card edges. */
  maxTilt?: number;
  glare?: boolean;
};

const GLARE_TINT = "212, 175, 55";
const SCALE = "scale3d(1.02, 1.02, 1.02)";

/**
 * Perspective tilt wrapper: pointer position drives rotateX/rotateY while a
 * radial sheen tracks the mirrored coordinate, producing a specular glare that
 * travels opposite the tilt. All updates are written straight to the DOM via
 * refs inside requestAnimationFrame — no React re-renders per pointer event.
 */
export default function Card3D({ children, className = "", maxTilt = 6, glare = true }: Card3DProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const motionOK = useCallback(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    [],
  );

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse" || !motionOK()) return;
      const el = frameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      const py = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        el.style.transform = `rotateX(${((0.5 - py) * maxTilt * 2).toFixed(2)}deg) rotateY(${(
          (px - 0.5) * maxTilt * 2
        ).toFixed(2)}deg) ${SCALE}`;
        const sheen = glareRef.current;
        if (sheen) {
          // Mirror the cursor so the highlight glides against the tilt.
          sheen.style.backgroundImage = `radial-gradient(circle at ${(100 - px * 100).toFixed(1)}% ${(
            100 -
            py * 100
          ).toFixed(1)}%, rgba(${GLARE_TINT}, 0.18) 0%, rgba(${GLARE_TINT}, 0.05) 34%, transparent 62%)`;
          sheen.style.opacity = "1";
        }
      });
    },
    [maxTilt, motionOK],
  );

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (frameRef.current) frameRef.current.style.transform = "";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }, []);

  return (
    <div className={className} style={{ perspective: "1000px" }}>
      <div
        ref={frameRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="relative h-full w-full transition-transform duration-300 [transform-style:preserve-3d] will-change-transform"
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 will-change-[background-image]"
          />
        )}
      </div>
    </div>
  );
}
