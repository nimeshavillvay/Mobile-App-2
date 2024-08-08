import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { Link } from "expo-router";
import { Text } from "tamagui";

const HomePage = () => {
  return (
    <ScreenLayout edges={["top", "right", "left"]}>
      <ScreenHeader title="Home" barcodeScannerPath="/barcode-scanner" />
      <Text>Home Page</Text>

      <Link href="/category/113">Category page</Link>
    </ScreenLayout>
  );
};

export default HomePage;
