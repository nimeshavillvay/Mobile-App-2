import { Text, View } from "tamagui";
import AppTab from "../../components/base/app-tab";

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
