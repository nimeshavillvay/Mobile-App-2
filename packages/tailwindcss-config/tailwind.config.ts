import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        title: [
          ["var(--font-title)", ...defaultTheme.fontFamily.sans],
          { fontFeatureSettings: "'ss01' on" },
        ],
        body: [
          ["var(--font-body)", ...defaultTheme.fontFamily.sans],
          {
            fontFeatureSettings: "'ss04' on, 'ss03' on, 'ss07' on, 'ss02' on",
          },
        ],
      },
      colors: {
        wurth: {
          red: {
            650: "#CC0000",
          },
          gray: {
            150: "#E8E9ED",
            250: "#DEDEDE",
            400: "#9FA1A6",
            800: "#2A2C2E",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
