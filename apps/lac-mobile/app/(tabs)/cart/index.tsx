import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { Text } from "tamagui";

const CartPage = () => {
  return (
    <ScreenLayout>
      <ScreenHeader title="Home" />
      <Text>Cart Page</Text>
    </ScreenLayout>
  );
};

export default CartPage;
