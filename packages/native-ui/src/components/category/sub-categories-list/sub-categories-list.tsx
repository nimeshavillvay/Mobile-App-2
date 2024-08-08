import type { FlashListProps } from "@shopify/flash-list";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "tamagui";

type SubCategory = {
  readonly id: string;
  readonly slug: string;
  readonly image: string;
  readonly title: string;
};

const styles = StyleSheet.create({
  subCategory: {
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 10,
    height: "100%",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.07)",
  },
});

export const SubCategoryListItem = ({
  index,
  item,
}: {
  readonly index: number;
  readonly item: SubCategory;
}) => {
  return (
    <View
      style={{
        paddingLeft: index % 3 > 0 ? 8 : 0,
        paddingRight: index % 3 < 2 ? 8 : 0,
        width: "100%",
        height: 176,
      }}
      testID="sub-category-list-item"
    >
      <Link href={`/category/${item.id}`} asChild testID="sub-category-link">
        <Pressable style={styles.subCategory}>
          <Image
            source={item.image}
            style={{ width: 80, height: 80 }}
            testID="sub-category-image"
          />

          <Text
            numberOfLines={3}
            textAlign="center"
            paddingVertical={10}
            fontSize={12}
            testID="sub-category-title"
          >
            {item.title}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

type SubCategoriesFlashListProps = Omit<
  FlashListProps<SubCategory>,
  "keyExtractor"
>;
type SubCategoriesListProps = Omit<SubCategoriesFlashListProps, "renderItem"> &
  Partial<Pick<SubCategoriesFlashListProps, "renderItem">>;

export const SubCategoriesList = ({
  numColumns = 3,
  renderItem = ({ item, index }) => (
    <SubCategoryListItem index={index} item={item} />
  ),
  ItemSeparatorComponent = () => <View style={{ height: 16 }} />,
  estimatedItemSize = 176,
  ...delegated
}: SubCategoriesListProps) => {
  return (
    <FlashList
      keyExtractor={({ id }) => id.toString()}
      numColumns={numColumns}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
      estimatedItemSize={estimatedItemSize}
      {...delegated}
    />
  );
};
