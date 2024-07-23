import type { Config } from "jest";
import path from "path";

const config: Config = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|ky))",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "@repo/native-ui/components/(.*)": path.resolve(
      __dirname,
      "../../packages/native-ui/src/components/$1/index.ts",
    ),
    "@repo/shared-logic/apis/(.*)": path.resolve(
      __dirname,
      "../../packages/shared-logic/src/apis/$1.ts",
    ),
  },
};

export default config;
