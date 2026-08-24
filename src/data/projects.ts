export type Project = {
  name: string;
  repo: string;
  tagline: string;
  description: string;
  metrics: string[];
  stack: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "SkillPulse",
    repo: "skillpulse",
    tagline: "Adaptive assessment platform",
    description:
      "Computerized Adaptive Testing driven by Item Response Theory, with an Elo⇄IRT bridge keeping game ratings and assessment ability on one scale. Remote proctoring events are HMAC-sealed client-side and verified server-side with timing-safe comparison.",
    metrics: ["478 tests passing", "SAML SSO + Stripe billing", "ATS webhooks (Greenhouse/Lever)"],
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Upstash Redis"],
    featured: true,
  },
  {
    name: "Koda",
    repo: "koda-platform",
    tagline: "AI language-learning engine",
    description:
      "SM-2 spaced repetition across six interactive challenge games, a voice-to-voice AI conversation partner, gamified progression and a companion Expo mobile app. Runs zero-config on local LibSQL for contributors.",
    metrics: ["125 tests passing", "6 challenge games", "Expo mobile app"],
    stack: ["Next.js", "Prisma", "Neon Postgres", "OpenAI", "Expo"],
    featured: true,
  },
  {
    name: "EdgeCompute DePIN",
    repo: "edgecompute-depin",
    tagline: "Distributed compute network in Go",
    description:
      "A six-module Go monorepo: volunteer nodes run sandboxed WASM-contract workloads; results are content-addressed (SHA-256) and verified by replicated hash consensus with deterministic spot checks and a bounded trust engine.",
    metrics: ["6 Go modules, build+vet+test green", "Hash-based consensus", "Trust engine with decay"],
    stack: ["Go", "Postgres", "Redis", "Docker", "gorilla/mux"],
    featured: true,
  },
  {
    name: "Entropy.AI",
    repo: "entropy-ai",
    tagline: "Multi-LLM gateway chat platform",
    description:
      "Personality-driven AI chat with structured JSON responses. Central FastAPI LLM gateway enforces tracing, quotas and response formats; a direct Gemini fallback chain degrades gracefully instead of failing.",
    metrics: ["Gateway-first fallback chain", "Per-user rate limiting", "Full trace middleware"],
    stack: ["Next.js", "FastAPI", "Gemini", "Prisma"],
    featured: true,
  },
  {
    name: "VERITAS-CLOCK",
    repo: "puzzle",
    tagline: "Pressure & deception simulator",
    description:
      "Timed multi-stage assessment scenarios that measure judgment under pressure: baseline calibration, adaptive testing, deception analysis and shareable PDF reports — with an adapter-based store that works file-local or on Supabase.",
    metrics: ["Playwright e2e suite green", "Anti-cheat telemetry engine", "PDF report generation"],
    stack: ["Next.js", "Zustand", "Recharts", "Playwright"],
    featured: true,
  },
  {
    name: "Sovereign Automaton",
    repo: "automaton-agent",
    tagline: "Autonomous AI trading agent",
    description:
      "Market-watching agent with notification pipelines, dry-run mode for safe paper execution, and loud degraded-mode warnings when credentials are missing — built so autonomy never means unaccountability.",
    metrics: ["83 tests passing", "DRY_RUN paper mode", "Notifier fan-out"],
    stack: ["TypeScript", "Node.js", "Vitest"],
    featured: true,
  },
];

export const supporting = [
  { name: "Deadline Delivery", note: "Multiplayer relay game server · Fastify + WebSocket · private repo" },
  { name: "Job Automation", note: "ATS autofill + founder outreach pipeline · pytest-guarded cron agent" },
  { name: "Review Assistant", note: "Review collection for local businesses · Prisma + Neon serverless" },
  { name: "LIFAFA Atelier", note: "Luxury storefront · NextAuth + GSAP scroll storytelling" },
  { name: "SAINT ESPRESSO", note: "Design-language flagship · Lenis + GSAP motion system" },
  { name: "ORA Club Jaipur", note: "Membership intake · react-hook-form + zod + Prisma" },
  { name: "Crafticia", note: "Craft commerce · Neon Postgres + Resend transactional email" },
  { name: "LuxeHamper", note: "Premium gifting storefront · lean Next.js" },
  { name: "Aurora Cafe", note: "Reservation experience · Tailwind + Framer Motion" },
  { name: "KB Care & Cure", note: "Clinic site with AI patient-chat widget" },
  { name: "VoxEpub", note: "AI audiobook reader · Cloudinary/S3 storage drivers" },
  { name: "YouTube Content Hub", note: "Cascading-resolution downloader · Fastify + googleapis" },
];
