"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHKMNPRSTUVXYZ0123456789#$%&@!?<>/\\|=+*";
const DECRYPT_MS = 950;

type ScrambleTextProps = {
  text: string;
  className?: string;
};

/**
 * Cipher-decrypt headline: renders the plain string for SSR/SEO, swaps to
 * random glyphs once armed, then resolves left-to-right when the element
 * enters the viewport. Text mutations go through ref.textContent inside a
 * single rAF loop.
 */
export default function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let running = false;
    el.textContent = scrambleAll(text);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || running) continue;
          running = true;
          io.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / DECRYPT_MS, 1);
            const resolved = Math.floor(p * text.length);
            el.textContent = text.slice(0, resolved) + scrambleAll(text.slice(resolved));
            if (p < 1) {
              raf = requestAnimationFrame(tick);
            } else {
              el.textContent = text;
            }
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}

function scrambleAll(input: string): string {
  let out = "";
  for (const ch of input) {
    out += ch === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }
  return out;
}
