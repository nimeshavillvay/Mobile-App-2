import { SEARCH_API_BASE_URL } from "@/lib/constants";
import {
  BarcodeScannerCameraView,
  BarcodeScannerHeader,
  BarcodeScannerInstructions,
  BarcodeScannerLoadingWrapper,
  BarcodeScannerNoPermission,
  BarcodeScannerRoot,
  BarcodeScannerScanArea,
} from "@repo/native-ui/components/barcode-scanner";
import useBarcodeSearchMutation from "@repo/shared-logic/apis/hooks/search/use-barcode-search-mutation.hook";
import type { ComponentProps } from "react";
import { useState } from "react";
import { View } from "tamagui";

const BarcodeScanner = () => {
  const [enableTorch, setEnableTorch] = useState(false);

  const barcodeSearchMutation = useBarcodeSearchMutation({
    baseUrl: SEARCH_API_BASE_URL,
  });

  const onBarcodeScanned: ComponentProps<
    typeof BarcodeScannerCameraView
  >["onBarcodeScanned"] = (scanningResult) => {
    if (!barcodeSearchMutation.isPending) {
      barcodeSearchMutation.mutate(scanningResult.data);
    }
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
          barcodeTypes: ["qr", "code128"],
        }}
        onBarcodeScanned={onBarcodeScanned}
      >
        <BarcodeScannerHeader toggleEnableTorch={setEnableTorch} />

        <BarcodeScannerInstructions />

        <BarcodeScannerScanArea />
      </BarcodeScannerCameraView>
    </BarcodeScannerRoot>
  );
};

export default BarcodeScanner;
