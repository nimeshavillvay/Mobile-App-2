import type { ShippingAddress } from "@repo/shared-logic/apis/base/account/get-shipping-addresses";
import { FlashList, type FlashListProps } from "@shopify/flash-list";
import { ChevronRight, MapPin, Phone } from "@tamagui/lucide-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { H3, Text, XStack, YStack } from "tamagui";

const styles = StyleSheet.create({
  detailsLine: {
    color: "#161616",
    fontSize: 14,
  },
  defaultLabel: {
    padding: 7,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.07)",
  },
  defaultText: {
    color: "#161616",
    fontSize: 12,
    lineHeight: 12,
  },
});

export const ShippingAddressListItem = ({
  item,
}: {
  readonly item: ShippingAddress;
}) => {
  return (
    <Pressable testID="shipping-address-list-item">
      <XStack
        padding={16}
        gap={10}
        alignItems="center"
        borderBottomColor="rgba(0, 0, 0, 0.07)"
        borderBottomWidth={1}
      >
        <YStack gap={13} flex={1}>
          <YStack gap={10} marginLeft={24}>
            <XStack alignItems="center" gap={4}>
              <H3
                color="#161616"
                fontSize={16}
                fontWeight={700}
                testID="shipping-address-list-item-organization-name"
              >
                {item.organization}
              </H3>

              {!!item.default && (
                <View
                  style={styles.defaultLabel}
                  testID="shipping-address-list-item-default-label"
                >
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </XStack>

            <Text
              color="#161616"
              fontSize={14}
              testID="shipping-address-list-item-shipping-no"
            >
              Shipping # {item.shipTo}
            </Text>
          </YStack>

          <View>
            <XStack paddingVertical={10} gap={7}>
              <MapPin
                size={16}
                color="#171717"
                testID="shipping-address-list-item-map-icon"
              />

              <YStack gap={4}>
                <Text
                  style={styles.detailsLine}
                  testID="shipping-address-list-item-address-line-1"
                >
                  {item.streetAddress}, {item.region}
                </Text>

                <Text
                  style={styles.detailsLine}
                  testID="shipping-address-list-item-address-line-2"
                >
                  {item.county}, {item.postalCode}
                  {!!item.zip4 && `-${item.zip4}`}, {item.countryName}
                </Text>
              </YStack>
            </XStack>

            <XStack paddingVertical={10} gap={7}>
              <Phone
                size={16}
                color="#171717"
                testID="shipping-address-list-item-phone-icon"
              />

              <Text
                style={styles.detailsLine}
                testID="shipping-address-list-item-phone-no"
              >
                {item.phoneNumber}
              </Text>
            </XStack>
          </View>
        </YStack>

        <ChevronRight size={20} color="#000000" opacity={0.439} />
      </XStack>
    </Pressable>
  );
};

export const ShippingAddressesList = ({
  estimatedItemSize = 203,
  renderItem = ({ item }) => <ShippingAddressListItem item={item} />,
  ...delegated
}: Omit<FlashListProps<ShippingAddress>, "keyExtractor" | "renderItem"> &
  Partial<Pick<FlashListProps<ShippingAddress>, "renderItem">>) => {
  return (
    <FlashList
      estimatedItemSize={estimatedItemSize}
      keyExtractor={(address) => address.xcAddressId}
      renderItem={renderItem}
      {...delegated}
    />
  );
};
