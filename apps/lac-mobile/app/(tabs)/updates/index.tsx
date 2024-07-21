import { AppTab } from "@repo/native-ui/components/base/app-tab";
import { Text, View } from "tamagui";

const UpdatesPage = () => {
  return (
    <AppTab title="Home">
      <View
        flex={1}
        backgroundColor="white"
        alignItems="center"
        justifyContent="center"
      >
        <Text>Updates Page</Text>
      </View>
    </AppTab>
  );
};

export default UpdatesPage;
