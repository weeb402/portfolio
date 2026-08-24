import { OPERATIVE, TELEMETRY_STATUS } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-bond-border bg-bond-black/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-bond-gold">
            MI6 // FIELD ASSETS
          </span>
          <span className="hidden h-3 w-px bg-bond-border sm:block" />
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-neutral-300">
            Operative: {OPERATIVE.name} [{OPERATIVE.codename}]
          </p>
        </div>

        <div className="order-3 w-full sm:order-none sm:w-auto">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-bond-dim sm:text-[11px]">
            <span className="h-2 w-2 animate-pulse-slow rounded-full bg-bond-red shadow-[0_0_8px_rgba(220,38,38,0.9)]" />
            Status: {TELEMETRY_STATUS}
          </p>
        </div>

        <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 sm:text-[11px]">
          <a
            href={OPERATIVE.resume}
            target="_blank"
            rel="noreferrer"
            className="border border-bond-gold/50 bg-bond-gold/10 px-3 py-1.5 text-bond-gold transition-colors hover:bg-bond-gold hover:text-bond-black"
          >
            Download Dossier [PDF]
          </a>
          <a
            href={OPERATIVE.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden border border-bond-border px-3 py-1.5 text-neutral-300 transition-colors hover:border-bond-gold hover:text-bond-gold md:block"
          >
            GitHub [{OPERATIVE.github}]
          </a>
          <a
            href={`mailto:${OPERATIVE.email}`}
            className="hidden border border-bond-border px-3 py-1.5 text-neutral-300 transition-colors hover:border-bond-red hover:text-bond-red lg:block"
          >
            Encrypted Transmission
          </a>
        </nav>
      </div>
    </header>
  );
}
