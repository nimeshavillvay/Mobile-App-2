import type { ExpoConfig } from "expo/config";
import "ts-node/register"; // Add this to import TypeScript files

// Set profile specific environment variables
// https://stackoverflow.com/a/74500506
// The `ENVIRONMENT` variable is set in the `eas.json` file
const profilePrefix = `${process.env.ENVIRONMENT?.toUpperCase()}_`;
Object.entries(process.env)
  .filter(([key]) => key.startsWith(profilePrefix))
  .forEach(([key, value]) => {
    process.env[key.slice(profilePrefix.length)] = value;
  });

const config: ExpoConfig = {
  name: "Wurth LAC",
  slug: "wurth-lac",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
      },
    ],
  ],
  scheme: "wurthlac",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.wurth.lac",
    supportsTablet: true,
  },
  android: {
    package: "com.wurth.lac",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "2ace7afa-d22f-4849-99d6-1a92c08156c5",
    },
  },
};

export default config;
