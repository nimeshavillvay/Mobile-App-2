import "@shopify/flash-list/jestSetup";
import "@testing-library/react-native/extend-expect";

// https://github.com/expo/expo/issues/28831#issuecomment-2197253145
jest.mock("expo-image", () => {
  const actualExpoImage = jest.requireActual("expo-image");
  const { Image } = jest.requireActual("react-native");

  return { ...actualExpoImage, Image };
});
