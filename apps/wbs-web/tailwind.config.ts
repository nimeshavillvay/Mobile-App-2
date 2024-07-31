import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/web-ui/src/**/*.{ts,tsx}",
    "!../../packages/web-ui/src/**/*.stories.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  presets: [require("@repo/tailwindcss-config")],
  plugins: [],
};
export default config;
