import { defineConfig } from "tsup";

export default defineConfig({
  // The file we created above that will be the entrypoint to the library.
  entry: ["src/styles.css", "src/components/**/*/index.ts"],
  // Enable TypeScript type definitions to be generated in the output.
  // This provides type-definitions to consumers.
  dts: true,
  // Clean the `dist` directory before building.
  // This is useful to ensure the output is only the latest.
  clean: true,
  format: ["esm", "cjs"],
  skipNodeModulesBundle: true,
  treeshake: true,
});