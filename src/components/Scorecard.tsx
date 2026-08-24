const tiers = [
  {
    tier: "Tier 1 — Flagships",
    items: [
      ["SkillPulse", "478/478 tests · WebAuthn SSO, Stripe billing, ATS webhooks, sealed proctoring"],
      ["Koda", "125/125 tests · SM-2 engine, GPT-4o-mini tutor, six challenge games"],
      ["Automaton", "83/83 tests · dry-run autonomy with loud degraded-mode warnings"],
      ["VERITAS-CLOCK", "Playwright e2e green · SSE proctoring, adaptive psychometrics, PDF reports"],
      ["Entropy.AI + Chat", "Groq → vLLM → OpenAI routing verified by fault injection"],
    ],
  },
  {
    tier: "Tier 2 — Systems",
    items: [
      ["EdgeCompute DePIN", "6 Go modules: build, vet and test all green; containers publish clean"],
      ["Deadline Delivery (game)", "Multiplayer relay server, 11/11 Jest, Dockerized"],
    ],
  },
  {
    tier: "Tier 3 — Automation & Sites",
    items: [
      ["Job Automation / pipelines", "Working pipelines with pytest guards and preflight key probes"],
      ["16 production sites", "Commerce, clinics, clubs — every repo: LICENSE, CI, README, env examples"],
    ],
  },
];

const hardening = [
  "Secret scanning on every commit (gitleaks baseline + pre-commit hooks)",
  "CI on every push: verify jobs plus npm audit / osv-scanner / govulncheck",
  "Sentry runtime monitoring across deployed surfaces",
  "Request-ID middleware across flagship APIs for end-to-end tracing",
  "MADR ADRs in the systems where decisions carry weight",
  "CHANGELOG + v1.0.0 tags across the fleet; MIT licensed",
];

export default function Scorecard() {
  return (
    <section id="scorecard" className="mx-auto max-w-6xl px-6 py-24">
      <p className="telemetry">Section 04 // Field Audit Scorecard // Audited Aug 2026</p>
      <h2 className="mt-3 font-cormorant text-4xl font-semibold text-neutral-100 sm:text-5xl">
        Verified, not claimed
      </h2>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.tier} className="border border-bond-border bg-bond-panel p-7">
            <h3 className="font-mono text-xs uppercase tracking-widest2 text-bond-gold">{t.tier}</h3>
            <ul className="mt-5 space-y-4">
              {t.items.map(([name, note]) => (
                <li key={name}>
                  <p className="text-sm font-semibold text-neutral-100">{name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-bond-dim">{note}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative mt-6 border border-bond-red/30 bg-bond-panel p-7">
        <span
          aria-hidden="true"
          className="classified-stamp pointer-events-none absolute -top-3 right-8 select-none bg-bond-black"
        >
          Eyes Only
        </span>
        <h3 className="font-mono text-xs uppercase tracking-widest2 text-bond-gold">
          Fleet-wide hardening protocol
        </h3>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {hardening.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-neutral-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bond-gold" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
