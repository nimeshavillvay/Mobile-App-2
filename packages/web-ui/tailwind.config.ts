import baseConfig from "@repo/tailwindcss-config/config";
import merge from "lodash/merge";
import type { Config } from "tailwindcss";

const content = ["./src/**/*.{ts,tsx}"];

// Exclude stories from the Tailwind CSS build
// eslint-disable-next-line turbo/no-undeclared-env-vars
if (process.env.TAILWIND_EXCLUDE_STORIES === "true") {
  content.push("!./src/**/*.stories.{ts,tsx}");
}

const config: Config = {
  content,
  prefix: "ui-",
  theme: {
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
    },
  },
  plugins: [],
  presets: [require("@repo/tailwindcss-config")],
};

export default merge(baseConfig, config);
