import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { Text } from "tamagui";

const HomePage = () => {
  return (
    <ScreenLayout edges={["top", "right", "left"]}>
      <ScreenHeader title="Home" />
      <Text>Home Page</Text>

      <Text>
        EXPO_PUBLIC_WURTH_LAC_API: {process.env.EXPO_PUBLIC_WURTH_LAC_API}
      </Text>
      <Text>
        EXPO_PUBLIC_WURTH_LAC_API_KEY:{" "}
        {process.env.EXPO_PUBLIC_WURTH_LAC_API_KEY}
      </Text>
      <Text>
        EXPO_PUBLIC_WURTH_LAC_SEARCH_API:{" "}
        {process.env.EXPO_PUBLIC_WURTH_LAC_SEARCH_API}
      </Text>
    </ScreenLayout>
  );
};

export default HomePage;
