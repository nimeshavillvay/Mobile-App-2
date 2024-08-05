import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { Text } from "tamagui";

const ShopPage = () => {
  return (
    <ScreenLayout edges={["top", "right", "left"]}>
      <ScreenHeader title="Home" barcodeScannerPath="/barcode-scanner" />
      <Text>Shop Page</Text>
    </ScreenLayout>
  );
};

export default ShopPage;
