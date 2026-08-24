"use client";

import { useState } from "react";
import CaseStudyModal from "@/components/CaseStudyModal";
import dossiers, { type Dossier } from "@/data/caseStudies";
import { soundFX } from "@/utils/audioFX";

export default function CaseStudies() {
  const [active, setActive] = useState<Dossier | null>(null);

  return (
    <section id="dossiers" className="border-y border-bond-border bg-bond-panel/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="telemetry">Section 03 // Declassified Mission Dossiers // ADR Format</p>
        <h2 className="mt-3 font-cormorant text-4xl font-semibold text-neutral-100 sm:text-5xl">
          Architecture decision records
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bond-dim">
          Every architectural choice in this fleet is recorded as a MADR-format ADR inside the
          repository it governs. Four dossiers are declassified below — open a file to read the
          full Problem → Decisions → Trade-offs → Outcome record.
        </p>

        <div className="mt-12 divide-y divide-bond-border border border-bond-border">
          {dossiers.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                soundFX.playSilencedShot();
                setActive(d);
              }}
              className="group flex w-full flex-col gap-3 bg-bond-panel p-6 text-left transition-colors hover:bg-bond-panel/60 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
            >
              <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-widest2 text-bond-red">
                {d.id}
              </span>
              <span className="flex-1">
                <span className="block font-cormorant text-2xl font-semibold text-neutral-100 transition-colors group-hover:text-bond-gold">
                  {d.project}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest2 text-bond-dim">
                  {d.hook}
                </span>
              </span>
              <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest2 text-bond-gold/70">
                {d.classification}
              </span>
              <span className="shrink-0 border border-bond-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest2 text-neutral-300 transition-colors group-hover:border-bond-gold group-hover:text-bond-gold">
                Open Dossier →
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && <CaseStudyModal dossier={active} onClose={() => setActive(null)} />}
    </section>
  );
}
