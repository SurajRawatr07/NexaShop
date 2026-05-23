import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        flipkart: {
          blue: "#2874f0",
          "blue-dark": "#1a5fc8",
          orange: "#fb641b",
          yellow: "#ffe500",
        },
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#2874f0",
          600: "#1a5fc8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#1e3161",
        },
        surface: {
          light: "#ffffff",
          gray: "#f5f5f5",
          border: "#e0e0e0",
        },
        dark: {
          900: "#0a0a0a",
          800: "#121212",
          700: "#1a1a1a",
          600: "#1e1e1e",
          500: "#2a2a2a",
          400: "#333333",
          300: "#404040",
        },
        success: "#26a541",
        warning: "#ff9f00",
        error: "#ff6161",
      },
      animation: {
        "slide-down": "slideDown 0.25s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-slow": "pulse 2.5s ease-in-out infinite",
        "shimmer": "shimmer 1.8s linear infinite",
        "bounce-sm": "bounceSm 1s ease-in-out infinite",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        bounceSm: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
      },
      screens: {
        xs: "375px",
        "2xl": "1400px",
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.08)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.12)",
        nav: "0 2px 8px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
