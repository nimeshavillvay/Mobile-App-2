import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/apis/**/*.ts", "src/lib/zod-schema/**/*.ts"],
  clean: true,
  format: "esm",
  dts: true,
  splitting: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "next",
    "client-only",
    "server-only",
    "ky",
    "@tanstack/react-query",
    "zod",
  ],
});
