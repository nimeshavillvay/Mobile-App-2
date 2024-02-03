import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#cc0000",
          secondary: "#00adef",
          tertiary: "#c3cf23",
          success: "#55a213",
          "very-light-gray": "#f7f7f7",
          "light-gray": "#dedede",
          gray: "#bdbdbd",
          "dark-gray": "#959595",
          "very-dark-gray": "#605d5c",
        },
      },
      maxWidth: {
        desktop: "1120px",
      },
      fontFamily: {
        arial: ["Arial", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [forms],
};

export default config;
