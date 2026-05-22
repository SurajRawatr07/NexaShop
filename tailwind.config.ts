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
        sans: ["Outfit", "Inter", "sans-serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f5f0ff",
          100: "#ede0ff",
          200: "#d9c0ff",
          300: "#c09eff",
          400: "#a472ff",
          500: "#8b45ff",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        neon: {
          purple: "#a855f7",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          pink: "#ec4899",
          green: "#22c55e",
        },
        dark: {
          900: "#050508",
          800: "#0a0a0f",
          700: "#0f0f1a",
          600: "#14141f",
          500: "#1a1a2e",
          400: "#1e1e35",
          300: "#252540",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "aurora": "linear-gradient(135deg, #0a0a0f 0%, #150e2e 30%, #1a0a3e 60%, #0a1628 100%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "aurora": "aurora 8s ease-in-out infinite",
        "gradient": "gradient 6s ease infinite",
        "particle": "particle 15s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(139, 69, 255, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(139, 69, 255, 0.8), 0 0 80px rgba(139, 69, 255, 0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        aurora: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        particle: {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) rotate(720deg)", opacity: "0" },
        },
      },
      screens: {
        xs: "375px",
        "2xl": "1400px",
        "3xl": "1600px",
        "4xl": "1920px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
