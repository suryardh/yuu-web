import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
        },
        night: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#64748b",
          500: "#475569",
          600: "#334155",
          700: "#1e293b",
          800: "#0f172a",
          900: "#020617",
          950: "#0a0f1d",
        },
        city: {
          light: "#64748b",
          dark: "#1e293b",
        },
        glow: {
          amber: "#fbbf24",
          gold: "#f59e0b",
        },
      },
      animation: {
        "city-glow": "glow 2s ease-in-out infinite alternate",
        "window-flicker": "flicker 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { opacity: "0.6" },
          "100%": { opacity: "1" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
