import ProductsList from "@/components/products-list";
import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { SubCategoriesList as SubCategoriesListPrimitive } from "@repo/native-ui/components/category/sub-categories-list";
import useSuspenseProductLandingCategory from "@repo/shared-logic/apis/hooks/category/use-suspense-product-landing-category.hook";
import useSuspenseInfiniteSearch from "@repo/shared-logic/apis/hooks/search/use-suspense-infinite-search.hook";
import { SlidersHorizontal } from "@tamagui/lucide-icons";
import { Link, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router/stack";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import { Button, H1, Text, XStack } from "tamagui";

const CategoryPage = () => {
  const localSearchParams = useLocalSearchParams();
  const id = localSearchParams.id?.toString();

  if (!id) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScreenLayout edges={["left", "top", "right"]}>
        <ScreenHeader title="" barcodeScannerPath="/barcode-scanner" />

        <Suspense
          fallback={
            <MotiView style={{ paddingHorizontal: 16, flex: 1 }}>
              <Skeleton height="100%" width="100%" colorMode="light" />
            </MotiView>
          }
        >
          <CategoryPageHeader id={id} />

          <SubCategoriesList id={id} />

          <CategoryProductsList id={id} />
        </Suspense>
      </ScreenLayout>
    </>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  filtersBtn: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 13,
    fontSize: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  filtersCountContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 18,
    height: 18,
    backgroundColor: "#171717",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: 9 }, { translateY: -9 }],
  },
  filtersCount: {
    fontSize: 12,
    lineHeight: 12,
    color: "#FCFCFC",
  },
});

const CategoryPageHeader = ({ id }: { readonly id: string }) => {
  const { data } = useSuspenseProductLandingCategory(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
    },
    id,
  );

  return (
    <H1
      paddingHorizontal={16}
      paddingTop={16}
      paddingBottom={24}
      fontSize={24}
      fontWeight={400}
      testID="category-title"
    >
      {data.mainCategory.title}
    </H1>
  );
};

const SubCategoriesList = ({ id }: { readonly id: string }) => {
  const { data } = useSuspenseProductLandingCategory(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
    },
    id,
  );

  if (data.mainCategory.subCategories.length === 0) {
    return null;
  }

  return (
    <View style={{ paddingHorizontal: 16, flex: 1 }}>
      <SubCategoriesListPrimitive
        data={data.mainCategory.subCategories.map((category) => ({
          id: category.id.toString(),
          slug: category.slug,
          image: category.image,
          title: category.title,
        }))}
      />
    </View>
  );
};

const CategoryProductsList = ({ id }: { readonly id: string }) => {
  const token = useSessionTokenStorage((state) => state.token);
  const globalSearchParams = useGlobalSearchParams();

  const selectedValues: Record<string, string[]> = {};
  let totalFiltersSelected = 0;
  for (const attributeId in globalSearchParams) {
    if (
      attributeId !== "id" &&
      attributeId !== "screen" &&
      attributeId !== "params"
    ) {
      const values = globalSearchParams[attributeId];

      if (values) {
        if (Array.isArray(values)) {
          selectedValues[attributeId] = values;
          totalFiltersSelected = totalFiltersSelected + values.length;
        } else {
          selectedValues[attributeId] = values.split(",");
          totalFiltersSelected =
            totalFiltersSelected + values.split(",").length;
        }
      }
    }
  }

  const { data } = useSuspenseProductLandingCategory(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
    },
    id,
  );
  const infiniteSearchQuery = useSuspenseInfiniteSearch(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
      token,
    },
    {
      categoryId: id,
    },
    selectedValues,
  );

  if (data.mainCategory.subCategories.length > 0) {
    return null;
  }

  const firstPage = infiniteSearchQuery.data.pages[0];
  const productsList = infiniteSearchQuery.data.pages
    .flatMap((page) => page.group_list)
    .flatMap((group) => group.itemSkuList);

  const total = firstPage?.pagination[0].db_count ?? 0;

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 16, gap: 16 }}
      testID="category-products-container"
    >
      <XStack alignItems="center" justifyContent="space-between">
        <Link href={`/shop/category/${id}/filters`} asChild>
          <Button style={styles.filtersBtn} icon={SlidersHorizontal}>
            Filters
            {!!totalFiltersSelected && (
              <View style={styles.filtersCountContainer}>
                <Text style={styles.filtersCount}>{totalFiltersSelected}</Text>
              </View>
            )}
          </Button>
        </Link>

        <Text
          color="#7E7E7E"
          fontSize={14}
          fontWeight={400}
          testID="category-products-total"
        >
          {total} results
        </Text>
      </XStack>

      <View style={{ flex: 1 }} testID="category-products-list">
        <ProductsList
          data={productsList.map((product) => ({
            productId: parseInt(product.productid),
            image: product.img,
            sku: product.txt_wurth_lac_item,
            title: product.item_name,
            uom: product.txt_uom_label,
            link: `product/${product.productid}/${product.slug}`,
          }))}
          onEndReached={infiniteSearchQuery.fetchNextPage}
        />
      </View>
    </View>
  );
};
