"use client";

import { useEffect } from "react";
import type { Dossier } from "@/data/caseStudies";

type Props = {
  dossier: Dossier;
  onClose: () => void;
};

export default function CaseStudyModal({ dossier, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${dossier.project} mission dossier`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-h-full w-full max-w-3xl overflow-y-auto border border-bond-gold/40 bg-bond-panel p-6 shadow-[0_0_60px_rgba(197,160,89,0.15)] sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          aria-hidden="true"
          className="classified-stamp classified-stamp--watermark pointer-events-none absolute right-6 top-16 select-none sm:text-base"
        >
          Declassified
        </span>

        <p className="font-mono text-[10px] uppercase tracking-widest2 text-bond-red">
          {dossier.classification}
        </p>
        <h3 className="mt-2 font-cormorant text-4xl font-semibold text-neutral-100">
          {dossier.project}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-bond-gold">
          {`${dossier.id} // ${dossier.hook}`}
        </p>

        <div className="mt-8 space-y-7">
          <section>
            <h4 className="font-mono text-[11px] uppercase tracking-widest2 text-bond-gold">
              {"01 // Problem"}
            </h4>
            <div className="gold-rule mt-2" />
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">{dossier.problem}</p>
          </section>

          <section>
            <h4 className="font-mono text-[11px] uppercase tracking-widest2 text-bond-gold">
              {"02 // Architectural Decisions"}
            </h4>
            <div className="gold-rule mt-2" />
            <ul className="mt-3 space-y-3">
              {dossier.decisions.map((d, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300">
                  <span className="mt-1 shrink-0 font-mono text-[10px] text-bond-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="font-mono text-[11px] uppercase tracking-widest2 text-bond-gold">
              {"03 // Trade-offs Accepted"}
            </h4>
            <div className="gold-rule mt-2" />
            <ul className="mt-3 space-y-2.5">
              {dossier.tradeoffs.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-400">
                  <span className="mt-px shrink-0 text-bond-red">▸</span>
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="font-mono text-[11px] uppercase tracking-widest2 text-bond-gold">
              {"04 // Measured Outcome"}
            </h4>
            <div className="gold-rule mt-2" />
            <p className="mt-3 border-l-2 border-bond-gold/50 pl-4 text-sm leading-relaxed text-neutral-200">
              {dossier.outcome}
            </p>
          </section>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-bond-border pt-5 font-mono text-[10px] uppercase tracking-widest2">
          {dossier.adrUrl ? (
            <a
              href={dossier.adrUrl}
              target="_blank"
              rel="noreferrer"
              className="text-bond-gold underline-offset-4 hover:underline"
            >
              Read full ADR in repo ↗
            </a>
          ) : (
            <span className="text-bond-dim">Full ADR // Sealed</span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="border border-bond-border px-4 py-2 text-neutral-300 transition-colors hover:border-bond-red hover:text-bond-red"
          >
            Close File [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}

