import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cream: {
          50: "#FFFDF9",
          100: "#FAF7F2",
          200: "#F5F0E8",
          300: "#EBE4D8",
        },
        terracotta: {
          50: "#FBF1EE",
          100: "#F5DDD6",
          200: "#EBBCAD",
          300: "#D9937F",
          400: "#C4705A",
          500: "#B35A43",
          600: "#9A4736",
          700: "#7D3A2D",
          800: "#5E2C22",
          900: "#3F1D17",
        },
        warm: {
          gray: {
            100: "#F0ECE7",
            200: "#DDD7CE",
            300: "#C4BDB3",
            400: "#A69E94",
            500: "#8A7E76",
            600: "#6E6259",
            700: "#524A42",
            800: "#36322D",
            900: "#1A1412",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
        "accordion-down": "accordionDown 0.2s ease-out",
        "accordion-up": "accordionUp 0.15s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" },
        },
        accordionDown: {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--accordion-panel-height)", opacity: "1" },
        },
        accordionUp: {
          from: { height: "var(--accordion-panel-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
      },
    },
  },
  plugins: [
    // Bridge plugin: registers Tailwind v4 data-attribute shorthand variants for v3
    plugin(function ({ addVariant, matchVariant }) {
      // Simple boolean data-attribute variants (data-open: → &[data-open])
      const booleanAttrs = [
        "horizontal", "vertical", "open", "closed", "active",
        "disabled", "placeholder", "inset", "popup-open", "checked",
        "ending-style", "starting-style",
      ];
      for (const attr of booleanAttrs) {
        addVariant(`data-${attr}`, `&[data-${attr}]`);
        // group-data-* variants
        addVariant(`group-data-${attr}`, `:merge(.group)[data-${attr}] &`);
      }

      // group-data-horizontal/tabs and similar named-group patterns
      addVariant("group-data-horizontal/tabs", `:merge(.group\\/tabs)[data-horizontal] &`);
      addVariant("group-data-vertical/tabs", `:merge(.group\\/tabs)[data-vertical] &`);
      addVariant("group-data-horizontal/tabs-list", `:merge(.group\\/tabs-list)[data-horizontal] &`);
      addVariant("group-data-vertical/tabs-list", `:merge(.group\\/tabs-list)[data-vertical] &`);

      // not-last: variant (v4 shorthand for last:hidden or &:not(:last-child))
      addVariant("not-last", "&:not(:last-child)");
    }),
    // tw-animate-css compatibility
    require("tailwindcss-animate"),
  ],
};
export default config;

