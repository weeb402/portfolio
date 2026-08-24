import ReplayIntroButton from "@/components/ReplayIntroButton";
import { OPERATIVE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-bond-border bg-bond-panel/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        <div className="gold-rule" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-neutral-300">
            End of Dossier // MI6 Field Assets
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest2 text-bond-dim">
            <a
              href={OPERATIVE.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-bond-gold"
            >
              GitHub [{OPERATIVE.github}]
            </a>
            <a href="#projects" className="transition-colors hover:text-bond-gold">
              Case Files
            </a>
            <a href="#dossiers" className="transition-colors hover:text-bond-gold">
              Dossiers
            </a>
            <ReplayIntroButton />
          </div>
        </div>
        <p className="font-cormorant text-lg font-semibold text-bond-gold">
          {OPERATIVE.name} [{OPERATIVE.codename}]
        </p>
        <p className="text-xs text-bond-dim">
          © 2026 · 16 deployments active · 258+ verified tests · 0 critical vulnerabilities
        </p>
      </div>
    </footer>
  );
}
