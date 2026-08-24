export const TIERS = {
  t1: "TIER 1 // FLAGSHIP",
  t2: "TIER 2 // SYSTEM",
  t3: "TIER 3 // WEB",
} as const;

export type Tier = (typeof TIERS)[keyof typeof TIERS];

export type Project = {
  fileNo: string;
  codename: string;
  designation: string;
  tier: Tier;
  summary: string;
  specs: string[];
  stack: string[];
  live?: string;
  liveSecondary?: { label: string; url: string };
  repo?: string;
  caseStudy?: boolean;
};

export const GITHUB_REGISTRY = "https://github.com/weeb402?tab=repositories";

export const projects: Project[] = [
  {
    fileNo: "FILE 001",
    codename: "SkillPulse",
    designation: "Adaptive Assessment Platform",
    tier: TIERS.t1,
    summary:
      "Computerized Adaptive Testing driven by Item Response Theory (3PL), hardened against remote-proctoring fraud with HMAC-sealed telemetry events verified server-side using timing-safe comparison.",
    specs: ["478 automated tests passing", "IRT 3PL scoring engine", "HMAC anti-cheat pipeline"],
    stack: ["Next.js", "WebAuthn", "IRT 3PL", "HMAC Anti-Cheat"],
    live: "https://skillpulse-beta.vercel.app",
    repo: "skillpulse",
    caseStudy: true,
  },
  {
    fileNo: "FILE 002",
    codename: "Sovereign Automaton",
    designation: "Autonomous Agent Platform",
    tier: TIERS.t1,
    summary:
      "Autonomous agent runtime built so autonomy never means unaccountability: sandboxed execution, circuit breakers, dry-run paper mode by default and loud degraded-mode warnings when credentials go missing.",
    specs: ["83 automated tests passing", "Multi-LLM fallback chain", "Docker-isolated execution"],
    stack: ["FastAPI", "Multi-LLM Fallback", "Docker", "Base USDC"],
    live: "https://automaton-agent.vercel.app",
    repo: "automaton-agent",
    caseStudy: true,
  },
  {
    fileNo: "FILE 003",
    codename: "Koda Platform",
    designation: "AI Language-Learning Engine",
    tier: TIERS.t1,
    summary:
      "AI language-learning platform: SM-2 spaced repetition across six interactive challenge games, a conversational AI tutor powered by GPT-4o-mini and gamified progression with Stripe billing.",
    specs: ["125 automated tests passing", "SM-2 spaced repetition engine", "6 challenge games"],
    stack: ["Next.js", "GPT-4o-mini", "Spaced Repetition", "Stripe"],
    live: "https://koda-platform.vercel.app",
    repo: "koda-platform",
  },
  {
    fileNo: "FILE 004",
    codename: "Entropy AI & Chat",
    designation: "Multi-LLM Gateway Network",
    tier: TIERS.t1,
    summary:
      "Personality-driven AI chat fronted by a central FastAPI LLM gateway that owns prompts, tracing and quotas. Dynamic routing degrades Groq → self-hosted vLLM → OpenAI instead of failing.",
    specs: ["25 automated tests passing", "Groq → vLLM → OpenAI routing", "Upstash rate limiting"],
    stack: ["LLM Gateway", "vLLM", "Upstash Rate Limiting", "Next.js"],
    live: "https://entropy-ai-sigma.vercel.app",
    liveSecondary: { label: "Entropy Chat ↗", url: "https://entropy-chat-nine.vercel.app" },
    repo: "entropy-ai",
    caseStudy: true,
  },
  {
    fileNo: "FILE 005",
    codename: "VERITAS-CLOCK",
    designation: "Pressure & Deception Simulator",
    tier: TIERS.t1,
    summary:
      "Timed multi-stage assessment scenarios that measure judgment under pressure: baseline calibration, adaptive psychometrics, deception analysis and shareable PDF reports.",
    specs: [
      "Playwright e2e suite green",
      "SSE live proctoring events",
      "Adaptive psychometrics engine",
    ],
    stack: ["Next.js", "SSE Proctoring", "Playwright e2e", "Zustand"],
    live: "https://puzzle-plum-three.vercel.app",
    repo: "puzzle",
  },
  {
    fileNo: "FILE 006",
    codename: "DePIN Edge Compute",
    designation: "Distributed Compute Network [Go]",
    tier: TIERS.t1,
    summary:
      "Six-module Go monorepo: volunteer nodes execute sandboxed WASM-contract workloads at the edge; results are content-addressed (SHA-256) and verified via replicated hash consensus with a bounded trust engine.",
    specs: [
      "6 Go modules — build+vet+test green",
      "Hash-based Byzantine consensus",
      "Edge WASM contract runtime",
    ],
    stack: ["Go", "WASM Runtime", "Postgres", "Redis", "Docker"],
    repo: "edgecompute-depin",
    caseStudy: true,
  },
  {
    fileNo: "FILE 007",
    codename: "Deadline Delivery",
    designation: "Game Relay Server [Unity/Go]",
    tier: TIERS.t2,
    summary:
      "26k lines of C# vehicle physics wrapped around an anti-cheat multiplayer relay server: authoritative state sync, tamper detection and Dockerized deployment.",
    specs: ["26k LOC C# codebase", "11/11 Jest tests green", "Anti-cheat relay protocol"],
    stack: ["Unity", "C#", "Go", "WebSocket", "Docker"],
  },
  {
    fileNo: "FILE 008",
    codename: "Job Automation Dashboard",
    designation: "ATS Automation Pipeline",
    tier: TIERS.t2,
    summary:
      "ATS autofill and founder-outreach pipeline guarded by pytest: cron-driven agents probe API keys before every run so silent failures never ship.",
    specs: ["6/6 pytest green", "Preflight key probes", "Cron-driven outreach"],
    stack: ["Python", "pytest", "FastAPI", "Automation"],
    live: "https://job-automation-rho.vercel.app",
  },
  {
    fileNo: "FILE 009",
    codename: "LIFAFA",
    designation: "Luxury Atelier Storefront",
    tier: TIERS.t2,
    summary:
      "Luxury storefront with GSAP scroll storytelling and reservation flows backed by Prisma; auth is edge-safe so middleware never blocks static delivery.",
    specs: ["Prisma reservation flow", "Edge-safe auth", "GSAP motion system"],
    stack: ["Next.js", "Prisma", "NextAuth", "GSAP"],
    live: "https://lifafa-qgxg.vercel.app",
  },
  {
    fileNo: "FILE 010",
    codename: "Crafticia Store",
    designation: "Craft Commerce Front",
    tier: TIERS.t2,
    summary:
      "E-commerce for artisan goods with HMAC-sealed admin sessions and Resend-powered transactional email on Neon Postgres.",
    specs: ["HMAC admin sessions", "Resend transactional email", "Neon Postgres catalog"],
    stack: ["Next.js", "E-commerce", "HMAC Sessions", "Resend API"],
    live: "https://nishu-chacha.vercel.app",
  },
  {
    fileNo: "FILE 011",
    codename: "Aurora Cafe",
    designation: "Static Showcase Build",
    tier: TIERS.t3,
    summary:
      "Reservation experience for Aurora Cafe — statically generated Next.js with Framer Motion transitions served entirely from the edge.",
    specs: ["Static generation", "Framer Motion UI", "Edge-served assets"],
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    live: "https://aurora-cafe-xi.vercel.app",
  },
  {
    fileNo: "FILE 012",
    codename: "Clinic Webpage",
    designation: "Medical Static Layout",
    tier: TIERS.t3,
    summary:
      "Clean medical layout for KB Care & Cure with an AI patient-chat widget and accessible appointment pathways.",
    specs: ["Accessible medical layout", "AI patient-chat widget", "Static reliability"],
    stack: ["Next.js", "Tailwind", "AI Widget"],
    live: "https://clinic-webpage-seven.vercel.app",
  },
];
