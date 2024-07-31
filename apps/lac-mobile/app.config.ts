import type { ExpoConfig } from "expo/config";
import "ts-node/register"; // Add this to import TypeScript files

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

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
    [
      "@sentry/react-native/expo",
      {
        organization: "villvay-py",
        project: "react-native",
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
