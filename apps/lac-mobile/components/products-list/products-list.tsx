import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { ProductCard } from "@repo/native-ui/components/product-card";
import usePriceCheck from "@repo/shared-logic/apis/hooks/product/use-price-check.hook";
import { FlashList, type FlashListProps } from "@shopify/flash-list";
import { type ComponentProps } from "react";
import { H2, Text, View } from "tamagui";

type ProductItem = Omit<
  ComponentProps<typeof ProductCard>,
  "price" | "listPrice"
>;
type ListProps = FlashListProps<ProductItem>;

type ProductsListProps = Omit<
  ListProps,
  "horizontal" | "numColumns" | "renderItem" | "estimatedItemSize"
>;

const ProductsList = ({
  data,
  onEndReachedThreshold = 0.8,
  ListEmptyComponent = (
    <View padding={16} gap={12}>
      <H2 fontSize={20} lineHeight={20} fontWeight={400}>
        No results
      </H2>

      <Text>Sorry, no results were found for your search term.</Text>
    </View>
  ),
  ...delegated
}: ProductsListProps) => {
  const productsList =
    data?.map((item) => ({
      productId: item.productId,
      qty: 1,
    })) ?? [];

  const token = useSessionTokenStorage((state) => state.token);

  const priceCheckQuery = usePriceCheck(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
      token,
    },
    productsList,
    true,
  );

  const getPrice = (productId: string) => {
    const productPrice = priceCheckQuery.data?.productPrices.find(
      (item) => item.productId === productId,
    );

    return {
      price: productPrice?.price ?? 0,
      listPrice: productPrice?.listPrice ?? 0,
    };
  };

  return (
    <FlashList
      data={data}
      extraData={priceCheckQuery.data}
      horizontal={false}
      numColumns={2}
      renderItem={({ item }) => {
        const { price, listPrice } = getPrice(item.productId.toString());

        return (
          <ProductCard
            productId={item.productId}
            image={item.image}
            title={item.title}
            sku={item.sku}
            uom={item.uom}
            price={price}
            listPrice={listPrice}
          />
        );
      }}
      ListEmptyComponent={ListEmptyComponent}
      estimatedItemSize={300}
      onEndReachedThreshold={onEndReachedThreshold}
      {...delegated}
    />
  );
};

export default ProductsList;
