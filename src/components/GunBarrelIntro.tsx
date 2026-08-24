"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_SEEN_KEY = "mi6-intro-complete";
const TOTAL_MS = 3200;
const FADE_MS = 500;

const RIFLING_ANGLES = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5];

export default function GunBarrelIntro() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [leaving, setLeaving] = useState(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      /* private mode — intro simply replays next visit */
    }
    document.body.style.overflow = "";
    setVisible(false);
  }, []);

  const skip = useCallback(() => {
    if (finishedRef.current) return;
    setLeaving(true);
    window.setTimeout(finish, FADE_MS - 150);
  }, [finish]);

  useEffect(() => {
    let seen = false;
    let reducedMotion = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
      reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      seen = false;
    }

    if (seen || reducedMotion) {
      setVisible(false);
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";
    document.title = "ACQUIRING TARGET… // VAIBHAV GOYAL [007-DEV]";

    const fadeTimer = window.setTimeout(() => setLeaving(true), TOTAL_MS);
    const doneTimer = window.setTimeout(finish, TOTAL_MS + FADE_MS);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.title = "VAIBHAV GOYAL [007-DEV] — Classified Dossier";
    };
  }, [finish, skip]);

  if (visible === null || !visible) return null;

  return (
    <div
      role="presentation"
      onClick={skip}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bond-black transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Rotating rifling barrel */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className="h-[130vmin] w-[130vmin] animate-barrel-spin opacity-90"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="99" fill="#000000" stroke="#222222" strokeWidth="1" />
          <circle cx="100" cy="100" r="92" fill="none" stroke="#C5A059" strokeWidth="1.5" opacity="0.55" />
          <g>
            {RIFLING_ANGLES.map((angle) => (
              <ellipse
                key={angle}
                cx="100"
                cy="100"
                rx="86"
                ry="30"
                fill="#050505"
                fillOpacity="0.85"
                stroke="#C5A059"
                strokeOpacity="0.35"
                strokeWidth="1"
                transform={`rotate(${angle} 100 100)`}
              />
            ))}
          </g>
          <circle cx="100" cy="100" r="34" fill="#000000" stroke="#C5A059" strokeOpacity="0.4" />
          <circle cx="100" cy="100" r="26" fill="#000000" stroke="#DC2626" strokeOpacity="0.25" />
        </svg>
      </div>

      {/* Muzzle flash burst */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div
          className="h-72 w-72 rounded-full animate-flash-burst"
          style={{
            animationDelay: "2.5s",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(220,38,38,0.9) 30%, rgba(220,38,38,0) 68%)",
          }}
        />
      </div>

      {/* Tracking reticle */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -ml-14 -mt-14 h-28 w-28 text-bond-gold">
        <div className="h-full w-full animate-reticle-track">
          <div className="relative h-full w-full animate-reticle-lock rounded-full border-2 border-bond-gold/90" style={{ animationDelay: "1.85s" }}>
            <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
            <span className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
            <span className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
          </div>
        </div>
      </div>

      {/* Boot readouts */}
      <div className="telemetry absolute left-6 top-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        MI6 // BOOT SEQUENCE v7.0
      </div>
      <div
        className="telemetry absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap !text-bond-gold animate-fade-in sm:!text-xs"
        style={{ animationDelay: "1.9s" }}
      >
        TARGET ACQUIRED // VAIBHAV GOYAL [007-DEV]
        <span className="ml-2 inline-block h-3 w-2 animate-pulse-slow bg-bond-red align-middle" />
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute right-6 top-6 z-30 border border-bond-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest2 text-bond-dim transition-colors hover:border-bond-red hover:text-bond-red"
      >
        Skip Intro [ESC / Click]
      </button>
    </div>
  );
}
