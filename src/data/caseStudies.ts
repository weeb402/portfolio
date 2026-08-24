const caseStudies = [
  {
    id: "0003",
    repo: "skillpulse",
    title: "One skill identity: bridging Elo and Item Response Theory",
    problem:
      "Two rating systems — competitive Elo for games, latent-ability θ for adaptive tests — would drift apart and contradict each other on leaderboards.",
    decision:
      "A pure conversion module anchors both scales: θ = (Elo − 1000) / 200, item difficulty expressed in Elo units (1500 + 200·b), with defined merge rules for seeding leaderboard ratings from CAT estimates.",
    result:
      "Assessment results move game standing immediately; recalibrating the item bank never touches game code. 478 tests keep the bridge honest.",
    link: "https://github.com/weeb402/skillpulse/blob/main/docs/adr/0003-skillpulse-irt-scoring-and-hmac-anti-cheat.md",
  },
  {
    id: "0002",
    repo: "edgecompute-depin",
    title: "Verifying untrusted compute without a blockchain",
    problem:
      "Volunteer nodes run paid workloads. Results must be verifiable under Byzantine behavior, across heterogeneous hardware where floating-point determinism cannot be assumed.",
    decision:
      "Content-address everything: SHA-256 output hashes compared across replicas (2-of-N modal hash wins), deterministic SHA-256-bucketed spot checks seeded only by job IDs, and a bounded trust engine (±rewards, hourly decay, dispatch blocking below floor).",
    result:
      "Protocol-level verification works today and stays identical when the deterministic executor is swapped for a production WASM interpreter behind the same interface.",
    link: "https://github.com/weeb402/edgecompute-depin/blob/main/docs/adr/0002-edgecompute-depin-wasm-sandbox-and-consensus.md",
  },
  {
    id: "0001",
    repo: "entropy-ai",
    title: "LLM outages as UX states, not errors",
    problem:
      "Chat depends on structured JSON from LLM providers whose availability and quotas are outside our control; raw 5xx responses destroy sessions.",
    decision:
      "Gateway-first chain: a central FastAPI gateway owns prompts, tracing and per-user quotas; on failure the route falls back to a direct Gemini call; if that fails too, a typed STALLED state renders a recoverable UX.",
    result:
      "Provider outages degrade to reduced function, never unhandled failures — verified by killing each layer during the audit pass.",
    link: "https://github.com/weeb402/entropy-ai/blob/main/docs/adr/0001-entropy-multi-llm-gateway-fallback-chain.md",
  },
];

export default caseStudies;
