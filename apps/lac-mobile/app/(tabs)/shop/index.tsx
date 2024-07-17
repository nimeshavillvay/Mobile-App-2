import { Text, View } from "tamagui";
import AppTab from "../../components/base/app-tab";

const ShopPage = () => {
  return (
    <AppTab title="Home">
      <View
        flex={1}
        backgroundColor="white"
        alignItems="center"
        justifyContent="center"
      >
        <Text>Shop Page</Text>
      </View>
    </AppTab>
  );
};

export default ShopPage;
