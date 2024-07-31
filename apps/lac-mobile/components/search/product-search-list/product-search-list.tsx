import { SearchProduct } from "@repo/native-ui/components/search/suggestion/search-product";
import { FlashList, type FlashListProps } from "@shopify/flash-list";
import type { ComponentProps } from "react";

type SearchProductItem = ComponentProps<typeof SearchProduct>;
type ListProps = FlashListProps<SearchProductItem>;

type SearchProductProps = Readonly<
  Omit<
    ListProps,
    "horizontal" | "numColumns" | "renderItem" | "estimatedItemSize"
  >
>;

const ProductSearchList = ({ ...delegated }: SearchProductProps) => {
  return (
    <FlashList
      horizontal={false}
      renderItem={({ item }) => (
        <SearchProduct
          imageUrl={item.imageUrl}
          itemNo={item.itemNo}
          title={item.title}
        />
      )}
      estimatedItemSize={5}
      onEndReachedThreshold={0.8}
      {...delegated}
    />
  );
};

export default ProductSearchList;
