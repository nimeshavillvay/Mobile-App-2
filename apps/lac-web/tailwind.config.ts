import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  corePlugins: {
    // TODO Revisit this when Tailwind CSS v4 is out
    // Disable preflight to avoid conflicts with the `web-ui` package
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#cc0000",
          secondary: "#00adef",
          tertiary: "#c3cf23",
          success: "#55a213",
          gray: {
            100: "#f7f7f7",
            200: "#dedede",
            300: "#bdbdbd",
            400: "#959595",
            500: "#605d5c",
          },
        },
      },
      maxWidth: {
        desktop: "var(--desktop-width)",
      },
      fontFamily: {
        arial: ["Arial", ...defaultTheme.fontFamily.serif],
        wurth: ["var(--wurth-font)", ...defaultTheme.fontFamily.serif],
      },
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
    },
  },
  presets: [require("@repo/tailwindcss-config")],
  plugins: [],
};

export default config;
