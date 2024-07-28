import ProductsList from "@/components/products-list";
import useSessionTokenStorage from "@/hooks/auth/use-session-token-storage.hook";
import { SEARCH_API_BASE_URL } from "@/lib/constants";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import useSuspenseInfiniteSearchResults from "@repo/shared-logic/apis/hooks/elasticsearch/use-suspense-infinite-search-results.hook";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router/stack";
import { Suspense } from "react";
import { StyleSheet } from "react-native";
import { H1, Text } from "tamagui";

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
        <ScreenHeader title="" hideSearchButton hideBarcodeScanner />

        <H1 style={styles.heading}>Search Results for "{searchQuery}"</H1>

        <Suspense fallback={<Text>loading...</Text>}>
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
  const token = useSessionTokenStorage((state) => state.token);
  const { data, fetchNextPage } = useSuspenseInfiniteSearchResults(
    { baseUrl: SEARCH_API_BASE_URL },
    query,
  );

  const products = data.pages.flatMap((page) => page.results);

  return (
    <ProductsList
      data={products.map((product) => ({
        productId: product.id,
        title: product.productTitle,
        sku: product.groupId,
        image: product.itemImage,
        uom: product.uom ?? "",
      }))}
      token={token}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
    />
  );
};
