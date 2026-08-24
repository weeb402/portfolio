"use client";

import { useEffect, useRef, useState } from "react";
import { primeAudioUnlock, soundFX } from "@/utils/audioFX";

/**
 * Walther PPK replacement cursor for precision pointers only.
 * The muzzle sits exactly on the hotspot (0,0); a laser guide extends
 * 12px past the barrel. Recoil on press, muzzle spark on fire.
 */
export default function GunCursor() {
  const [enabled, setEnabled] = useState(false);
  const trackerRef = useRef<HTMLDivElement | null>(null);
  const recoilRef = useRef<HTMLDivElement | null>(null);
  const flashRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef(0);
  const flashTimerRef = useRef(0);

  // Arm the audio engine on first gesture + bind touch unlock, all devices.
  useEffect(() => {
    primeAudioUnlock();
  }, []);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const noHover = window.matchMedia("(hover: none)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (coarse.matches || noHover.matches || reduced.matches) return;

    // Detach if the device flips to touch input mid-session (2-in-1s, tablet+mouse).
    const inputFlip = window.matchMedia("(pointer: coarse), (hover: none)");
    const onInputFlip = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setEnabled(false);
        document.documentElement.classList.remove("has-custom-cursor");
      }
    };
    inputFlip.addEventListener("change", onInputFlip);

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let queued = false;
    let shown = false;
    const onMove = (e: MouseEvent) => {
      if (queued) return;
      queued = true;
      rafRef.current = requestAnimationFrame(() => {
        const el = trackerRef.current;
        if (el) {
          el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          if (!shown) {
            shown = true;
            el.style.opacity = "1";
          }
        }
        queued = false;
      });
    };

    const onPress = (e: MouseEvent) => {
      if (e.button !== 0) return;
      soundFX.playSilencedShot();
      const gun = recoilRef.current;
      if (gun) {
        gun.classList.remove("animate-cursor-recoil");
        // Force a reflow so the keyframe restarts on rapid fire.
        void gun.offsetWidth;
        gun.classList.add("animate-cursor-recoil");
      }
      const flash = flashRef.current;
      if (flash) {
        window.clearTimeout(flashTimerRef.current);
        flash.classList.remove("animate-muzzle-spark");
        void flash.offsetWidth;
        flash.classList.add("animate-muzzle-spark");
        flashTimerRef.current = window.setTimeout(() => {
          flash.classList.remove("animate-muzzle-spark");
        }, 90);
      }
    };

    const onRelease = () => {
      recoilRef.current?.classList.remove("animate-cursor-recoil");
    };

    const onDocLeave = () => trackerRef.current?.style.setProperty("opacity", "0");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onPress);
    window.addEventListener("mouseup", onRelease);
    document.documentElement.addEventListener("mouseleave", onDocLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(flashTimerRef.current);
      inputFlip.removeEventListener("change", onInputFlip);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onPress);
      window.removeEventListener("mouseup", onRelease);
      document.documentElement.removeEventListener("mouseleave", onDocLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={trackerRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[300] opacity-0 will-change-transform"
    >
      {/* Rotated frame: gun axis runs NW, muzzle pinned to the hotspot. */}
      <div className="absolute left-0 top-0 h-0 w-0" style={{ transform: "rotate(45deg)", transformOrigin: "0 0" }}>
        {/* Laser guide: 12px ahead of the muzzle */}
        <span className="absolute left-[-15px] top-[-1px] h-[2px] w-[13px] bg-gradient-to-r from-transparent to-bond-red/90" />
        <span className="absolute left-[-19px] top-[-3px] h-[5px] w-[5px] rounded-full bg-bond-red shadow-[0_0_8px_2px_rgba(220,38,38,0.65)]" />

        <div ref={recoilRef}>
          <svg viewBox="0 0 34 15" className="absolute left-0 top-[-7.5px] h-[15px] w-[34px] fill-neutral-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            <rect x="4" y="4.75" width="27" height="4.5" rx="1.5" />
            <rect x="31" y="5.25" width="2.5" height="3.5" rx="0.8" />
            <rect x="0" y="5.9" width="4.5" height="2.2" rx="0.8" fill="#D4AF37" />
            <polygon points="23,9.25 29.5,9.25 27,14.8 21.5,13.6" />
            <path d="M17 9.25h5v2.4a3.4 3.4 0 0 1-3.4 3.4h-2.6a4.4 4.4 0 0 0 1-5.8Z" opacity="0.55" />
          </svg>
          {/* Muzzle flash spark */}
          <span
            ref={flashRef}
            className="absolute left-[-5px] top-[-11px] h-5 w-5 rounded-full opacity-0"
            style={{
              background:
                "radial-gradient(circle, rgba(255,240,180,0.95) 0%, rgba(220,38,38,0.7) 40%, transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
