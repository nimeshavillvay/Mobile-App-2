import CartItem from "@/components/cart-item/cart-item";
import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import useSuspenseCart from "@repo/shared-logic/apis/hooks/cart/use-suspense-cart.hook";
import useSuspensePriceCheck from "@repo/shared-logic/apis/hooks/product/use-suspense-price-check.hook";
import { FlashList } from "@shopify/flash-list";
import { Package, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Suspense } from "react";
import { StyleSheet } from "react-native";
import { Button, H1, Text, View, VisuallyHidden } from "tamagui";

const CartPage = () => {
  return (
    <ScreenLayout>
      <View style={styles.header}>
        <H1 style={styles.title}>Shopping Cart</H1>

        <Button
          icon={<X size={28} />}
          circular
          size={36}
          backgroundColor="white"
          onPress={() => router.back()}
        >
          <VisuallyHidden>
            <Text>Close page</Text>
          </VisuallyHidden>
        </Button>
      </View>

      <View paddingHorizontal={16} paddingTop={16}>
        <Button
          icon={<Package size={16} />}
          borderRadius={9}
          color="#171717"
          fontSize={16}
        >
          Set Delivery Method for All Items
        </Button>
      </View>

      <Suspense>
        <CartItemList />
      </Suspense>
    </ScreenLayout>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
  },
});

const CartItemList = () => {
  const token = useSessionTokenStorage((state) => state.token);

  const cartQuery = useSuspenseCart({
    baseUrl: API_BASE_URL,
    apiKey: API_KEY,
    token,
  });
  const priceCheckQuery = useSuspensePriceCheck(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
      token,
    },
    cartQuery.data.cartItems.map((item) => ({
      productId: item.itemInfo.productId,
      qty: item.quantity,
    })),
  );

  return (
    <FlashList
      data={cartQuery.data.cartItems}
      extraData={priceCheckQuery.data.productPrices}
      keyExtractor={({ itemInfo }) => itemInfo.productId.toString()}
      renderItem={({ item }) => (
        <CartItem
          cartItemId={item.cartItemId}
          image={item.itemInfo.image}
          title={item.itemInfo.productName}
          sku={item.itemInfo.productSku}
          price={
            priceCheckQuery.data.productPrices.find(
              (price) => price.productId === item.itemInfo.productId.toString(),
            )?.extendedPrice
          }
          quantity={item.quantity}
          uom={item.itemInfo.unitOfMeasure}
          pickupQuantity={item.mappedConfiguration.availability.reduce(
            (accumulator, currentValue) =>
              (currentValue.quantity ?? 0) + accumulator,
            0,
          )}
          backOrderedQuantity={item.mappedConfiguration.backOrderQuantity}
          isVendorShipped={item.itemInfo.isDirectlyShippedFromVendor}
          isExcluded={item.itemInfo.isExcludedProduct}
        />
      )}
      estimatedItemSize={180}
    />
  );
};
