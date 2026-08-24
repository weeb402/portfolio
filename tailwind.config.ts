import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#F7F3EA",
          200: "#EFE8D8",
        },
        camel: {
          DEFAULT: "#C5A880",
          dark: "#A88960",
        },
        espresso: {
          700: "#6B5744",
          800: "#4A3B2C",
          900: "#2E241A",
        },
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
