import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./config/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      background: "rgb(var(--site-background) / <alpha-value>)", page: "rgb(var(--site-background) / <alpha-value>)", foreground: "#0f172a", primary: "rgb(var(--site-primary) / <alpha-value>)", accent: "rgb(var(--site-accent) / <alpha-value>)",
      amber: { 50: "rgb(var(--site-accent) / 0.11)", 400: "rgb(var(--site-accent) / <alpha-value>)", 500: "rgb(var(--site-accent) / <alpha-value>)", 600: "rgb(var(--site-accent) / <alpha-value>)", 700: "rgb(var(--site-accent) / <alpha-value>)" },
      slate: { 800: "rgb(var(--site-primary) / 0.9)", 900: "rgb(var(--site-primary) / <alpha-value>)", 950: "rgb(var(--site-primary) / <alpha-value>)" }
    },
    fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] },
    boxShadow: { soft: "0 16px 50px rgba(15,23,42,.08)" }
  } },
  plugins: [require("tailwindcss-animate")]
};
export default config;
