import react18Plugin from "esbuild-plugin-react18";
import { globSync } from "glob";
import { defineConfig, Options } from "tsup";

// To get rid of the `Error [ERR_WORKER_OUT_OF_MEMORY]: Worker terminated due to reaching memory limit: JS heap out of memory`
// error, putting `NODE_OPTIONS='--max-old-space-size=16384'` seems to work
// https://github.com/egoist/tsup/issues/920#issuecomment-1791496481

const baseConfig: Options = {
  format: ["esm"],
  external: [
    "react",
    "react-dom",
    "next",
    "tailwind-merge",
    "clsx",
    "embla-carousel-react",
    "cva",
    /^@radix-ui\/react-/g,
  ],
  esbuildPlugins: [react18Plugin()],
};

// Get paths of all icon components
const iconComponents = globSync("src/components/icons/**/*/index.ts");

export default defineConfig([
  ...iconComponents.map((iconPath) => ({
    ...baseConfig,
    entry: [iconPath],
    outDir: iconPath.replace("src/components", "dist").replace("/index.ts", ""),
    dts: {
      only: true,
    },
  })),
]);
