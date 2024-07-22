import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { Text } from "tamagui";

const HomePage = () => {
  return (
    <ScreenLayout>
      <ScreenHeader title="Home" />
      <Text>Home Page</Text>
    </ScreenLayout>
  );
};

export default HomePage;
