import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { Text } from "tamagui";

const UpdatesPage = () => {
  return (
    <ScreenLayout edges={["top", "right", "left"]}>
      <ScreenHeader title="Home" barcodeScannerPath="/barcode-scanner" />
      <Text>Updates Page</Text>
    </ScreenLayout>
  );
};

export default UpdatesPage;
