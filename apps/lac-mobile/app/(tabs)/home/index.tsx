import { AppTab } from "@repo/native-ui/components/base/app-tab";
import { Text, View } from "tamagui";

const HomePage = () => {
  return (
    <AppTab title="Home">
      <View
        flex={1}
        backgroundColor="white"
        alignItems="center"
        justifyContent="center"
      >
        <Text>Home Page</Text>
      </View>
    </AppTab>
  );
};

export default HomePage;
