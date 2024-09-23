import "@shopify/flash-list/jestSetup";
import "@testing-library/react-native/extend-expect";
import { cleanup } from "~/lib/test-utils";

// TODO Remove workaround after upgrading Expo and jest-expo
// Suppress console.error because of this error "Warning: Unexpected ref object provided for ExpoImage. Use either a ref-setter function or React.createRef()."
// https://github.com/expo/expo/issues/28831
beforeEach(() => {
  jest.spyOn(console, "error");
  // @ts-expect-error jest.spyOn adds this functionality
  // eslint-disable-next-line no-console
  console.error.mockImplementation(() => null);
});

// TODO Remove workaround after upgrading Expo and jest-expo
// Suppress console.error because of this error "Warning: Unexpected ref object provided for ExpoImage. Use either a ref-setter function or React.createRef()."
// https://github.com/expo/expo/issues/28831
afterEach(() => {
  // @ts-expect-error jest.spyOn adds this functionality
  // eslint-disable-next-line no-console
  console.error.mockRestore();
});

afterEach(() => {
  cleanup();
});
