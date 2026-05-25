/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cog: {
          bg:           "#060B1A",
          navy:         "#0B1120",
          card:         "#0D1628",
          border:       "rgba(0,229,255,0.12)",
          cyan:         "#00E5FF",
          "cyan-dim":   "#0891b2",
          purple:       "#7c3aed",
          "purple-dark":"#1e0a3c",
          text:         "#e2e8f0",
          muted:        "#94a3b8",
          // Stained-glass jewel tones
          sapphire:     "#1E5CAA",
          amethyst:     "#6B3FA0",
          jade:         "#1A8C72",
          amber:        "#B87820",
          ruby:         "#A01A4A",
          lead:         "#0D0814",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body:    ["'Inter'", "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "float":        "float 6s ease-in-out infinite",
        "pulse-glow":   "pulse-glow 2s ease-in-out infinite",
        "neural-pulse": "neural-pulse 3s ease-out infinite",
        "fade-up":      "fade-up 0.7s ease forwards",
        "data-scroll":  "data-scroll 20s linear infinite",
        "rose-spin":    "rose-spin 140s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 8px rgba(0,229,255,0.4), 0 0 20px rgba(0,229,255,0.2)" },
          "50%":     { boxShadow: "0 0 16px rgba(0,229,255,0.8), 0 0 40px rgba(0,229,255,0.4)" },
        },
        "neural-pulse": {
          "0%":   { r: "4", opacity: "1" },
          "100%": { r: "40", opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "data-scroll": {
          from: { transform: "translateY(0)" },
          to:   { transform: "translateY(-50%)" },
        },
        "rose-spin": {
          from: { transform: "translateY(-50%) rotate(0deg)" },
          to:   { transform: "translateY(-50%) rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
