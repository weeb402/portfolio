"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OPERATIVE, TELEMETRY_STATUS } from "@/data/site";
import { soundFX } from "@/utils/audioFX";

const MUTED_KEY = "bond-audio-muted";

/** Stylized Walther PPK silhouette; the scanline sweeps the "grip" on hover. */
function PistolGlyph() {
  return (
    <span className="relative inline-block h-4 w-6 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 26 16" className="h-full w-full fill-current">
        <rect x="1" y="2" width="20" height="4.4" rx="1" />
        <rect x="21" y="3.2" width="4.4" height="2" rx="0.6" />
        <polygon points="12.5,7.5 17.5,7.5 15,15 10.2,15" />
        <path d="M6.5 7.5h3.4v2.1a2.4 2.4 0 0 1-2.4 2.4H5.2a3.9 3.9 0 0 0 1.3-4.5Z" opacity="0.65" />
      </svg>
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-full bg-bond-gold-bright opacity-0 shadow-[0_0_8px_rgba(212,175,55,0.95)] group-hover:animate-grip-scan group-hover:opacity-100" />
    </span>
  );
}

export default function TelemetryHeader() {
  const [armed, setArmed] = useState(true);
  const lastScanRef = useRef(0);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(MUTED_KEY);
      const muted = stored === "1";
      soundFX.isMuted = muted;
      setArmed(!muted);
    } catch {
      /* storage unavailable — keep default armed */
    }
  }, []);

  const toggleAudio = useCallback(() => {
    setArmed((prev) => {
      const next = !prev;
      soundFX.isMuted = !next;
      try {
        window.localStorage.setItem(MUTED_KEY, next ? "0" : "1");
      } catch {
        /* ignore */
      }
      if (next) soundFX.playBiometricScan();
      return next;
    });
  }, []);

  const onBiometricHover = useCallback(() => {
    const now = Date.now();
    if (now - lastScanRef.current < 900) return;
    lastScanRef.current = now;
    soundFX.playBiometricScan();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-bond-border bg-bond-black/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-bond-gold">
            MI6 // FIELD ASSETS
          </span>
          <span className="hidden h-3 w-px bg-bond-border sm:block" />
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-neutral-300">
            Operative: {OPERATIVE.name} [{OPERATIVE.codename}]
          </p>
        </div>

        <div className="order-3 flex w-full items-center gap-4 sm:order-none sm:w-auto">
          <button
            type="button"
            onClick={toggleAudio}
            aria-pressed={armed}
            title={armed ? "Silence weapon systems" : "Arm weapon audio systems"}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-bond-dim transition-colors hover:text-neutral-300"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                armed
                  ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.9)]"
                  : "bg-bond-red shadow-[0_0_8px_rgba(220,38,38,0.9)]"
              }`}
            />
            [AUDIO: {armed ? "ARMED" : "SILENT"}]
          </button>
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-bond-dim sm:text-[11px]">
            <span className="h-2 w-2 animate-pulse-slow rounded-full bg-bond-red shadow-[0_0_8px_rgba(220,38,38,0.9)]" />
            Status: {TELEMETRY_STATUS}
          </p>
        </div>

        <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 sm:text-[11px]">
          <a
            href={OPERATIVE.resume}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={onBiometricHover}
            className="group flex items-center gap-2 border border-bond-gold/50 bg-bond-gold/10 px-3 py-1.5 text-bond-gold transition-colors hover:bg-bond-gold hover:text-bond-black"
          >
            <PistolGlyph />
            Download Dossier [PDF]
          </a>
          <a
            href={OPERATIVE.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden border border-bond-border px-3 py-1.5 text-neutral-300 transition-colors hover:border-bond-gold hover:text-bond-gold md:block"
          >
            GitHub [{OPERATIVE.github}]
          </a>
          <a
            href={`mailto:${OPERATIVE.email}`}
            onMouseEnter={onBiometricHover}
            className="group hidden items-center gap-2 border border-bond-red/40 bg-bond-red/5 px-3 py-1.5 text-neutral-300 transition-colors hover:border-bond-red hover:text-bond-red md:flex"
          >
            <PistolGlyph />
            Encrypted Transmission
          </a>
        </nav>
      </div>
    </header>
  );
}
