import { projects, supporting } from "@/data/projects";

export default function ProjectGrid() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-xs uppercase tracking-widest2 text-camel-dark">
        Selected Work
      </p>
      <h2 className="mt-3 font-cormorant text-4xl font-semibold sm:text-5xl">
        Flagship systems
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <a
            key={p.repo}
            href={`https://github.com/weeb402/${p.repo}`}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-2xl border border-espresso-900/10 bg-white/60 p-7 transition-all hover:-translate-y-1 hover:border-camel hover:shadow-[0_18px_40px_-20px_rgba(74,59,44,0.35)]"
          >
            <span className="text-[11px] font-medium uppercase tracking-widest2 text-camel-dark">
              {p.tagline}
            </span>
            <h3 className="mt-2 font-cormorant text-3xl font-semibold group-hover:text-camel-dark">
              {p.name}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-espresso-700">
              {p.description}
            </p>
            <ul className="mt-5 space-y-1.5">
              {p.metrics.map((m) => (
                <li key={m} className="flex items-center gap-2 text-xs font-medium text-espresso-800">
                  <span className="h-1 w-1 rounded-full bg-camel" />
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-cream-200 px-2.5 py-1 text-[10px] font-medium tracking-wide text-espresso-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <h3 className="mt-20 font-cormorant text-2xl font-semibold text-espresso-800">
        Supporting builds
      </h3>
      <div className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
        {supporting.map((s) => (
          <div
            key={s.name}
            className="flex items-baseline justify-between gap-4 border-b border-espresso-900/5 pb-2"
          >
            <span className="text-sm font-semibold">{s.name}</span>
            <span className="text-right text-xs text-espresso-700">{s.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
