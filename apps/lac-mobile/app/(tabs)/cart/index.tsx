import { AppTab } from "@repo/native-ui/components/base/app-tab";
import { Text, View } from "tamagui";

const CartPage = () => {
  return (
    <AppTab title="Home">
      <View
        flex={1}
        backgroundColor="white"
        alignItems="center"
        justifyContent="center"
      >
        <Text>Cart Page</Text>
      </View>
    </AppTab>
  );
};

export default CartPage;
