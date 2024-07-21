import { AppTab } from "@repo/native-ui/components/base/app-tab";
import { Text, View } from "tamagui";

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
