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
    },
  },
  presets: [require("@repo/tailwindcss-config")],
  plugins: [],
};
export default config;