import { GITHUB_REGISTRY, TIERS, projects, type Project, type Tier } from "@/data/projects";

function FileCard({ p }: { p: Project }) {
  const repoUrl = p.repo ? `https://github.com/weeb402/${p.repo}` : GITHUB_REGISTRY;
  return (
    <article className="group relative flex flex-col border border-bond-border bg-bond-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-bond-gold/60 hover:shadow-[0_18px_40px_-20px_rgba(197,160,89,0.25)]">
      {/* corner brackets */}
      <span aria-hidden="true" className="absolute left-0 top-0 h-3 w-3 border-l border-t border-bond-gold opacity-0 transition-opacity group-hover:opacity-100" />
      <span aria-hidden="true" className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-bond-gold opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-bond-dim">
          {p.fileNo}
        </span>
        <span className="border border-bond-gold/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest2 text-bond-gold">
          {p.tier}
        </span>
      </div>

      <h3 className="mt-4 font-cormorant text-3xl font-semibold text-neutral-100 transition-colors group-hover:text-bond-gold">
        {p.codename}
      </h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-bond-dim">
        {p.designation}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-400">{p.summary}</p>

      <ul className="mt-5 space-y-1.5">
        {p.specs.map((s) => (
          <li key={s} className="flex items-start gap-2 font-mono text-[11px] tracking-wide text-neutral-300">
            <span className="mt-px text-bond-gold">▸</span>
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span
            key={s}
            className="border border-bond-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-bond-dim"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest2">
        {p.live && (
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="bg-bond-gold px-3 py-1.5 text-bond-black transition-colors hover:bg-bond-gold-bright"
          >
            Live URL ↗
          </a>
        )}
        {p.liveSecondary && (
          <a
            href={p.liveSecondary.url}
            target="_blank"
            rel="noreferrer"
            className="text-bond-gold underline-offset-4 hover:underline"
          >
            {p.liveSecondary.label}
          </a>
        )}
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className={`transition-colors ${
            p.live
              ? "text-bond-dim hover:text-bond-gold"
              : "border border-bond-border px-3 py-1.5 text-neutral-300 hover:border-bond-gold hover:text-bond-gold"
          }`}
        >
          {p.repo ? "GitHub Repo ↗" : "GitHub // Registry"}
        </a>
        {!p.live && !p.caseStudy && (
          <span className="ml-auto text-[9px] text-bond-red/80">Backend Only // No Public URL</span>
        )}
      </div>

      {p.tier === TIERS.t1 && (
        <span
          aria-hidden="true"
          className="classified-stamp classified-stamp--watermark pointer-events-none absolute -right-1 top-8 select-none"
        >
          Classified
        </span>
      )}
    </article>
  );
}

export default function ProjectsGrid() {
  const tiers: Tier[] = [TIERS.t1, TIERS.t2, TIERS.t3];
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <p className="telemetry">Section 02 // Live Operation Registry // Eyes Only</p>
      <h2 className="mt-3 font-cormorant text-4xl font-semibold text-neutral-100 sm:text-5xl">
        Classified project files
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bond-dim">
        Sixteen operations under management. Every live URL below was returning{" "}
        <span className="font-mono text-bond-gold">HTTP 200 OK</span> at time of audit.
      </p>

      {tiers.map((tier) => {
        const files = projects.filter((p) => p.tier === tier);
        if (!files.length) return null;
        return (
          <div key={tier} className="mt-14">
            <div className="mb-6 flex items-center gap-4">
              <h3 className="whitespace-nowrap font-mono text-xs uppercase tracking-widest2 text-bond-gold">
                {tier === TIERS.t1
                  ? `${tier} — Flagship Systems`
                  : tier === TIERS.t2
                    ? `${tier} — Operational Systems`
                    : `${tier} — Production Sites`}
              </h3>
              <div className="gold-rule" />
              <span className="whitespace-nowrap font-mono text-[10px] tracking-widest2 text-bond-dim">
                {files.length} FILES
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {files.map((p) => (
                <FileCard key={p.fileNo} p={p} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
