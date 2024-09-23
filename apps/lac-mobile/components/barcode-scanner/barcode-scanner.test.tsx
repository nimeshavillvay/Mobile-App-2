import { render, screen } from "@/lib/test-utils";
import BarcodeScanner from "./barcode-scanner";

jest.mock("expo-camera", () => {
  const actual = jest.requireActual("expo-camera");

  const useCameraPermissions = jest.fn().mockImplementation(() => {
    const requestPermission = () => {
      console.log("request permission called");
      return Promise.resolve({ status: "granted" });
    };

    const permission = {
      granted: true,
    };

    return [permission, requestPermission];
  });

  return {
    __esModule: true,
    ...actual,
    useCameraPermissions,
  };
});

describe("Barcode Scanner", () => {
  test("it renders all sections of the view when specified and camera permission is given", () => {
    render(<BarcodeScanner />);

    expect(
      screen.getByTestId(/^barcode-scanner-camera-view/),
    ).toBeOnTheScreen();

    // Header elements
    expect(screen.getByText("Close QR/Barcode scanner")).toBeOnTheScreen();
    const headerElement = screen.getByRole("header");
    expect(headerElement).toBeOnTheScreen();
    expect(headerElement).toHaveTextContent("Scan QR or Barcode");
    expect(screen.getByText("Switch on torch")).toBeOnTheScreen();
    expect(screen.getAllByTestId(/^torch-off-icon-/)).toHaveLength(5);

    // Instructions
    expect(
      screen.getByText(
        "Focus the device camera on the QR/Barcode at a distance where it can be fully observed.",
      ),
    ).toBeOnTheScreen();

    // Scan area
    expect(screen.getByText("Scanning...")).toBeOnTheScreen();
  });
});
