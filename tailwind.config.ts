import type { Config } from "tailwindcss";

/**
 * Pineapplix design tokens.
 * Brand colors live here so every component references the same palette:
 *   bg-brand-yellow, text-brand-black, border-ink-800, text-ink-muted, ...
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#F3D432", // primary — pineapple yellow
          black: "#000000", // secondary
        },
        // Supporting neutrals
        ink: {
          900: "#1A1A1A",
          800: "#2B2B2B",
          // #888888 passes WCAG AA only on dark backgrounds — don't use it for
          // body text on light sections (use ink-800 there instead).
          muted: "#888888",
        },
        offwhite: "#FAFAFA",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "trace-flow": {
          to: { strokeDashoffset: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "trace-flow": "trace-flow 6s linear infinite",
        "pulse-dot": "pulse-dot 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
