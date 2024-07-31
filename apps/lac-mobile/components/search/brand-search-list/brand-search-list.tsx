import { SearchBrand } from "@repo/native-ui/components/search/suggestion/search-brand";
import { FlashList, type FlashListProps } from "@shopify/flash-list";
import type { ComponentProps } from "react";
import { View } from "tamagui";

type SearchBrandItem = ComponentProps<typeof SearchBrand>;
type ListProps = FlashListProps<SearchBrandItem>;

type SearchBrandProps = Readonly<
  Omit<
    ListProps,
    "horizontal" | "numColumns" | "renderItem" | "estimatedItemSize"
  >
>;

const BrandSearchList = ({ ...delegated }: SearchBrandProps) => {
  return (
    <FlashList
      horizontal={true}
      ItemSeparatorComponent={() => {
        return <View px={5} />;
      }}
      renderItem={({ item }) => (
        <SearchBrand
          brandName={item.brandName}
          imageUrl={item.imageUrl}
          link={item.link}
        />
      )}
      estimatedItemSize={10}
      onEndReachedThreshold={0.8}
      {...delegated}
    />
  );
};

export default BrandSearchList;
