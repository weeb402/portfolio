import caseStudies from "@/data/caseStudies";

export default function CaseStudies() {
  return (
    <section id="case-studies" className="bg-cream-100 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-widest2 text-camel-dark">
          Engineering Decisions
        </p>
        <h2 className="mt-3 font-cormorant text-4xl font-semibold sm:text-5xl">
          Case studies, written as ADRs
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-espresso-700">
          Every architectural choice in this portfolio is recorded as a MADR-format
          Architecture Decision Record in the repository it governs. Three are excerpted here.
        </p>
        <div className="mt-12 space-y-6">
          {caseStudies.map((c) => (
            <article
              key={c.id}
              className="rounded-2xl border border-espresso-900/10 bg-white/70 p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-cormorant text-2xl font-semibold sm:text-3xl">
                  {c.title}
                </h3>
                <span className="rounded-full bg-cream-200 px-3 py-1 font-mono text-[10px] tracking-wide text-espresso-700">
                  ADR-{c.id} · {c.repo}
                </span>
              </div>
              <dl className="mt-5 grid gap-4 md:grid-cols-3">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest2 text-camel-dark">
                    Problem
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-espresso-700">{c.problem}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest2 text-camel-dark">
                    Decision
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-espresso-700">{c.decision}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest2 text-camel-dark">
                    Outcome
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-espresso-700">{c.result}</dd>
                </div>
              </dl>
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block text-xs font-semibold text-camel-dark underline-offset-4 hover:underline"
              >
                Read the full ADR →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
