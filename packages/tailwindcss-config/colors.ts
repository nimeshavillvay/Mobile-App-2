import type {
  RecursiveKeyValuePair,
  ResolvableTo,
} from "tailwindcss/types/config";

// Workaround for custom colors in the common Tailwind CSS config
// not being picked up in the `web-ui` package Storybook
const colors: ResolvableTo<RecursiveKeyValuePair<string, string>> = {
  wurth: {
    red: {
      650: "#CC0000",
    },
    gray: {
      50: "#F7F8FA",
      150: "#E8E9ED",
      250: "#DEDEDE",
      400: "#9FA1A6",
      800: "#2A2C2E",
    },
  },
};

export default colors;
