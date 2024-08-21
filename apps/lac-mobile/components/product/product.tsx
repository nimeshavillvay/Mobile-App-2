import { QuantityInput } from "@/components/quantity";
import {
  API_BASE_URL,
  API_KEY,
  DEFAULT_PLANT,
  UI_DATE_FORMAT,
} from "@/lib/constants";
import { formatNumberToPrice, isNumber, isString } from "@/lib/utils";
import { Picker } from "@react-native-picker/picker";
import useSuspenseCheckAvailability from "@repo/shared-logic/apis/hooks/product/use-suspense-check-availability.hook";
import { useSuspenseGroupFilters } from "@repo/shared-logic/apis/hooks/product/use-suspense-group-filters.hook";
import useSuspensePriceCheck from "@repo/shared-logic/apis/hooks/product/use-suspense-price-check.hook";
import { Bookmark, Upload, X, Zap } from "@tamagui/lucide-icons";
import dayjs from "dayjs";
import { Link, router, useRouter } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { Button, ScrollView, Text, View, XStack, YStack } from "tamagui";

export const ProductDetailsSkeleton = () => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <MotiView style={{ flex: 1, gap: 20, marginHorizontal: 20 }}>
      <Skeleton
        width={screenWidth - 40}
        height={screenWidth - 40}
        colorMode="light"
      />
      <MotiView style={{ gap: 5 }}>
        <Skeleton width="100%" height={25} colorMode="light" />
        <Skeleton width={screenWidth * 0.7} height={25} colorMode="light" />
      </MotiView>

      <Skeleton width="50%" height={50} colorMode="light" />
      <MotiView style={{ gap: 5 }}>
        <Skeleton width="30%" height={30} colorMode="light" />
        <Skeleton width="100%" height={150} colorMode="light" />
      </MotiView>
    </MotiView>
  );
};

export const ProductPriceSkeleton = () => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <MotiView style={{ gap: 9 }}>
      <Skeleton width={screenWidth * 0.4} height={30} colorMode="light" />
      <Skeleton width={screenWidth * 0.7} height={20} colorMode="light" />
    </MotiView>
  );
};

export const ProductAction = ({ width }: { readonly width: number }) => {
  return (
    <View
      flex={1}
      position="absolute"
      top={20}
      left={20}
      right={40}
      flexDirection="row"
      justifyContent="space-between"
      width={width - 40}
    >
      <Button
        circular
        icon={X}
        padding={20}
        backgroundColor="white"
        height={40}
        width={40}
        shadowColor="$gray12"
        shadowOpacity={0.8}
        shadowRadius={2}
        shadowOffset={{ height: 3, width: 3 }}
        elevation={10}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          }
        }}
      />
      <XStack gap={10}>
        <Button
          circular
          icon={Bookmark}
          padding={20}
          backgroundColor="white"
          height={40}
          width={40}
          shadowColor="$gray12"
          shadowOpacity={0.8}
          shadowRadius={2}
          shadowOffset={{ height: 3, width: 3 }}
          elevation={10}
        />
        <Button
          circular
          icon={Upload}
          padding={20}
          backgroundColor="white"
          height={40}
          width={40}
          shadowColor="$gray12"
          shadowOpacity={0.8}
          shadowRadius={2}
          shadowOffset={{ height: 3, width: 3 }}
          elevation={10}
        />
      </XStack>
    </View>
  );
};

type SaleBadgesProps = {
  readonly token: string;
  readonly productId: number;
  readonly brandName: string;
  readonly productListPrice: number;
  readonly onSale: boolean;
  readonly isNewItem: boolean;
};

export const SalesBadges = ({
  token,
  productId,
  brandName,
  productListPrice,
  onSale,
  isNewItem,
}: SaleBadgesProps) => {
  const priceCheckQuery = useSuspensePriceCheck(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
      token,
    },
    [
      {
        productId,
        qty: 1,
      },
    ],
  );

  const priceData = priceCheckQuery.data.productPrices[0];
  let currentPrice = 0;
  let listPrice = productListPrice;

  if (priceData) {
    listPrice = priceData.listPrice;
    currentPrice = priceData?.uomPrice ?? priceData?.price;
  }
  const discountPercent = Math.round(
    ((listPrice - currentPrice) / listPrice) * 100,
  );

  return (
    <XStack flex={1} gap={10} alignItems="center" flexWrap="wrap">
      <Button backgroundColor="$gray6" size="$3" marginRight={5}>
        {brandName}
      </Button>
      {!!isNewItem && (
        <Button backgroundColor="$red4" size="$2" color="$red10">
          New
        </Button>
      )}
      {discountPercent > 0 && !!onSale && !!isNewItem && (
        <Button backgroundColor="$blue4" icon={Zap} color="$blue10" size="$2">
          Flash Deal
        </Button>
      )}
      {discountPercent > 0 && (
        <Button
          backgroundColor="$green4"
          color="$green10"
          size="$2"
          fontWeight={700}
        >
          {`${discountPercent.toString()}% off`}
        </Button>
      )}
    </XStack>
  );
};

type PriceBreakdownProps = {
  readonly token: string;
  readonly productId: number;
  readonly unitOfMeasure: string;
  readonly quantity?: number;
};

export const PriceBreakdowns = ({
  token,
  productId,
  unitOfMeasure,
  quantity = 1,
}: PriceBreakdownProps) => {
  const priceCheckQuery = useSuspensePriceCheck(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
      token,
    },
    [
      {
        productId,
        qty: quantity,
      },
    ],
  );

  const listPrice = priceCheckQuery.data.productPrices[0]?.listPrice;
  const uomPrice = priceCheckQuery.data.productPrices[0]?.uomPrice;

  const priceBreakdowns =
    priceCheckQuery.data.productPrices[0]?.priceBreakDowns;

  if (!priceBreakdowns) {
    return null;
  }

  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack gap={5}>
        {priceBreakdowns.map((item, _idx) => (
          <YStack
            key={item.quantity}
            backgroundColor="white"
            width={screenWidth / 2 - 22}
            gap={3}
            paddingVertical={5}
            paddingLeft={10}
            borderRadius={7}
          >
            {priceBreakdowns[_idx + 1] ? (
              <Text>
                {item.quantity}-{priceBreakdowns[_idx + 1]!.quantity - 1} items
              </Text>
            ) : (
              <Text>{item.quantity}+ items</Text>
            )}
            <Text fontWeight={700}>
              $
              {formatNumberToPrice(
                Math.min(
                  item.price,
                  listPrice ?? item.price,
                  uomPrice ?? item.price,
                ),
              )}
              /{unitOfMeasure}
            </Text>
          </YStack>
        ))}
      </XStack>
    </ScrollView>
  );
};

type ProductPricesProps = {
  readonly token: string;
  readonly productId: number;
  readonly productListPrice: number;
  readonly unitOfMeasure: string;
  readonly freightCharge: string;
  readonly quantity?: number;
};

export const ProductPrices = ({
  token,
  productId,
  productListPrice,
  unitOfMeasure,
  freightCharge,
  quantity = 1,
}: ProductPricesProps) => {
  const priceCheckQuery = useSuspensePriceCheck(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
      token,
    },
    [
      {
        productId,
        qty: quantity,
      },
    ],
  );

  const priceData = priceCheckQuery.data.productPrices[0];
  let currentPrice = productListPrice;
  let listPrice = productListPrice;
  let uom = unitOfMeasure;

  if (priceData) {
    listPrice = priceData.listPrice;
    currentPrice = priceData.uomPrice ?? priceData.price;
    if (priceData.uomPriceUnit) {
      uom = priceData.uomPriceUnit;
    }
  }

  const discount = Math.round(((listPrice - currentPrice) / listPrice) * 100);

  return (
    <XStack flex={1} justifyContent="space-between">
      <XStack flex={1} alignItems="flex-end">
        <Text fontSize="$5" color="$green11" fontWeight={900}>
          $
        </Text>
        <Text fontSize="$8" color="$green11" fontWeight={900} marginBottom={-2}>
          {formatNumberToPrice(currentPrice)}
        </Text>
        {discount > 0 && (
          <>
            <Text fontSize="$5" color="$gray10" marginLeft={5}>
              $
            </Text>
            <Text
              textDecorationLine="line-through"
              fontSize="$5"
              color="$gray10"
            >
              {formatNumberToPrice(listPrice)}
            </Text>
          </>
        )}

        <Text fontSize="$5">/</Text>
        <Text fontSize="$5">{uom}</Text>
      </XStack>

      {!!freightCharge && (
        <YStack alignItems="flex-end">
          <XStack>
            <Text color="$gray9">+ </Text>
            <Text color="$gray10" fontWeight={700}>
              {freightCharge}
            </Text>
          </XStack>
          <Text color="$gray9">Freight Charges</Text>
        </YStack>
      )}
    </XStack>
  );
};

export const StockStatus = ({
  token,
  productId,
  quantity = 1,
}: {
  readonly token: string;
  readonly productId: number;
  readonly quantity?: number;
}) => {
  const { data: availabilityData } = useSuspenseCheckAvailability(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
      token,
    },
    { productId, quantity },
  );

  const homeBranch = availabilityData.availableLocations?.find(
    (location) => location.location === DEFAULT_PLANT,
  );

  const backOrderDate =
    availabilityData.options[0]?.plants[0]?.backOrderDate ?? "";

  return (
    <XStack>
      {availabilityData.status === "inStock" && (
        <XStack flex={1} alignItems="flex-start" gap={5}>
          <View
            borderRadius={7}
            borderWidth={1}
            backgroundColor="black"
            paddingHorizontal={5}
            paddingVertical={2}
          >
            <Text color="white">In Stock</Text>
          </View>
          <Text flex={1} marginTop={2}>
            {homeBranch?.amount} in stock at {homeBranch?.name}
          </Text>
        </XStack>
      )}

      {availabilityData.status === "limitedStock" && (
        <XStack flex={1} alignItems="flex-start" gap={5}>
          <View
            borderRadius={7}
            backgroundColor="$yellow4"
            paddingHorizontal={5}
            paddingVertical={2}
          >
            <Text color="black">Limited Stock</Text>
          </View>
          <Text flex={1} marginTop={2}>
            {homeBranch?.amount} in stock at {homeBranch?.name}
          </Text>
        </XStack>
      )}

      {availabilityData.status === "notInStock" && (
        <XStack flex={1} alignItems="flex-start" gap={5}>
          <View
            borderRadius={7}
            backgroundColor="$yellow4"
            paddingHorizontal={5}
            paddingVertical={2}
          >
            <Text color="black">Backordered</Text>
          </View>
          <Text flex={1} marginTop={2}>
            Items are expected to ship by{" "}
            {dayjs(backOrderDate).format(UI_DATE_FORMAT)}
          </Text>
        </XStack>
      )}
    </XStack>
  );
};

export const ProductVariations = ({
  productId,
}: {
  readonly productId: number;
}) => {
  const router = useRouter();
  const [selectedValues, setSelectedValues] = useState<Record<number, string>>(
    {},
  );

  const { data } = useSuspenseGroupFilters(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
    },
    productId,
  );

  const handleValueChange = (variantId: number, itemValue: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [variantId]: itemValue,
    }));
  };

  return (
    <YStack gap={15}>
      {data.map((variant) => (
        <YStack key={variant.id} gap={10}>
          <XStack>
            <Text>{variant.name}: </Text>
            <Text fontWeight={700}>
              {variant.values.find((value) => value.selected)?.name}
            </Text>
          </XStack>

          {variant.values.length > 5 ? (
            <Picker
              style={
                Platform.OS === "ios"
                  ? { marginTop: -25 }
                  : {
                      backgroundColor: "white",
                    }
              }
              itemStyle={Platform.OS === "ios" && { fontSize: 14 }}
              selectedValue={
                selectedValues[variant.id] ||
                variant.values.find((value) => value.selected)?.name
              }
              onValueChange={(itemValue) => {
                const variantValue = variant.values.find(
                  (value) => value.name === itemValue,
                );

                handleValueChange(variant.id, itemValue);

                if (
                  isNumber(variantValue?.productid) &&
                  isString(variantValue?.slug)
                ) {
                  router.replace(
                    `product/${variantValue.productid}/${variantValue.slug}`,
                  );
                }
              }}
            >
              {variant.values.map((value) => (
                <Picker.Item
                  enabled={!!value.productid && !!value.slug}
                  key={value.id}
                  label={value.name}
                  value={value.name}
                  color={!value.productid || !value.slug ? "gray" : "black"}
                />
              ))}
            </Picker>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap={10}>
                {variant.values.map((value) => (
                  <Link
                    key={value.id}
                    href={`product/${value.productid}/${value.slug}`}
                    replace
                    disabled={!value.productid || !value.slug}
                    asChild
                  >
                    <Pressable>
                      <View
                        padding={10}
                        backgroundColor={
                          value.productid && value.slug ? "white" : "$gray6"
                        }
                        borderRadius={10}
                        borderColor={
                          value.selected ? "$red10" : "$colorTransparent"
                        }
                        borderWidth={value.selected ? 2 : 0}
                      >
                        <Text>{value.name}</Text>
                      </View>
                    </Pressable>
                  </Link>
                ))}
              </XStack>
            </ScrollView>
          )}
        </YStack>
      ))}
    </YStack>
  );
};

export const EnterQuantity = ({
  form,
}: {
  readonly form: UseFormReturn<{
    quantity: string;
  }>;
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <XStack
        flex={1}
        position="absolute"
        bottom={0}
        paddingHorizontal={20}
        backgroundColor="white"
        gap={5}
        paddingVertical={20}
      >
        <QuantityInput flex={1} form={form} />
        <Button flex={1} backgroundColor="$red11" color="white" fontSize="$6">
          Add to Cart
        </Button>
      </XStack>
    </KeyboardAvoidingView>
  );
};
