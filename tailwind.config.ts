import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bond-black": "#050505",
        "bond-panel": "#0F0F0F",
        "bond-border": "#222222",
        "bond-gold": {
          DEFAULT: "#C5A059",
          bright: "#D4AF37",
          dim: "#8A6F3C",
        },
        "bond-red": "#DC2626",
        "bond-dim": "#7A7A7A",
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1.2, 0.36, 1)",
      },
      keyframes: {
        "barrel-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "reticle-track": {
          "0%": { transform: "translate(-44vw, -38vh)", opacity: "0" },
          "8%": { opacity: "1" },
          "52%": { transform: "translate(-4vw, -3vh)" },
          "62%": { transform: "translate(0, 0) scale(0.82)" },
          "100%": { transform: "translate(0, 0) scale(0.82)" },
        },
        "reticle-lock": {
          "0%, 100%": {
            color: "#C5A059",
            borderColor: "rgba(197, 160, 89, 0.9)",
            boxShadow:
              "0 0 12px rgba(197, 160, 89, 0.25), inset 0 0 10px rgba(197, 160, 89, 0.15)",
          },
          "50%": {
            color: "#DC2626",
            borderColor: "rgba(220, 38, 38, 1)",
            boxShadow:
              "0 0 26px rgba(220, 38, 38, 0.65), inset 0 0 18px rgba(220, 38, 38, 0.35)",
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "grip-scan": {
          "0%": { transform: "translateY(-4px)", opacity: "0" },
          "12%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { transform: "translateY(18px)", opacity: "0" },
        },
        "spring-recoil": {
          "0%": { transform: "translateX(0)" },
          "30%": { transform: "translateX(-4px)" },
          "60%": { transform: "translateX(2px)" },
          "80%": { transform: "translateX(-1px)" },
          "100%": { transform: "translateX(0)" },
        },
        "jam-shake": {
          "0%, 84%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "88%": { transform: "translateX(-2.5px) rotate(-1.2deg)" },
          "93%": { transform: "translateX(2.5px) rotate(1.2deg)" },
          "97%": { transform: "translateX(-1px) rotate(-0.4deg)" },
        },
        "flash-burst": {
          "0%": { opacity: "0", transform: "scale(0.2)" },
          "18%": { opacity: "1" },
          "100%": { opacity: "0", transform: "scale(2.6)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "barrel-spin": "barrel-spin 22s linear infinite",
        "reticle-track": "reticle-track 3s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
        "reticle-lock": "reticle-lock 0.9s ease-in-out infinite",
        "flash-burst": "flash-burst 0.9s ease-out forwards",
        "pulse-slow": "pulse-slow 2.4s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "grip-scan": "grip-scan 1.15s ease-in-out infinite",
        "spring-recoil": "spring-recoil 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "jam-shake": "jam-shake 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
