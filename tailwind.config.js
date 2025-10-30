import tailwindcssMotion from "tailwindcss-motion";
import { heroui } from "@heroui/react";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    corePlugins: {
      preflight: true,
      container: true,
    },
    extend: {
      colors: {
        // Evergreen + Sky Brand Palette
        brand: {
          900: "#0B3B2E",
          700: "#166534",
          600: "#15803D",
          500: "#22C55E",
          400: "#4ADE80",
          300: "#86EFAC",
          200: "#BBF7D0",
          100: "#DCFCE7",
          50: "#F0FDF4",
        },
        accent: {
          500: "#0EA5E9",
          400: "#38BDF8",
          300: "#7DD3FC",
          200: "#BAE6FD",
          100: "#E0F2FE",
        },
        neutral: {
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
          600: "#475569",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
          50: "#F8FAFC",
        },
        // Legacy color mappings (for gradual migration)
        primary: "var(--primary-color, #166534)",
        secondary: "var(--bg-secondary, #64748B)",
        background: "var(--bg-color, #F8FAFC)",
        text: "var(--text-color, #0F172A)",
        main: "var(--bg-main, #FFFFFF)",
        tbase: "var(--text-secondary, #64748B)",
        input: "var(--bg-input, #FFFFFF)",
        btn: "var(--bg-btn, #166534)",
        tertiary: "var(--bg-tertiary, #F1F5F9)",
      },
      fontFamily: {
        sans: ['"Bai Jamjuree"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        custom: "12px",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      backgroundImage: {
        "dark-bg": "url(./assets/bgdark.svg)",
        "light-bg": "url(./assets/lightbg.svg)",
        "dark-logo": "url(./assets/xNeon.svg)",
        "light-logo": "url(./assets/logodark.png)",
        "x-logo": "url(./assets/logoX.svg)",
      },
      borderColor: {
        DEFAULT: "var(--border)", // Default border color
      },
      borderWidth: {
        DEFAULT: "1px", // Default border width
      },
      dropShadow: {
        DEFAULT: "1px 1px 7px rgba(148, 148, 148, 25%)",
        // md: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        // lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
      },
      boxShadow: {
        custom: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      logo: "var(--logo-url)",
    },
    transitionProperty: {
      width: "width",
      height: "height",
      spacing: "margin, padding",
      background: "background-color",
      border: "border-color",
      shadow: "box-shadow",
    },
    transitionDuration: {
      default: "300ms",
      fast: "150ms",
      slow: "500ms",
    },
    transitionTimingFunction: {
      default: "ease-in-out",
      linear: "linear",
      "ease-in": "ease-in",
      "ease-out": "ease-out",
      "ease-in-out": "ease-in-out",
    },
    transitionDelay: {
      default: "0ms",
      short: "100ms",
      long: "500ms",
    },
  },
  plugins: [
    tailwindcssMotion,
    heroui(),
    function ({ addUtilities, theme }) {
      addUtilities({
        ".x-logo": {
          backgroundImage: theme("logo"),
        },
      });
    },
  ],
};
