import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "ui-",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        red: {
          650: "#BB271A",
        },
        wurth: {
          gray: {
            150: "#E8E9ED",
            400: "#9FA1A6",
            800: "#2A2C2E",
          },
        },
      },
    },
  },
  plugins: [],
  presets: [require("@repo/tailwindcss-config")],
};

export default config;
