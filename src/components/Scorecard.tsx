const tiers = [
  {
    tier: "Tier 1 — Flagships",
    items: [
      ["SkillPulse", "478/478 tests · SSO, Stripe, ATS webhooks, sealed proctoring"],
      ["Koda", "125/125 tests · SM-2 engine, voice tutor, Expo app"],
      ["Automaton", "83/83 tests · dry-run autonomy with loud degraded-mode warnings"],
      ["VERITAS-CLOCK", "Playwright e2e green · adapter persistence, PDF reports"],
      ["Entropy.AI + Chat", "Gateway fallback chain verified by fault injection"],
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
      ["Job Automation / YouTube Hub / Online Automation", "Working pipelines with pytest guards and preflight key probes"],
      ["10 production sites", "Commerce, clinics, clubs — every repo: LICENSE, CI, README, env examples"],
    ],
  },
];

const hardening = [
  "Secret scanning on every commit (gitleaks baseline + pre-commit hooks)",
  "CI on every push: verify jobs plus npm audit / osv-scanner / govulncheck",
  "Request-ID middleware across flagship APIs for end-to-end tracing",
  "MADR ADRs in the three systems where decisions carry weight",
  "CHANGELOG + v1.0.0 tags across the fleet; MIT licensed",
];

export default function Scorecard() {
  return (
    <section id="scorecard" className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs uppercase tracking-widest2 text-camel-dark">Scorecard</p>
      <h2 className="mt-3 font-cormorant text-4xl font-semibold sm:text-5xl">
        Audited, not claimed
      </h2>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.tier}
            className="rounded-2xl border border-espresso-900/10 bg-white/60 p-7"
          >
            <h3 className="font-cormorant text-xl font-semibold text-espresso-800">{t.tier}</h3>
            <ul className="mt-4 space-y-3">
              {t.items.map(([name, note]) => (
                <li key={name}>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs leading-relaxed text-espresso-700">{note}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-camel/40 bg-camel/10 p-7">
        <h3 className="font-cormorant text-xl font-semibold text-espresso-800">
          Fleet-wide hardening (Aug 2026)
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {hardening.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-espresso-800">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-camel-dark" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
