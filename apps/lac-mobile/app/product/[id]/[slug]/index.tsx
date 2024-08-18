import {
  PriceBreakdowns,
  ProductAction,
  ProductDetailsSkeleton,
  ProductPrices,
  SalesBadges,
  StockStatus,
} from "@/components/product";
import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import {
  ProductCarousel,
  ProductCarouselItem,
  ProductCarouselPagination,
} from "@repo/native-ui/components/product";
import useSuspenseGetProduct from "@repo/shared-logic/apis/hooks/product/use-suspense-get-product.hook";
import { Stack, useLocalSearchParams } from "expo-router";
import { Suspense, useState } from "react";
import { Dimensions } from "react-native";
import ImageView from "react-native-image-viewing";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, YStack } from "tamagui";

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
        <ScrollView flex={1} backgroundColor="$gray3">
          <Suspense fallback={<ProductDetailsSkeleton />}>
            <ProductDetails productId={localSearchParams.id} />
          </Suspense>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const ProductDetails = ({ productId }: { readonly productId: string }) => {
  const [index, setIndex] = useState(0);
  const [imageOverlayVisible, setImageOverlayVisible] = useState(false);

  const token = useSessionTokenStorage((state) => state.token);

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
      <YStack flex={1} marginHorizontal={20} marginTop={10} gap={10}>
        <SalesBadges
          token={token}
          productId={data.selectedProduct.productId}
          brandName={data.brand}
          productListPrice={data.selectedProduct.listPrice}
          isNewItem={data.selectedProduct.isNewItem}
          onSale={data.selectedProduct.onSale}
        />

        <Text fontSize="$6">{data.selectedProduct.productName}</Text>

        <ProductPrices
          token={token}
          productId={data.selectedProduct.productId}
          productListPrice={data.selectedProduct.listPrice}
          unitOfMeasure={data.selectedProduct.unitOfMeasure}
          freightCharge={data.selectedProduct.specialShipping}
        />

        <StockStatus token={token} productId={data.selectedProduct.productId} />

        <PriceBreakdowns
          token={token}
          productId={data.selectedProduct.productId}
          unitOfMeasure={data.selectedProduct.unitOfMeasure}
        />
      </YStack>
    </>
  );
};

export default Product;
