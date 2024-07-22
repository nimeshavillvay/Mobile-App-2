import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { Text } from "tamagui";

const UpdatesPage = () => {
  return (
    <ScreenLayout>
      <ScreenHeader title="Home" />
      <Text>Updates Page</Text>
    </ScreenLayout>
  );
};

export default UpdatesPage;
