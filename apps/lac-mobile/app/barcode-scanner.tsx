import {
  BarcodeScannerCameraView,
  BarcodeScannerHeader,
  BarcodeScannerInstructions,
  BarcodeScannerLoadingWrapper,
  BarcodeScannerNoPermission,
  BarcodeScannerRoot,
  BarcodeScannerScanArea,
} from "@repo/native-ui/components/barcode-scanner";
import { router } from "expo-router";
import { useState, type ComponentProps } from "react";
import { View } from "react-native";

const BarcodeScanner = () => {
  const [enableTorch, setEnableTorch] = useState(false);

  const onBarcodeScanned: ComponentProps<
    typeof BarcodeScannerCameraView
  >["onBarcodeScanned"] = (scanningResult) => {
    const searchParams = new URLSearchParams({
      query: scanningResult.data,
    });

    router.push(`/barcode-scanner?${searchParams.toString()}`);
  };

  return (
    <BarcodeScannerRoot>
      <BarcodeScannerLoadingWrapper>
        <View />
      </BarcodeScannerLoadingWrapper>

      <BarcodeScannerNoPermission />

      <BarcodeScannerCameraView
        enableTorch={enableTorch}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code93", "code128"],
        }}
        onBarcodeScanned={onBarcodeScanned}
      >
        <BarcodeScannerHeader
          onClosePress={router.back}
          toggleEnableTorch={setEnableTorch}
        />

        <BarcodeScannerInstructions />

        <BarcodeScannerScanArea />
      </BarcodeScannerCameraView>
    </BarcodeScannerRoot>
  );
};

export default BarcodeScanner;
