import { server } from "@/mocks/server";
import "@shopify/flash-list/jestSetup";
import "@testing-library/react-native/extend-expect";

// establish API mocking before all tests
beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => {
  server.resetHandlers();
});
// clean up once the tests are done
afterAll(() => {
  server.close();
});

// https://github.com/expo/expo/issues/28831#issuecomment-2197253145
jest.mock("expo-image", () => {
  const actualExpoImage = jest.requireActual("expo-image");
  const { Image } = jest.requireActual("react-native");

  return { ...actualExpoImage, Image };
});
