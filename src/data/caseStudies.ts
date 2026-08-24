export type Dossier = {
  id: string;
  project: string;
  classification: string;
  hook: string;
  problem: string;
  decisions: string[];
  tradeoffs: string[];
  outcome: string;
  adrUrl?: string;
};

const dossiers: Dossier[] = [
  {
    id: "DOSSIER 01",
    project: "SkillPulse",
    classification: "TOP SECRET // TIER 1 FLAGSHIP",
    hook: "IRT 3PL scoring & HMAC cheat resistance",
    problem:
      "Two rating systems — competitive Elo for challenge games and latent-ability θ for adaptive tests — would drift apart and contradict each other on leaderboards. Meanwhile, remote-proctoring events generated client-side could be spoofed by a determined candidate.",
    decisions: [
      "A pure conversion module anchors both scales: θ = (Elo − 1000) / 200, item difficulty expressed in Elo units (1500 + 200·b), with defined merge rules for seeding leaderboard ratings from CAT estimates.",
      "Proctoring telemetry is HMAC-sealed in the browser and verified server-side with timing-safe comparison, so replayed or forged events fail closed.",
      "WebAuthn-backed identity and ATS webhooks (Greenhouse/Lever) keep assessment results flowing into hiring pipelines without manual export.",
    ],
    tradeoffs: [
      "The conversion bridge assumes anchor stability — recalibrating the item bank never touches game code, but re-anchoring Elo requires a coordinated migration.",
      "Timing-safe comparison costs CPU cycles per event; accepted as the price of tamper resistance.",
      "Sealing payloads increases request size versus plain JSON; batching keeps overhead negligible.",
    ],
    outcome:
      "478/478 automated tests passing. Assessment results move game standing immediately, recalibration is isolated to one module, and the anti-cheat pipeline has survived adversarial review. SAML SSO and Stripe billing run in production.",
    adrUrl:
      "https://github.com/weeb402/skillpulse/blob/main/docs/adr/0003-skillpulse-irt-scoring-and-hmac-anti-cheat.md",
  },
  {
    id: "DOSSIER 02",
    project: "Entropy AI",
    classification: "SECRET // TIER 1 FLAGSHIP",
    hook: "Multi-LLM dynamic routing: Groq → vLLM → OpenAI",
    problem:
      "Chat depends on structured JSON from LLM providers whose availability and quotas sit entirely outside our control. Raw 5xx responses destroy active sessions and erode user trust.",
    decisions: [
      "A central FastAPI gateway owns prompts, tracing, response formats and per-user quotas for every provider behind one interface.",
      "Dynamic routing degrades along an ordered chain — Groq first for latency, self-hosted vLLM second for sovereignty, OpenAI last as the paid safety net.",
      "If every layer fails, routes resolve to a typed STALLED state that renders a recoverable UX instead of an unhandled exception. Upstash enforces per-user rate limits at the edge.",
    ],
    tradeoffs: [
      "Each provider needs its own response shim; shims are versioned and tested against recorded fixtures.",
      "Walking the fallback chain adds worst-case latency; health probes short-circuit dead providers so common-case cost stays near zero.",
      "Self-hosting vLLM carries ops burden — traded deliberately for cost control and data sovereignty.",
    ],
    outcome:
      "25 automated tests passing. Verified by fault injection during the audit pass: each provider was killed in sequence and the platform degraded to reduced function, never to unhandled failure.",
    adrUrl:
      "https://github.com/weeb402/entropy-ai/blob/main/docs/adr/0001-entropy-multi-llm-gateway-fallback-chain.md",
  },
  {
    id: "DOSSIER 03",
    project: "Sovereign Automaton",
    classification: "TOP SECRET // TIER 1 FLAGSHIP",
    hook: "Sandboxed execution & circuit breakers",
    problem:
      "An autonomous agent that can act on markets must never execute unsupervised against live funds, and it must never fail silently when credentials are missing or upstream signals go bad.",
    decisions: [
      "Dry-run paper execution is the default posture: every strategy change is proven against simulated fills before live credentials are even loaded.",
      "Circuit breakers watch position drift and error rates, halting the agent into a loud degraded mode instead of limping onward.",
      "Execution runs inside Docker-isolated sandboxes; notifier fan-out announces degraded-mode warnings through every channel until acknowledged.",
      "Base USDC settlement path keeps value transfer on-chain and auditable end-to-end.",
    ],
    tradeoffs: [
      "Paper mode trades realism for safety; fill simulation diverges from real order books under stress.",
      "Aggressive circuit-breaker thresholds buy safety with false positives — a restart ritual beats silent ruin.",
      "FastAPI adds framework weight over a raw script, repaid by typed handlers and testable dependency injection.",
    ],
    outcome:
      "83 automated tests passing across the pipeline. Autonomy with accountability: degraded states announce themselves loudly, and no path exists where the agent spends real money unobserved.",
  },
  {
    id: "DOSSIER 04",
    project: "edgecompute-depin",
    classification: "TOP SECRET // DISTRIBUTED SYSTEMS",
    hook: "Consensus verification & edge WASM runtime",
    problem:
      "Volunteer nodes run paid workloads. Results must remain verifiable under Byzantine behavior, across heterogeneous hardware where floating-point determinism cannot be assumed.",
    decisions: [
      "Content-address everything: workload outputs are SHA-256 hashes compared across replicas — a 2-of-N modal hash wins consensus.",
      "Deterministic spot checks are seeded only by job IDs (SHA-256 bucketing), so neither requester nor node can predict which results get deep-verified.",
      "A bounded trust engine scores nodes (±rewards, hourly decay) and blocks dispatch below a trust floor, making misbehavior expensive and recovery gradual.",
      "The deterministic executor hides behind an interface identical to the production WASM interpreter, so the protocol is exercised long before runtime swap-in.",
    ],
    tradeoffs: [
      "Replication multiplies compute cost by N; bounded to security-critical job classes only.",
      "Go-only determinism restricts contributor language choice until the WASM runtime reaches parity.",
      "Hash spot checks are probabilistic — they raise attack cost sharply but do not prove every result correct.",
    ],
    outcome:
      "Six Go modules with build, vet and test all green; containers publish clean. Protocol-level verification works today and stays byte-identical when the executor swaps to the WASM interpreter behind the same interface.",
    adrUrl:
      "https://github.com/weeb402/edgecompute-depin/blob/main/docs/adr/0002-edgecompute-depin-wasm-sandbox-and-consensus.md",
  },
];

export default dossiers;
