import { FlashList, type FlashListProps } from "@shopify/flash-list";
import { type ComponentProps } from "react";
import ProductCard from "../product-card";

type ProductItem = Omit<ComponentProps<typeof ProductCard>, "token">;
type ListProps = FlashListProps<ProductItem>;

type ProductsListProps = Readonly<
  Omit<
    ListProps,
    "horizontal" | "numColumns" | "renderItem" | "estimatedItemSize"
  > & {
    token: string;
  }
>;

const ProductsList = ({
  token,
  onEndReachedThreshold = 0.8,
  ...delegated
}: ProductsListProps) => {
  return (
    <FlashList
      horizontal={false}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductCard
          productId={item.productId}
          image={item.image}
          title={item.title}
          sku={item.sku}
          uom={item.uom}
          token={token}
        />
      )}
      estimatedItemSize={300}
      onEndReachedThreshold={onEndReachedThreshold}
      {...delegated}
    />
  );
};

export default ProductsList;
