export default function Footer() {
  return (
    <footer className="border-t border-espresso-900/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
        <p className="font-cormorant text-xl font-semibold">weeb402</p>
        <div className="flex items-center gap-6 text-sm text-espresso-700">
          <a
            href="https://github.com/weeb402"
            target="_blank"
            rel="noreferrer"
            className="hover:text-camel-dark"
          >
            GitHub
          </a>
          <a href="#projects" className="hover:text-camel-dark">
            Work
          </a>
          <a href="#case-studies" className="hover:text-camel-dark">
            ADRs
          </a>
        </div>
        <p className="text-xs text-espresso-700/70">
          © 2026 · Built with the SAINT ESPRESSO design language
        </p>
      </div>
    </footer>
  );
}
