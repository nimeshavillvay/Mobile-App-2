import type { FeaturedCategory } from "@repo/shared-logic/zod-schema/category";
import type { FlashListProps } from "@shopify/flash-list";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { type ComponentProps } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Circle, H2, Text } from "tamagui";
import { ColumnItem } from "~/components/flat-list-column-item";

const CATEGORY_WIDTH = 80;

const styles = StyleSheet.create({
  featuredCategoryImage: {
    width: CATEGORY_WIDTH,
    height: CATEGORY_WIDTH,
    borderRadius: 9999,
  },
});

export const FeaturedCategoriesSkeleton = () => {
  const width = Dimensions.get("window").width;

  return (
    <MotiView testID="featured-categories-skeleton">
      <Skeleton width={width} height={width * 2} colorMode="light" />
    </MotiView>
  );
};

export const FeaturedCategoriesContainer = (
  props: ComponentProps<typeof View>,
) => {
  return <View style={{ flex: 2.5, padding: 16 }} {...props} />;
};

export const FeaturedCategoriesHeader = ({
  children = "Featured Categories",
  ...delegated
}: ComponentProps<typeof H2>) => {
  return (
    <H2
      color="black"
      fontSize={18}
      fontWeight={400}
      marginBottom={16}
      {...delegated}
    >
      {children}
    </H2>
  );
};

type OptionalKeys = "renderItem";

export const FeaturedCategoriesList = ({
  data,
  keyExtractor = (item) => item.id,
  renderItem = ({ item }) => (
    <Link href={`/shop/category/${item.id}`} testID="featured-category">
      <View style={{ gap: 16, alignItems: "center", alignSelf: "stretch" }}>
        <Image
          source={item.img}
          style={styles.featuredCategoryImage}
          testID="featured-category-image"
        />

        <Text
          fontSize={12}
          numberOfLines={3}
          textAlign="center"
          flexShrink={1}
          maxWidth={CATEGORY_WIDTH}
        >
          {item.name}
        </Text>
      </View>
    </Link>
  ),
  ViewAllComponent = () => (
    <Link href="/browse-categories">
      <View style={{ justifyContent: "center", width: 80, height: 80 }}>
        <Circle
          size={CATEGORY_WIDTH}
          backgroundColor="black"
          opacity={0.07}
          position="absolute"
          left={0}
          right={0}
        />

        <Text fontSize={14} textAlign="center">
          View All
        </Text>
      </View>
    </Link>
  ),
  numColumns = 4,
  estimatedItemSize = 154,
  ItemSeparatorComponent = () => <View style={{ height: 64 }} />,
  scrollEnabled = false,
  ...delegated
}: Omit<FlashListProps<FeaturedCategory>, OptionalKeys> &
  Partial<Pick<FlashListProps<FeaturedCategory>, OptionalKeys>> & {
    readonly ViewAllComponent?: () => JSX.Element;
  }) => {
  const filteredCategories = data?.slice(0, 7) ?? []; // Should be limited to 7 categories
  const allData: FeaturedCategory[] = [
    ...filteredCategories,
    {
      id: "view-all",
      direct_item_count: "",
      img: "",
      item_count: "",
      name: "",
      shortcode: "",
      slug: "",
    },
  ];

  return (
    <FlashList
      data={allData}
      keyExtractor={keyExtractor}
      renderItem={(props) => (
        <ColumnItem index={props.index} numColumns={numColumns}>
          {props.item.id !== "view-all" && !!renderItem ? (
            renderItem(props)
          ) : (
            <ViewAllComponent />
          )}
        </ColumnItem>
      )}
      numColumns={numColumns}
      estimatedItemSize={estimatedItemSize}
      ItemSeparatorComponent={ItemSeparatorComponent}
      scrollEnabled={scrollEnabled}
      {...delegated}
    />
  );
};
