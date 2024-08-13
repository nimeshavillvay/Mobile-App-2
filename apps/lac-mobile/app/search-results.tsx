import ProductsList from "@/components/products-list";
import { SEARCH_API_BASE_URL } from "@/lib/constants";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { ProductCardSkeleton } from "@repo/native-ui/components/product-card";
import useSuspenseInfiniteSearchResults from "@repo/shared-logic/apis/hooks/elasticsearch/use-suspense-infinite-search-results.hook";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router/stack";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
// eslint-disable-next-line no-restricted-imports
import { Suspense, useDeferredValue, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { H1, Text, XStack } from "tamagui";

const FALLBACK_ARRAY = Array.from(Array(24).keys());

const SearchResultPage = () => {
  const { query } = useLocalSearchParams();
  const searchQuery = query?.toString() ?? "";

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScreenLayout>
        <ScreenHeader title="" hideSearchButton />

        <H1 style={styles.heading}>Search Results for "{searchQuery}"</H1>

        <Suspense
          fallback={
            <>
              <XStack
                height={58}
                paddingHorizontal={16}
                paddingVertical={7}
                justifyContent="flex-end"
              >
                <MotiView>
                  <Skeleton height={14} width={350} colorMode="light" />
                </MotiView>
              </XStack>

              <FlashList
                data={FALLBACK_ARRAY}
                horizontal={false}
                numColumns={2}
                renderItem={() => <ProductCardSkeleton />}
                estimatedItemSize={300}
              />
            </>
          }
        >
          <SearchResultsList query={searchQuery} />
        </Suspense>
      </ScreenLayout>
    </>
  );
};

export default SearchResultPage;

const styles = StyleSheet.create({
  heading: {
    padding: 16,
    paddingBottom: 24,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 400,
  },
});

const SearchResultsList = ({ query }: { readonly query: string }) => {
  const [searchParams, setSearchParams] = useState<string | undefined>(
    undefined,
  );

  const deferredQuery = useDeferredValue(query);
  const deferredSearchParams = useDeferredValue(searchParams);

  const { data, fetchNextPage } = useSuspenseInfiniteSearchResults(
    { baseUrl: SEARCH_API_BASE_URL },
    { query: deferredQuery, searchParams: deferredSearchParams },
  );

  const firstPageSearchParams = data?.pages[0]?.summary.searchParams;

  useEffect(() => {
    // This useEffect is used to store the searchParams value from the 1st page
    // used to optimize the queries from the subsequent pages. It can't be derived
    // from the result because it needs to be passed back to the query.
    // The result of it being like this means that the 1st page will be fetched
    // twice since the key changes after the "searchParams" is set.
    setSearchParams(firstPageSearchParams);
  }, [firstPageSearchParams]);

  const products = data.pages.flatMap((page) => page.results);
  const deferredProducts = useDeferredValue(products);

  const numberOfProducts = data.pages[0]?.summary.total ?? 0;

  return (
    <>
      <XStack
        height={58}
        paddingHorizontal={16}
        paddingVertical={7}
        justifyContent="flex-end"
      >
        <Text color="#7E7E7E" fontSize={14} testID="total-search-results">
          {numberOfProducts} {numberOfProducts === 1 ? "product" : "products"}
        </Text>
      </XStack>

      <ProductsList
        data={deferredProducts.map((product) => ({
          productId: product.id,
          title: product.productTitle,
          sku: product.materialNumber,
          image: product.itemImage,
          uom: product.uom ?? "",
        }))}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};
