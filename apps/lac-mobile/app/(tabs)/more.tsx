import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { Text } from "tamagui";

const MorePage = () => {
  return (
    <ScreenLayout edges={["top", "right", "left"]}>
      <ScreenHeader title="Home" />
      <Text>More Page</Text>
    </ScreenLayout>
  );
};

export default MorePage;
