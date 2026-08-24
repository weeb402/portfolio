import { OPERATIVE } from "@/data/site";

const auditMetrics = [
  {
    value: "258+",
    label: "Verified Passing Tests",
    detail: "SkillPulse 478 · Koda 125 · Automaton 83 · Entropy 25 · Game 11 · Job 6",
  },
  {
    value: "16/16",
    label: "Production Web Apps Live on Vercel",
    detail: "Every deployment returning HTTP 200 OK at time of audit",
  },
  {
    value: "0",
    label: "Critical Security Vulnerabilities",
    detail: "Gitleaks secret scanning on every commit · Sentry runtime monitoring",
  },
];

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-6 py-20">
      <p className="telemetry animate-fade-in">
        Section 01 // Mission Briefing // Clearance Level 4
      </p>

      <h1 className="mt-6 max-w-4xl font-cormorant text-5xl font-semibold leading-[1.05] text-neutral-100 sm:text-6xl lg:text-7xl">
        {OPERATIVE.title.split(" & ")[0]} <span className="text-bond-gold">&amp;</span>{" "}
        {OPERATIVE.title.split(" & ")[1]}
      </h1>

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-bond-dim">
        Operative {OPERATIVE.name} [{OPERATIVE.codename}] builds and ships production-grade
        platforms — adaptive assessment engines, autonomous agents, LLM gateway
        infrastructure and a distributed compute network in Go. Every system is hardened
        fleet-wide with secret scanning, CI audits and architecture decision records.
        This dossier is verified, not claimed.
      </p>

      <div className="mt-10 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest2">
        <a
          href="#projects"
          className="border border-bond-gold/60 bg-bond-gold/10 px-6 py-3 text-bond-gold transition-colors hover:bg-bond-gold hover:text-bond-black"
        >
          Open Case Files →
        </a>
        <a
          href="#dossiers"
          className="border border-bond-border px-6 py-3 text-neutral-300 transition-colors hover:border-bond-red hover:text-bond-red"
        >
          Declassified Dossiers
        </a>
      </div>

      {/* Audit scorecard */}
      <div className="mt-16">
        <div className="gold-rule" />
        <dl className="grid gap-8 pt-8 sm:grid-cols-3">
          {auditMetrics.map((m) => (
            <div key={m.label} className="border-l border-bond-border pl-4">
              <dt className="font-cormorant text-4xl font-semibold text-bond-gold">{m.value}</dt>
              <dd>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-neutral-300">
                  {m.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-bond-dim">{m.detail}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <span
        aria-hidden="true"
        className="classified-stamp classified-stamp--watermark pointer-events-none absolute right-4 top-24 hidden select-none lg:block"
      >
        Classified // Level 4
      </span>
    </section>
  );
}
