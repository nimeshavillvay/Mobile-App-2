import { Image } from "expo-image";
import { type ComponentProps } from "react";
import { StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Button, H3, Paragraph, Text, XStack, YStack } from "tamagui";
import { SwipeDeleteAction } from "~/components/base/swipe-delete-action";

export const CartItem = ({
  image,
  title,
  sku,
  price = 0,
  quantity,
  uom,
  pickupQuantity = 0,
  backOrderedQuantity = 0,
  isVendorShipped,
  isExcluded,
  renderRightActions,
  DropShipNotice,
  RegionallyExclusiveNotice,
}: {
  readonly image: string;
  readonly title: string;
  readonly sku: string;
  readonly price?: number;
  readonly quantity: number;
  readonly uom: string;
  readonly pickupQuantity?: number;
  readonly backOrderedQuantity?: number;
  readonly isVendorShipped: boolean;
  readonly isExcluded: boolean;
  readonly renderRightActions: ComponentProps<
    typeof Swipeable
  >["renderRightActions"];
  readonly DropShipNotice: () => JSX.Element;
  readonly RegionallyExclusiveNotice: () => JSX.Element;
}) => {
  return (
    <Swipeable overshootRight={false} renderRightActions={renderRightActions}>
      <XStack style={styles.container}>
        <Image source={image} style={styles.image} />

        <YStack flex={1} gap={4} paddingVertical={4}>
          <XStack gap={8}>
            <YStack flex={1}>
              <H3 style={styles.title} numberOfLines={3}>
                {title}
              </H3>

              <Paragraph style={styles.sku} testID="cart-item-sku">
                Item # {sku}
              </Paragraph>
            </YStack>

            <Button style={styles.editButton}>Edit</Button>
          </XStack>

          <XStack justifyContent="space-between" alignItems="center" gap={12}>
            <YStack paddingVertical={5} gap={4}>
              <Text style={styles.price} testID="cart-item-price">
                ${price.toFixed(2)}
              </Text>

              <Text style={styles.uom} testID="cart-item-quantity-and-uom">
                {quantity} {uom}
              </Text>
            </YStack>

            <YStack gap={10}>
              {isVendorShipped ? (
                <DropShipNotice />
              ) : isExcluded ? (
                <RegionallyExclusiveNotice />
              ) : (
                <>
                  {pickupQuantity > 0 && (
                    <Text
                      style={styles.availabilityText}
                      testID="cart-item-pickup-quantity"
                    >
                      Pickup{" "}
                      <Text style={{ color: "#236E4A" }}>
                        {pickupQuantity} items
                      </Text>
                    </Text>
                  )}

                  {backOrderedQuantity > 0 && (
                    <Text
                      style={styles.availabilityText}
                      testID="cart-item-pickup-backordered"
                    >
                      Backordered{" "}
                      <Text style={{ color: "#AD7F58" }}>
                        {backOrderedQuantity} items
                      </Text>
                    </Text>
                  )}
                </>
              )}
            </YStack>
          </XStack>
        </YStack>
      </XStack>
    </Swipeable>
  );
};

export const CartItemRightSwipeAction = (
  props: Omit<
    ComponentProps<typeof SwipeDeleteAction>,
    "title" | "description"
  >,
) => {
  return (
    <SwipeDeleteAction
      title="Clear Item"
      description="Are you sure you want to clear this item from your cart?"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: "flex-start",
    padding: 16,
    paddingTop: 24,
    backgroundColor: "white",
  },
  image: {
    width: 72,
    height: 72,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#DEDEDE",
  },
  title: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 400,
  },
  sku: {
    fontSize: 14,
    fontWeight: 400,
    color: "#74767B",
  },
  editButton: {
    height: 36,
    paddingHorizontal: 13,
    borderRadius: 7,
    backgroundColor: "#EDEDED",
    color: "#171717",
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 700,
  },
  uom: {
    color: "rgba(0, 0, 0, 0.48)",
    fontSize: 12,
  },
  availabilityText: {
    color: "rgba(0, 0, 0, 0.91)",
    fontSize: 12,
    lineHeight: 12,
    fontWeight: 400,
    textAlign: "right",
  },
  confirmButton: {
    fontSize: 16,
    color: "#EDEDED",
    borderRadius: 9,
    backgroundColor: "#282828",
  },
});
