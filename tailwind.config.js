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
        // Financial Semantic Colors (Phase 6)
        success: {
          50: "#F0FDF4",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        info: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0284C7",
          600: "#0369A1",
          700: "#0C4A6E",
          800: "#082F49",
          900: "#0C2D48",
        },
        // Ecology Colors (Phase 6)
        eco: {
          forest: "#134E4A",
          leaf: "#059669",
          water: "#06B6D4",
          earth: "#B45309",
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
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        accent: ['"Bai Jamjuree"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        // Display Level (Page Titles)
        "display-lg": ["3.5rem", { lineHeight: "1.125", fontWeight: "700" }],
        "display-md": ["3rem", { lineHeight: "1.125", fontWeight: "700" }],
        "display-sm": ["2.25rem", { lineHeight: "1.125", fontWeight: "700" }],

        // Headline Level (Section Titles)
        "headline-lg": ["2rem", { lineHeight: "1.25", fontWeight: "600" }],
        "headline-md": ["1.75rem", { lineHeight: "1.25", fontWeight: "600" }],
        "headline-sm": ["1.5rem", { lineHeight: "1.25", fontWeight: "600" }],

        // Title Level (Component Headers)
        "title-lg": ["1.25rem", { lineHeight: "1.5", fontWeight: "600" }],
        "title-md": ["1.125rem", { lineHeight: "1.5", fontWeight: "600" }],
        "title-sm": ["1rem", { lineHeight: "1.5", fontWeight: "600" }],

        // Body Level (Main Content)
        "body-lg": ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-md": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],

        // Label Level (UI Labels)
        "label-lg": ["0.875rem", { lineHeight: "1.25", fontWeight: "500" }],
        "label-md": ["0.75rem", { lineHeight: "1.25", fontWeight: "500" }],
        "label-sm": ["0.625rem", { lineHeight: "1.25", fontWeight: "500" }],

        // Legacy sizes (maintained for compatibility)
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

        // ==================================================================
        // GLASSMORPHISM UTILITIES
        // ==================================================================
        ".glass": {
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        },
        ".glass-dark": {
          background: "rgba(15, 23, 42, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".glass-heavy": {
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        },
        ".glass-subtle": {
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },

        // ==================================================================
        // FINANCIAL STATUS UTILITIES
        // ==================================================================
        ".status-profit": {
          color: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
        },
        ".status-loss": {
          color: "#EF4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
        },
        ".status-neutral": {
          color: "#64748B",
          backgroundColor: "rgba(100, 116, 139, 0.1)",
        },

        // ==================================================================
        // GRADIENT UTILITIES
        // ==================================================================
        ".gradient-eco": {
          background: "linear-gradient(135deg, #059669 0%, #134E4A 100%)",
        },
        ".gradient-eco-subtle": {
          background:
            "linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(19, 78, 74, 0.1) 100%)",
        },
        ".gradient-finance": {
          background: "linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)",
        },
        ".gradient-finance-subtle": {
          background:
            "linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(3, 105, 161, 0.1) 100%)",
        },
        ".gradient-brand": {
          background: "linear-gradient(135deg, #166534 0%, #15803D 100%)",
        },
        ".gradient-brand-hero": {
          background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 50%, #E0F2FE 100%)",
        },

        // ==================================================================
        // PREMIUM SHADOWS
        // ==================================================================
        ".shadow-glow-brand": {
          boxShadow: "0 0 20px rgba(22, 101, 52, 0.3)",
        },
        ".shadow-glow-accent": {
          boxShadow: "0 0 20px rgba(14, 165, 233, 0.3)",
        },
        ".shadow-glow-success": {
          boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
        },
        ".shadow-glow-error": {
          boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
        },
      });
    },
  ],
};
