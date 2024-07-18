import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/components/**/*/index.ts"],
  clean: true,
  format: "esm",
  dts: true,
  splitting: true,
  treeshake: true,
  external: [
    "react",
    "react-native",
    "expo-image",
    "tamagui",
    "@tamagui/lucide-icons",
  ],
});
