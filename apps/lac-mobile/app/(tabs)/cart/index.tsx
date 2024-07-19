import { Text, View } from "tamagui";
import AppTab from "../../components/base/app-tab";

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
