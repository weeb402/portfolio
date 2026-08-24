"use client";

import Link from "next/link";
import { useEffect } from "react";
import { soundFX } from "@/utils/audioFX";

/** Stylized Beretta 418 with its slide stuck back on a spent casing. */
function BerettaJam() {
  return (
    <div className="relative animate-jam-shake" aria-hidden="true">
      <svg viewBox="0 0 220 110" className="h-auto w-64 fill-neutral-300 sm:w-80">
        {/* frame + barrel */}
        <rect x="8" y="30" width="176" height="22" rx="4" />
        <rect x="178" y="34" width="34" height="12" rx="3" />
        {/* grip */}
        <path d="M120 50 L156 50 L142 104 L108 104 Z" opacity="0.9" />
        {/* trigger guard */}
        <path d="M96 52 h26 v14 a14 14 0 0 1 -14 14 h-20 a18 18 0 0 0 8 -28 Z" opacity="0.7" />
        {/* slide stuck back — offset with exposed chamber */}
        <g className="drop-shadow-[0_0_10px_rgba(220,38,38,0.55)]">
          <rect x="24" y="16" width="128" height="18" rx="4" fill="#DC2626" opacity="0.85" />
          <rect x="140" y="19" width="10" height="12" rx="2" fill="#FCA5A5" />
        </g>
      </svg>
      <span className="absolute -right-2 top-0 border border-bond-red/70 bg-bond-black px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest2 text-bond-red shadow-[0_0_12px_rgba(220,38,38,0.35)]">
        {"[MISFIRE // JAMMED]"}
      </span>
    </div>
  );
}

export default function NotFound() {
  useEffect(() => {
    soundFX.playJamClick();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-7 px-6 py-20 text-center">
      <p className="telemetry">{"Error 404 // Beretta .25 ACP // Field Weapon Failed"}</p>
      <BerettaJam />
      <h1 className="font-cormorant text-5xl font-semibold text-neutral-100 sm:text-6xl">
        Dead end, 007.
      </h1>
      <div className="max-w-md border border-bond-border bg-bond-panel p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-bond-gold">
          {"Memo // M // Universal Exports"}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-300">
          {
            "\u201CA jammed Beretta and a wasted sector, 007. Report back to headquarters before Q notices you are gone.\u201D"
          }
        </p>
        <p className="mt-3 text-right font-mono text-[11px] uppercase tracking-widest2 text-bond-dim">— M</p>
      </div>
      <Link
        href="/"
        onMouseEnter={() => soundFX.playBiometricScan()}
        className="border border-bond-gold/60 bg-bond-gold/10 px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-bond-gold transition-colors hover:bg-bond-gold hover:text-bond-black"
      >
        Return To Headquarters →
      </Link>
    </main>
  );
}
