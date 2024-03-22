import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

// Workaround for custom config in the common Tailwind CSS config
// not being picked up in the `web-ui` package Storybook
const config: Omit<Config, "content"> = {
  corePlugins: {
    container: false,
  },
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
            50: "#F7F8FA",
            150: "#E8E9ED",
            250: "#DEDEDE",
            400: "#9FA1A6",
            500: "#74767B",
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
    require("@tailwindcss/container-queries"),
    plugin(({ addComponents }) => {
      addComponents({
        ".container": {
          maxWidth: "100%",
          marginRight: "auto",
          marginLeft: "auto",
          paddingRight: "1rem",
          paddingLeft: "1rem",
          "@screen xs": {
            paddingRight: "2rem",
            paddingLeft: "2rem",
          },
          "@media (min-width: 1920px)": {
            maxWidth: "1920px",
          },
        },
      });
    }),
  ],
};

export default config;
