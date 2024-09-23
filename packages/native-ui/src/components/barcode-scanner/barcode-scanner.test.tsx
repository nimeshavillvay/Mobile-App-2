import { View } from "tamagui";
import { render, screen } from "~/lib/test-utils";
import {
  BarcodeScannerCameraView,
  BarcodeScannerHeader,
  BarcodeScannerInstructions,
  BarcodeScannerLoadingWrapper,
  BarcodeScannerNoPermission,
  BarcodeScannerRoot,
  BarcodeScannerScanArea,
} from "./barcode-scanner";

jest.mock("expo-camera", () => {
  const actual = jest.requireActual("expo-camera");

  const useCameraPermissions = jest.fn().mockImplementation(() => {
    const requestPermission = () => {
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
    const setEnableTorch = jest.fn();

    render(
      <BarcodeScannerRoot>
        <BarcodeScannerLoadingWrapper>
          <View />
        </BarcodeScannerLoadingWrapper>

        <BarcodeScannerNoPermission />

        <BarcodeScannerCameraView>
          <BarcodeScannerHeader toggleEnableTorch={setEnableTorch} />

          <BarcodeScannerInstructions />

          <BarcodeScannerScanArea />
        </BarcodeScannerCameraView>
      </BarcodeScannerRoot>,
    );

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

  test("it renders the switch on torch button and icon when the torch is enabled", () => {
    const setEnableTorch = jest.fn();

    render(
      <BarcodeScannerRoot>
        <BarcodeScannerLoadingWrapper>
          <View />
        </BarcodeScannerLoadingWrapper>

        <BarcodeScannerNoPermission />

        <BarcodeScannerCameraView enableTorch>
          <BarcodeScannerHeader toggleEnableTorch={setEnableTorch} />

          <BarcodeScannerInstructions />

          <BarcodeScannerScanArea />
        </BarcodeScannerCameraView>
      </BarcodeScannerRoot>,
    );

    expect(screen.getByText("Switch off torch")).toBeOnTheScreen();
    expect(screen.getAllByTestId(/^torch-on-icon-/)).toHaveLength(2);
  });
});
