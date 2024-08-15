import DropShipItemNotice from "@/components/notices/drop-ship-item-notice";
import RegionallyExclusiveItemNotice from "@/components/notices/regionally-exclusive-item-notice";
import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import useRemoveCartItemMutation from "@repo/shared-logic/apis/hooks/cart/use-remove-cart-item-mutation.hook";
import { Trash, X } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  AlertDialog,
  Button,
  H3,
  Paragraph,
  Text,
  Unspaced,
  XStack,
  YStack,
} from "tamagui";

type CartItemProps = {
  readonly cartItemId: number;
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
};

const CartItem = ({
  cartItemId,
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
}: CartItemProps) => {
  const token = useSessionTokenStorage((state) => state.token);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const removeCartItemMutation = useRemoveCartItemMutation({
    baseUrl: API_BASE_URL,
    apiKey: API_KEY,
    token,
  });

  const removeItem = () => {
    removeCartItemMutation.mutate([cartItemId]);
  };

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={(progress, dragX) => {
        const scale = dragX.interpolate({
          inputRange: [-100, -50, 0],
          outputRange: [2, 1, 0],
          extrapolate: "clamp",
        });

        return (
          <AlertDialog
            open={openRemoveDialog}
            onOpenChange={setOpenRemoveDialog}
          >
            <AlertDialog.Trigger asChild>
              <RectButton style={styles.rightAction}>
                <Animated.View
                  style={[
                    { flex: 1, justifyContent: "center" },
                    {
                      transform: [{ scale }],
                    },
                  ]}
                >
                  <Trash color="white" size={16} />
                </Animated.View>
              </RectButton>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
              <AlertDialog.Overlay
                key="overlay"
                animation="quick"
                opacity={0.5}
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
              <AlertDialog.Content
                bordered
                elevate
                key="content"
                animation={[
                  "quick",
                  {
                    opacity: {
                      overshootClamping: true,
                    },
                  },
                ]}
                enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                x={0}
                scale={1}
                opacity={1}
                y={0}
              >
                <YStack gap={24}>
                  <AlertDialog.Title
                    color="#171717"
                    fontSize={20}
                    lineHeight={24}
                    fontWeight={700}
                  >
                    Clear Cart
                  </AlertDialog.Title>

                  <AlertDialog.Description
                    color="#171717"
                    fontSize={13}
                    lineHeight={13}
                  >
                    Are you sure you want to clear your cart?
                  </AlertDialog.Description>

                  <XStack gap="$3" justifyContent="flex-end">
                    <AlertDialog.Action asChild onPress={removeItem}>
                      <Button style={styles.confirmButton}>Confirm</Button>
                    </AlertDialog.Action>
                  </XStack>

                  <Unspaced>
                    <AlertDialog.Cancel asChild>
                      <Button
                        position="absolute"
                        top="$0"
                        right="$0"
                        size="$2"
                        circular
                        icon={X}
                      />
                    </AlertDialog.Cancel>
                  </Unspaced>
                </YStack>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog>
        );
      }}
    >
      <XStack style={styles.container}>
        <Image source={image} style={styles.image} />

        <YStack flex={1} gap={4} paddingVertical={4}>
          <XStack gap={8}>
            <YStack flex={1}>
              <H3 style={styles.title} numberOfLines={3}>
                {title}
              </H3>

              <Paragraph style={styles.sku}>Item # {sku}</Paragraph>
            </YStack>

            <Button>Edit</Button>
          </XStack>

          <XStack justifyContent="space-between" alignItems="center" gap={12}>
            <YStack paddingVertical={5} gap={4}>
              <Text style={styles.price}>${price.toFixed(2)}</Text>

              <Text style={styles.uom}>
                {quantity} {uom}
              </Text>
            </YStack>

            <YStack gap={10}>
              {isVendorShipped ? (
                <DropShipItemNotice />
              ) : isExcluded ? (
                <RegionallyExclusiveItemNotice />
              ) : (
                <>
                  {pickupQuantity > 0 && (
                    <Text style={styles.availabilityText}>
                      Pickup{" "}
                      <Text style={{ color: "#236E4A" }}>
                        {pickupQuantity} items
                      </Text>
                    </Text>
                  )}

                  {backOrderedQuantity > 0 && (
                    <Text style={styles.availabilityText}>
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

export default CartItem;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: "flex-start",
    padding: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.07)",
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
  rightAction: {
    backgroundColor: "#AA2429",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  confirmButton: {
    fontSize: 16,
    color: "#EDEDED",
    borderRadius: 9,
    backgroundColor: "#282828",
  },
});
