"use client";

import { useEffect, useRef } from "react";

const GRID_TILE_PX = 72;
const MARKER_BAND_PX = 1600;
const GRID_SPEED = 0.05;
const MARKER_SPEED = 0.12;

type Marker = { x: number; y: number; label: string };

/** Deterministic spread — identical on server and client, no hydration drift. */
function buildMarkers(count: number): Marker[] {
  let seed = 20260825;
  const next = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, (_, i) => ({
    x: Math.round(4 + next() * 92),
    y: Math.round(next() * (MARKER_BAND_PX - 60)),
    label: `GRID ${String((i * 7 + 13) % 99).padStart(2, "0")}-${String.fromCharCode(65 + (i % 6))}`,
  }));
}

const MARKERS = buildMarkers(14);

/**
 * Fixed tactical backdrop behind all content: a blueprint grid and sparse
 * coordinate markers translating at differential speeds against scroll.
 * Offsets wrap modulo their tile/band size so the field never runs dry.
 * Transform-only updates inside rAF; disabled under reduced motion.
 */
export default function TacticalBackdrop() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let queued = false;

    const apply = () => {
      const y = window.scrollY;
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(0, ${(y * GRID_SPEED) % GRID_TILE_PX}px, 0)`;
      }
      if (markerRef.current) {
        markerRef.current.style.transform = `translate3d(0, ${(y * MARKER_SPEED) % MARKER_BAND_PX}px, 0)`;
      }
      queued = false;
    };

    const onScroll = () => {
      if (!queued) {
        queued = true;
        raf = requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        ref={gridRef}
        className="absolute inset-x-0 top-[-72px] bottom-[-72px] will-change-transform"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(197,160,89,0.045) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(197,160,89,0.045) 1px, transparent 1px)," +
            "linear-gradient(to right, rgba(255,255,255,0.018) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: `${GRID_TILE_PX}px ${GRID_TILE_PX}px, ${GRID_TILE_PX}px ${GRID_TILE_PX}px, 24px 24px, 24px 24px`,
        }}
      />
      <div
        ref={markerRef}
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{ height: MARKER_BAND_PX * 2 }}
      >
        {MARKERS.map((m, i) => (
          <span key={`a-${i}`} className="absolute font-mono text-[9px] tracking-widest2 text-bond-gold/25" style={{ left: `${m.x}%`, top: m.y }}>
            +<span className="ml-1 text-bond-gold/20">{m.label}</span>
          </span>
        ))}
        {MARKERS.map((m, i) => (
          <span key={`b-${i}`} className="absolute font-mono text-[9px] tracking-widest2 text-bond-gold/25" style={{ left: `${m.x}%`, top: m.y + MARKER_BAND_PX }}>
            +<span className="ml-1 text-bond-gold/20">{m.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
