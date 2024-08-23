import {
  EnterQuantity,
  PriceBreakdowns,
  ProductAction,
  ProductDetailsSkeleton,
  ProductPrices,
  ProductPriceSkeleton,
  ProductVariations,
  SalesBadges,
  StockStatus,
} from "@/components/product";
import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpandableView } from "@repo/native-ui/components/base/expandable-view";
import {
  ProductCarousel,
  ProductCarouselItem,
  ProductCarouselPagination,
} from "@repo/native-ui/components/product";
import { ProductSpecification } from "@repo/native-ui/components/product-specification";
import useSuspenseGetProduct from "@repo/shared-logic/apis/hooks/product/use-suspense-get-product.hook";
import { Stack, useLocalSearchParams } from "expo-router";
import { Suspense, useDeferredValue, useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import ImageView from "react-native-image-viewing";
import RenderHtml from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, YStack } from "tamagui";
import { z } from "zod";

const quantitySchema = z.object({
  quantity: z.number(),
});

const Product = () => {
  const localSearchParams = useLocalSearchParams<{
    id: string;
    slug: string;
  }>();

  if (!localSearchParams.id || !localSearchParams.slug) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Suspense fallback={<ProductDetailsSkeleton />}>
            <ProductDetails productId={localSearchParams.id} />
          </Suspense>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const ProductDetails = ({ productId }: { readonly productId: string }) => {
  const [index, setIndex] = useState(0);
  const [imageOverlayVisible, setImageOverlayVisible] = useState(false);

  const token = useSessionTokenStorage((state) => state.token);

  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(z.object({ quantity: z.string() })),
    values: {
      quantity: 1,
    },
  });

  const quantity = form.watch("quantity");
  const deferredQuantity = useDeferredValue(quantity);

  const { data } = useSuspenseGetProduct(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
    },
    productId,
  );

  if (!data) {
    return null;
  }

  const screenWidth = Dimensions.get("window").width;

  let productImages = data.selectedProduct.detailedImages;
  if (!productImages || productImages.length === 0) {
    productImages = [
      {
        img: data.selectedProduct.image,
        type: "IMAGE",
        alt: "Product Image",
        url: "",
      },
    ];
  }

  return (
    <>
      <ScrollView>
        <View flex={1}>
          <ProductCarousel
            width={screenWidth}
            height={screenWidth}
            data={productImages}
            renderItem={({ item }) => (
              <ProductCarouselItem
                image={item.img}
                alt={item.alt}
                width={screenWidth}
                height={screenWidth}
                type={item.type}
                url={item.url}
                onPress={() => setImageOverlayVisible(true)}
              />
            )}
            onScrollEnd={(index) => {
              setIndex(index);
            }}
          />

          <ProductAction width={screenWidth} />

          <ProductCarouselPagination data={productImages} index={index} />
        </View>

        <ImageView
          images={[{ uri: productImages[index]?.img }]}
          imageIndex={0}
          visible={imageOverlayVisible}
          onRequestClose={() => setImageOverlayVisible(false)}
          presentationStyle="overFullScreen"
        />

        <YStack
          flex={1}
          marginHorizontal={20}
          marginTop={10}
          gap={10}
          paddingBottom={100}
        >
          <SalesBadges
            token={token}
            productId={data.selectedProduct.productId}
            brandName={data.brand}
            productListPrice={data.selectedProduct.listPrice}
            isNewItem={data.selectedProduct.isNewItem}
            onSale={data.selectedProduct.onSale}
          />

          <Text fontSize="$6">{data.selectedProduct.productName}</Text>

          <Suspense fallback={<ProductPriceSkeleton />}>
            <ProductPrices
              token={token}
              productId={data.selectedProduct.productId}
              productListPrice={data.selectedProduct.listPrice}
              unitOfMeasure={data.selectedProduct.unitOfMeasure}
              freightCharge={data.selectedProduct.specialShipping}
              quantity={deferredQuantity}
            />

            <StockStatus
              token={token}
              productId={data.selectedProduct.productId}
              quantity={deferredQuantity}
            />
          </Suspense>

          <PriceBreakdowns
            token={token}
            productId={data.selectedProduct.productId}
            unitOfMeasure={data.selectedProduct.unitOfMeasure}
          />

          <ProductVariations productId={data.selectedProduct.productId} />

          <ExpandableView blurColor="rgb(242,242,242)" marginTop={20} gap={10}>
            <Text fontSize="$6" fontWeight={900}>
              Product Details
            </Text>

            <RenderHtml
              source={{ html: `${data.selectedProduct.productSummary}` }}
              emSize={16}
              baseStyle={{ fontSize: 15 }}
              contentWidth={screenWidth - 40}
            />
          </ExpandableView>

          {!!data.selectedProduct.attributes && (
            <ExpandableView blurColor="rgb(242,242,242)" marginTop={20}>
              <ProductSpecification data={data.selectedProduct.attributes} />
            </ExpandableView>
          )}
        </YStack>
      </ScrollView>

      <EnterQuantity form={form} />
    </>
  );
};

export default Product;
