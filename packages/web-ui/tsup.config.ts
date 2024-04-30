import react18Plugin from "esbuild-plugin-react18";
import { defineConfig, Options } from "tsup";

// To get rid of the `Error [ERR_WORKER_OUT_OF_MEMORY]: Worker terminated due to reaching memory limit: JS heap out of memory`
// error, putting `NODE_OPTIONS='--max-old-space-size=16384'` seems to work
// https://github.com/egoist/tsup/issues/920#issuecomment-1791496481

const baseConfig: Options = {
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
  ],
  esbuildPlugins: [react18Plugin()],
};

export default defineConfig([
  // Bundle JS together, to make sure code is shared as much as possible
  {
    ...baseConfig,
    entry: [
      "src/components/icons/**/*/index.ts",
      "src/components/logos/**/*/index.ts",
      "src/components/ui/**/*/index.ts",
      "src/components/*/index.ts",
    ],
  },
  // Generate types separately as generating for everything requires too much
  // compute and memory resulting in our developer machines freezing and failing
  // on CI/CD.
  {
    ...baseConfig,
    entry: ["src/components/icons/**/*/index.ts"],
    outDir: "dist/icons",
    dts: {
      only: true,
    },
  },
  {
    ...baseConfig,
    entry: ["src/components/logos/**/*/index.ts"],
    outDir: "dist/logos",
    dts: {
      only: true,
    },
  },
  {
    ...baseConfig,
    entry: ["src/components/ui/**/*/index.ts"],
    outDir: "dist/ui",
    dts: {
      only: true,
    },
  },
  {
    ...baseConfig,
    entry: ["src/components/*/index.ts"],
    outDir: "dist",
    dts: {
      only: true,
    },
  },
]);
