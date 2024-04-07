import react18Plugin from "esbuild-plugin-react18";
import { defineConfig } from "tsup";

// To get rid of the `Error [ERR_WORKER_OUT_OF_MEMORY]: Worker terminated due to reaching memory limit: JS heap out of memory`
// error, putting `NODE_OPTIONS='--max-old-space-size=16384'` seems to work
// https://github.com/egoist/tsup/issues/920#issuecomment-1791496481

export default defineConfig({
  // The file we created above that will be the entrypoint to the library.
  entry: ["src/styles.css", "src/components/**/*/index.ts"],
  // Enable TypeScript type definitions to be generated in the output.
  // This provides type-definitions to consumers.
  dts: true,
  // Clean the `dist` directory before building.
  // This is useful to ensure the output is only the latest.
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
  // treeshake: true, // Disabled because "use client" directive gets removed
  // splitting: true, // Disabled because "use client" directive gets removed
  esbuildPlugins: [react18Plugin()],
});
