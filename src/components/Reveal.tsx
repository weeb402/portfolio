"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms, applied to the transition only. */
  delay?: number;
};

/**
 * Viewport-entry reveal: y 30→0, opacity 0→1, scale 0.98→1 on an overshoot
 * curve. Fires once per element via IntersectionObserver; honors reduced motion.
 */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform-gpu will-change-transform transition-all duration-700 ease-spring ${
        shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-[30px] scale-[0.98] opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
