import { SearchCategory } from "@repo/native-ui/components/search/suggestion/search-category";
import { FlashList, type FlashListProps } from "@shopify/flash-list";
import type { ComponentProps } from "react";
import { View } from "tamagui";

type SearchCategoryItem = ComponentProps<typeof SearchCategory>;
type ListProps = FlashListProps<SearchCategoryItem>;

type SearchCategoryProps = Readonly<
  Omit<
    ListProps,
    "horizontal" | "numColumns" | "renderItem" | "estimatedItemSize"
  >
>;

const CategorySearchList = ({ ...delegated }: SearchCategoryProps) => {
  return (
    <FlashList
      horizontal={false}
      ItemSeparatorComponent={() => {
        return <View marginVertical={5} />;
      }}
      renderItem={({ item }) => (
        <SearchCategory category={item.category} link={item.link} />
      )}
      estimatedItemSize={5}
      onEndReachedThreshold={0.8}
      {...delegated}
    />
  );
};

export default CategorySearchList;
