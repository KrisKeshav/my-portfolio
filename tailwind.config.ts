import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0C10",
        surface: "#111419",
        surface2: "#161A21",
        border: "#22262E",
        text: "#E6E8EB",
        muted: "#8A93A0",
        faint: "#4A5261",
        amber: "#F0A84E",
        amberDim: "#5C4520",
        cyan: "#4DD8D3",
        violet: "#B98CFF",
      },
      fontFamily: {
        mono: ["var(--font-plex-mono)", "monospace"],
        sans: ["var(--font-plex-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
