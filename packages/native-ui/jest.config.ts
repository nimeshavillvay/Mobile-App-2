import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|moti))",
  ],
  testPathIgnorePatterns: ["dist"],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts",
    "<rootDir>/../../node_modules/react-native-gesture-handler/jestSetup.js", // https://docs.swmansion.com/react-native-gesture-handler/docs/guides/testing/
  ],
};

export default config;
