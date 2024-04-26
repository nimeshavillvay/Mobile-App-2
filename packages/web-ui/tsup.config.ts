import react18Plugin from "esbuild-plugin-react18";
import { defineConfig, Options } from "tsup";

// To get rid of the `Error [ERR_WORKER_OUT_OF_MEMORY]: Worker terminated due to reaching memory limit: JS heap out of memory`
// error, putting `NODE_OPTIONS='--max-old-space-size=16384'` seems to work
// https://github.com/egoist/tsup/issues/920#issuecomment-1791496481

const baseConfig: Options = {
  dts: true,
  clean: true,
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
    "downshift",
  ],
  esbuildPlugins: [react18Plugin()],
};

export default defineConfig([
  { ...baseConfig, entry: ["src/styles.css"] },
  {
    ...baseConfig,
    entry: ["src/components/icons/**/*/index.ts"],
    outDir: "dist/components/icons",
  },
  {
    ...baseConfig,
    entry: ["src/components/logos/**/*/index.ts"],
    outDir: "dist/components/logos",
  },
  {
    ...baseConfig,
    entry: ["src/components/ui/**/*/index.ts"],
    outDir: "dist/components/ui",
  },
  {
    ...baseConfig,
    entry: ["src/components/*/index.ts"],
    outDir: "dist/components",
  },
]);
