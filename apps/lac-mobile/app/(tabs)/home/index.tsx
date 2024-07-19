import { Text, View } from "tamagui";
import AppTab from "../../components/base/app-tab";

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
