import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/web-ui/src/**/*.{ts,tsx}",
    "!../../packages/web-ui/src/**/*.stories.{ts,tsx}",
  ],
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
      animation: {
        marquee: "marquee 20s linear infinite",
        marquee2: "marquee2 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  presets: [require("@repo/tailwindcss-config")],
  plugins: [],
};
export default config;
