import useAuthenticatedApiConfig from "@/hooks/config/use-authenticated-api-config.hook";
import { SEARCH_API_BASE_URL } from "@/lib/constants";
import { formatNumberToPrice } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { QuantityField } from "@repo/native-ui/components/form/quantity-field";
import useSuspenseSimulationCheckout from "@repo/shared-logic/apis/hooks/cart/use-suspense-simulation-checkout.hook";
import useSuspenseInfiniteSearchResults from "@repo/shared-logic/apis/hooks/elasticsearch/use-suspense-infinite-search-results.hook";
import useAddToCartMutation from "@repo/shared-logic/apis/hooks/product/use-add-to-cart-mutation.hook";
import usePriceCheck from "@repo/shared-logic/apis/hooks/product/use-price-check.hook";
import { FlashList } from "@shopify/flash-list";
import { X } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import { Stack } from "expo-router/stack";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Suspense, useDeferredValue, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  Button,
  Dialog,
  H2,
  Input,
  Label,
  Text,
  Unspaced,
  VisuallyHidden,
  XStack,
} from "tamagui";
import { z } from "zod";

const formSchema = z.object({
  productNo: z.string(),
});
type FormSchema = z.infer<typeof formSchema>;

const QuickOrderPage = () => {
  const width = Dimensions.get("window").width;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      productNo: "",
    },
  });

  const productNo = form.watch("productNo");
  const deferredProductNo = useDeferredValue(productNo);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScreenLayout>
        <ScreenHeader
          title="Quick Order"
          hideSearchButton
          type="center-aligned"
        />

        <View style={{ padding: 16, flex: 1, gap: 16 }}>
          <XStack>
            <VisuallyHidden>
              <Label htmlFor="product-no">Product #</Label>
            </VisuallyHidden>

            <Controller
              control={form.control}
              name="productNo"
              render={({ field: { value, onChange, onBlur, disabled } }) => (
                <Input
                  id="product-no"
                  style={{ flex: 1 }}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={disabled}
                  returnKeyType="search"
                  placeholder="Enter Product #"
                />
              )}
            />
          </XStack>

          <Suspense
            fallback={
              <MotiView style={{ flex: 1 }}>
                <Skeleton width={width - 32} height="100%" colorMode="light" />
              </MotiView>
            }
          >
            <SearchList productNo={deferredProductNo} />
          </Suspense>
        </View>
      </ScreenLayout>
    </>
  );
};

export default QuickOrderPage;

const SearchList = ({ productNo }: { readonly productNo: string }) => {
  const { data } = useSuspenseInfiniteSearchResults(
    { baseUrl: SEARCH_API_BASE_URL },
    { query: productNo },
  );
  const productsList = data.pages.flatMap((page) => page.results);

  const authenticatedApiConfig = useAuthenticatedApiConfig();

  const simulationCheckoutQuery = useSuspenseSimulationCheckout(
    authenticatedApiConfig,
  );
  const priceCheckQuery = usePriceCheck(
    authenticatedApiConfig,
    productsList.map((product) => ({
      productId: product.id,
      qty: 1,
    })),
    true,
  );

  return (
    <FlashList
      data={productsList}
      extraData={priceCheckQuery.data}
      horizontal={false}
      renderItem={({ item }) => (
        <QuickOrderResult
          productId={item.id}
          image={item.itemImage}
          title={item.productTitle}
          sku={item.materialNumber}
          price={
            priceCheckQuery.data?.productPrices.find(
              (price) => price.productId === item.id.toString(),
            )?.listPrice
          }
          uom={item.uom}
          inCart={
            !!simulationCheckoutQuery.data.productslist.find(
              (product) => product.productid === item.id.toString(),
            )
          }
          minQuantity={Number(item.minimumOrderQuantity)}
          quantityMultiple={Number(item.orderQuantityByIncrements)}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      estimatedItemSize={89}
    />
  );
};

const QuickOrderResult = ({
  productId,
  image,
  title,
  sku,
  price = 0,
  uom = "",
  inCart,
  minQuantity,
  quantityMultiple,
}: {
  readonly productId: number;
  readonly image: string;
  readonly title: string;
  readonly sku: string;
  readonly price?: number;
  readonly uom?: string;
  readonly inCart: boolean;
  readonly minQuantity: number;
  readonly quantityMultiple: number;
}) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [quantity, setQuantity] = useState(minQuantity);

  const authenticatedApiConfig = useAuthenticatedApiConfig();

  const addToCartMutation = useAddToCartMutation(authenticatedApiConfig);

  const addToCart = async () => {
    await addToCartMutation.mutateAsync({
      productId,
      quantity,
    });

    setOpenAdd(false);
  };

  return (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <Image
        source={image}
        contentFit="contain"
        style={{ width: 78, height: 78 }}
      />

      <View style={{ flex: 1, gap: 7 }}>
        <H2
          numberOfLines={2}
          style={{ fontSize: 14, fontWeight: 400, lineHeight: 18 }}
        >
          {title}
        </H2>

        <Text style={{ color: "#74767B", fontSize: 14 }}>{sku}</Text>

        <Text style={{ fontSize: 13 }}>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>$</Text>
          <Text style={{ fontSize: 18, fontWeight: 700 }}>
            {formatNumberToPrice(price)}
          </Text>
          /{uom}
        </Text>
      </View>

      <View style={{ gap: 12, alignItems: "center", width: 54 }}>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <Dialog.Trigger asChild>
            <Button
              circular
              icon={
                <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M17.708 4.792l-1.458 7.916H5L2.916 2.292H1.458m6.458 3.541h2.709m0 0h2.708m-2.708 0V3.125m0 2.708v2.709m-2.917 7.291a1.042 1.042 0 11-2.083 0 1.042 1.042 0 012.083 0zm7.5 0a1.042 1.042 0 11-2.083 0 1.042 1.042 0 012.083 0z"
                    stroke="#FCFCFC"
                    strokeWidth={1.5}
                    strokeLinecap="square"
                  />
                </Svg>
              }
              style={{ backgroundColor: "#CC0000" }}
            />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay
              key="overlay"
              animation="slow"
              opacity={0.5}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />

            <Dialog.Content
              bordered
              elevate
              key="content"
              animateOnly={["transform", "opacity"]}
              animation={[
                "quicker",
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              gap={24}
              width={340}
            >
              <VisuallyHidden>
                <Dialog.Title>Add to cart</Dialog.Title>
              </VisuallyHidden>

              <XStack
                style={{
                  gap: 12,
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(0, 0, 0, 0.22)",
                  borderBottomStyle: "dashed",
                }}
              >
                <Image
                  source={image}
                  contentFit="contain"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: "#DEDEDE",
                  }}
                />

                <View style={{ gap: 4, flex: 1 }}>
                  <H2
                    numberOfLines={3}
                    style={{ fontSize: 14, fontWeight: 400, lineHeight: 18 }}
                  >
                    {title}
                  </H2>

                  <Text style={{ color: "#74767B", fontSize: 14 }}>
                    Item # {sku}
                  </Text>
                </View>
              </XStack>

              <QuantityField
                quantity={quantity}
                setQuantity={setQuantity}
                uom={uom}
                minQuantity={minQuantity}
                quantityMultiple={quantityMultiple}
                disabled={addToCartMutation.isPending}
              />

              <XStack alignSelf="flex-end">
                <Button
                  theme="active"
                  style={{
                    backgroundColor: "#CC0000",
                    borderRadius: 9,
                    color: "#EDEDED",
                    fontSize: 16,
                  }}
                  onPress={addToCart}
                  disabled={
                    addToCartMutation.isPending ||
                    quantity < minQuantity ||
                    quantity % quantityMultiple !== 0
                  }
                >
                  Add to Cart
                </Button>
              </XStack>

              <Unspaced>
                <Dialog.Close asChild>
                  <Button
                    position="absolute"
                    top="$3"
                    right="$3"
                    size="$2"
                    circular
                    icon={X}
                    disabled={addToCartMutation.isPending}
                  />
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>

        {!!inCart && (
          <View
            style={{
              padding: 7,
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#3E3E3E", fontSize: 12 }}>In Cart</Text>
          </View>
        )}
      </View>
    </View>
  );
};
