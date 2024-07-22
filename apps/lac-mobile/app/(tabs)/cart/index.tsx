import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { Text } from "tamagui";
import { ScreenHeader } from "~/components/base/screen-header";

const CartPage = () => {
  return (
    <ScreenLayout>
      <ScreenHeader title="Home" />
      <Text>Cart Page</Text>
    </ScreenLayout>
  );
};

export default CartPage;
