import ProductsList from "@/components/products-list";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import useSuspenseRelatedProduct from "@repo/shared-logic/apis/hooks/product/use-suspense-related-product.hook";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "tamagui";

const RelatedProductsPage = () => {
  const localSearchParams = useLocalSearchParams<{
    id: string;
    category: string;
  }>();

  if (!localSearchParams.id || !localSearchParams.category) {
    return null;
  }

  return (
    <ScreenLayout>
      <ScreenHeader
        title="Related Products/Accessories"
        barcodeScannerPath="/barcode-scanner"
      />
      <RelatedProducts
        productId={localSearchParams.id}
        category={localSearchParams.category}
      />
    </ScreenLayout>
  );
};

const RelatedProducts = ({
  productId,
  category,
}: {
  readonly productId: string;
  readonly category: string;
}) => {
  const { data } = useSuspenseRelatedProduct(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
    },
    productId,
  );

  const products = data.find(
    (product) => product.heading === category,
  )?.products;

  if (!products) {
    return null;
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
      <Text fontSize="$6" fontWeight={900} marginBottom={10}>
        {category}
      </Text>
      <ProductsList
        data={products.map((product) => ({
          productId: Number(product.productId),
          slug: product.slug,
          title: product.productName,
          sku: product.productSku,
          image: product.image,
          uom: product.unitOfMeasure ?? "",
          link: `product/${product.productId}/${product.slug}`,
        }))}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RelatedProductsPage;
