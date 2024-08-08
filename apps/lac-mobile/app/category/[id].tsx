import ProductsList from "@/components/products-list";
import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { SubCategoriesList as SubCategoriesListPrimitive } from "@repo/native-ui/components/category/sub-categories-list";
import useSuspenseProductLandingCategory from "@repo/shared-logic/apis/hooks/category/use-suspense-product-landing-category.hook";
import useSuspenseInfiniteSearch from "@repo/shared-logic/apis/hooks/search/use-suspense-infinite-search.hook";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router/stack";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Suspense } from "react";
import { Button, H1, Text, View, XStack } from "tamagui";

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

      <ScreenLayout>
        <ScreenHeader title="" />

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
        {/* This button is a placeholder until the filters are implemented */}
        <Button>Filters</Button>

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
          }))}
          onEndReached={infiniteSearchQuery.fetchNextPage}
        />
      </View>
    </View>
  );
};
