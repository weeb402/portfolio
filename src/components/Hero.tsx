export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6">
      <p className="text-xs font-medium uppercase tracking-widest2 text-camel-dark">
        Full-stack & AI systems
      </p>
      <h1 className="mt-6 max-w-4xl font-cormorant text-6xl font-semibold leading-[1.05] sm:text-7xl lg:text-8xl">
        I build production systems,
        <span className="italic text-camel-dark"> then prove they work.</span>
      </h1>
      <p className="mt-8 max-w-xl text-base leading-relaxed text-espresso-700">
        A portfolio of shipped platforms and autonomous agents — adaptive assessment
        engines, a distributed compute network in Go, LLM gateway infrastructure —
        hardened fleet-wide with secret scanning, CI audits and architecture
        decision records.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="rounded-full bg-espresso-900 px-7 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-camel-dark"
        >
          View the work
        </a>
        <a
          href="/portfolio-audit.pdf"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-espresso-900/20 px-7 py-3 text-sm font-semibold text-espresso-900 transition-colors hover:border-camel hover:text-camel-dark"
        >
          Download audit report (PDF)
        </a>
      </div>
      <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-espresso-900/10 pt-8">
        {[
          ["258+", "tests passing across flagships"],
          ["21", "public repositories, CI-guarded"],
          ["3", "formal ADRs in flagship repos"],
        ].map(([n, label]) => (
          <div key={label}>
            <dt className="font-cormorant text-4xl font-semibold text-camel-dark">{n}</dt>
            <dd className="mt-1 text-xs uppercase tracking-wide text-espresso-700">{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
