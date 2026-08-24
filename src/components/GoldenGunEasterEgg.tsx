"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { soundFX } from "@/utils/audioFX";

const GOLD_KEY = "mi6-gold-clearance";
const GOLD_EVENT = "gold-clearance-unlocked";

type Part = {
  id: string;
  label: string;
  /** Assembled resting position on the stage. */
  style: React.CSSProperties;
  /** Scatter transform applied before assembly begins. */
  scattered: string;
  delayMs: number;
};

const PARTS: Part[] = [
  {
    id: "breech",
    label: "Lighter Breech",
    style: { left: 88, top: 118, width: 112 },
    scattered: "-translate-x-28 -translate-y-24 -rotate-[24deg] opacity-40",
    delayMs: 0,
  },
  {
    id: "barrel",
    label: "Pen Barrel",
    style: { left: 194, top: 130, width: 104 },
    scattered: "translate-x-24 -translate-y-36 rotate-[38deg] opacity-40",
    delayMs: 180,
  },
  {
    id: "handle",
    label: "Case Handle",
    style: { left: 126, top: 170, width: 48 },
    scattered: "-translate-x-12 translate-y-32 rotate-[19deg] opacity-40",
    delayMs: 360,
  },
  {
    id: "trigger",
    label: "Cufflink Trigger",
    style: { left: 184, top: 166, width: 28 },
    scattered: "translate-x-20 translate-y-24 rotate-[70deg] opacity-40",
    delayMs: 540,
  },
];

function PartSvg({ id }: { id: string }) {
  const gid = `gg-${id}`;
  return (
    <svg viewBox="0 0 100 100" className="h-auto w-full drop-shadow-[0_0_14px_rgba(212,175,55,0.45)]" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3D98B" />
          <stop offset="55%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6F3C" />
        </linearGradient>
      </defs>
      {id === "breech" && (
        <g fill={`url(#${gid})`}>
          <rect x="2" y="22" width="96" height="52" rx="12" />
          <rect x="10" y="30" width="34" height="36" rx="6" fill="#050505" opacity="0.35" />
          <rect x="48" y="27" width="4" height="42" fill="#050505" opacity="0.3" />
        </g>
      )}
      {id === "barrel" && (
        <g fill={`url(#${gid})`}>
          <rect x="2" y="34" width="92" height="26" rx="13" />
          <rect x="8" y="28" width="18" height="8" rx="4" />
          <circle cx="94" cy="47" r="9" fill="#050505" />
          <circle cx="94" cy="47" r="4" fill="#D4AF37" />
        </g>
      )}
      {id === "handle" && (
        <g fill={`url(#${gid})`}>
          <path d="M14 2 H86 L72 98 H28 Z" />
          <rect x="30" y="16" width="40" height="7" rx="3.5" fill="#050505" opacity="0.3" />
          <rect x="33" y="34" width="34" height="7" rx="3.5" fill="#050505" opacity="0.3" />
        </g>
      )}
      {id === "trigger" && (
        <g fill="none" stroke={`url(#${gid})`} strokeWidth="11">
          <circle cx="50" cy="50" r="36" />
        </g>
      )}
    </svg>
  );
}

export default function GoldenGunEasterEgg() {
  const [open, setOpen] = useState(false);
  const [assembling, setAssembling] = useState(false);
  const [locked, setLocked] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const t of timersRef.current) window.clearTimeout(t);
    timersRef.current = [];
  }, []);

  const close = useCallback(() => {
    clearTimers();
    setOpen(false);
    setAssembling(false);
    setLocked(false);
  }, [clearTimers]);

  const beginAssembly = useCallback(() => {
    setOpen(true);
    setAssembling(false);
    setLocked(false);
    clearTimers();
    timersRef.current.push(
      window.setTimeout(() => setAssembling(true), 60),
      window.setTimeout(() => {
        soundFX.playGoldenGunLock();
        setLocked(true);
        try {
          window.localStorage.setItem(GOLD_KEY, "1");
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new CustomEvent(GOLD_EVENT));
      }, 1400),
    );
  }, [clearTimers]);

  useEffect(() => {
    let seq = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "0" && e.key !== "7") return;
      if (!open) {
        seq = (seq + e.key).slice(-3);
        if (seq === "007") {
          seq = "";
          beginAssembly();
        }
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keydown", onEsc);
      clearTimers();
    };
  }, [beginAssembly, close, clearTimers, open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="The Golden Gun clearance sequence"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md border border-bond-gold/50 bg-bond-panel p-6 shadow-[0_0_80px_rgba(212,175,55,0.2)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-bond-red">
          {"Easter Egg // The Man With The Golden Gun"}
        </p>
        <h3 className="mt-1 font-cormorant text-3xl font-semibold text-bond-gold">
          Golden Gun Protocol
        </h3>

        <div className="relative mx-auto mt-4 h-[300px] w-full max-w-[300px]" aria-hidden="true">
          {locked && (
            <span
              className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full animate-flash-burst"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,240,180,0.95) 0%, rgba(212,175,55,0.75) 35%, rgba(212,175,55,0) 70%)",
              }}
            />
          )}
          {PARTS.map((part) => (
            <div
              key={part.id}
              title={part.label}
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                assembling ? "" : part.scattered
              }`}
              style={{
                ...part.style,
                transitionDelay: assembling ? `${part.delayMs}ms` : "0ms",
              }}
            >
              <PartSvg id={part.id} />
            </div>
          ))}
          <span className="telemetry absolute bottom-0 left-1/2 w-max -translate-x-1/2 !text-bond-dim">
            {assembling ? (locked ? "ASSEMBLY COMPLETE" : "COMPONENTS IN TRANSIT…") : "SEQUENCE ACCEPTED"}
          </span>
        </div>

        <div className="mt-4 min-h-[64px] text-center">
          {locked ? (
            <>
              <p className="font-mono text-xs uppercase tracking-widest2 text-bond-gold-bright">
                ★ Gold Clearance Granted ★
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                Tier-1 files now carry the gold badge. A single shot is all it takes, Mr Bond.
              </p>
            </>
          ) : (
            <p className="text-sm italic text-neutral-500">
              Four harmless items — a lighter, a pen, a cigarette case, a cufflink.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={close}
          className="mt-4 w-full border border-bond-border py-2 font-mono text-[10px] uppercase tracking-widest2 text-neutral-300 transition-colors hover:border-bond-gold hover:text-bond-gold"
        >
          {locked ? "Return To Duty" : "Abort Assembly [ESC]"}
        </button>
      </div>
    </div>
  );
}
