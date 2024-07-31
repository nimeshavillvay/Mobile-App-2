import BrandSearchList from "@/components/search/brand-search-list";
import CategorySearchList from "@/components/search/category-search-list";
import ProductSearchList from "@/components/search/product-search-list";
import { SEARCH_API_BASE_URL } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { SearchBox } from "@repo/native-ui/components/search/search-box";
import { SearchModalLayout } from "@repo/native-ui/components/search/search-modal-layout";
import { SearchBrandSkeleton } from "@repo/native-ui/components/search/suggestion/search-brand";
import { SearchCategorySkeleton } from "@repo/native-ui/components/search/suggestion/search-category";
import { SearchProductSkeleton } from "@repo/native-ui/components/search/suggestion/search-product";
import type {
  brandDataSchema,
  categoryDataSchema,
  productDataSchema,
} from "@repo/shared-logic/apis/base/elasticsearch/get-multisearch-results";
import useSuspenseMultiSearch from "@repo/shared-logic/apis/hooks/elasticsearch/use-suspense-multi-search.hook";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { Suspense, useDeferredValue } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { Form, Text, View, YStack } from "tamagui";
import { z } from "zod";

const FALLBACK_ARRAY = Array.from(Array(5).keys());

const searchSchema = z.object({
  searchInput: z.string(),
});

const Search = () => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    values: {
      searchInput: "",
    },
  });

  const clearSearchTerm = () => {
    form.reset();
  };

  const searchQuery = form.watch("searchInput");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const handleSubmit = form.handleSubmit((data) => {
    const searchParams = new URLSearchParams({
      query: data.searchInput,
    });

    router.replace(`/search-results?${searchParams.toString()}`);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader title="Search" type="search" />
      <Form style={{ paddingHorizontal: 12 }}>
        <Controller
          control={form.control}
          name="searchInput"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <SearchBox
              testID="search-input"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="What are you looking for?"
              onSubmit={handleSubmit}
              onClear={clearSearchTerm}
            />
          )}
        />
      </Form>
      <SearchModalLayout>
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchSuggestionsList query={deferredSearchQuery} />
        </Suspense>
      </SearchModalLayout>
    </SafeAreaView>
  );
};

const SearchSuggestionsList = ({ query }: { readonly query: string }) => {
  const { data } = useSuspenseMultiSearch(
    {
      baseUrl: SEARCH_API_BASE_URL,
    },
    query,
  );

  return (
    <YStack flex={1} mt={20} paddingHorizontal={10}>
      {data.products.summary.total > 0 && (
        <View flex={1} mb={40} minHeight={10}>
          <ProductSearch
            summary={data.products.summary}
            results={data.products.results.slice(0, 5)}
          />
        </View>
      )}

      {data.categories.summary.total > 0 && (
        <YStack flex={1} mb={40} minHeight={10}>
          <Text fontSize="$8" mb={20}>
            Categories for "{query}"
          </Text>

          <CategorySearch
            summary={data.categories.summary}
            results={data.categories.results.slice(0, 5)}
          />
        </YStack>
      )}

      {data.brands.summary.total > 0 && (
        <YStack flex={1} mb={40} minHeight={10}>
          <Text fontSize="$8" mb={20}>
            Brands for "{query}"
          </Text>

          <BrandSearch
            summary={data.brands.summary}
            results={data.brands.results.slice(0, 5)}
          />
        </YStack>
      )}
    </YStack>
  );
};

const SearchResultsSkeleton = () => {
  return (
    <YStack gap={40} mt={20}>
      <FlashList
        data={FALLBACK_ARRAY}
        horizontal={false}
        ItemSeparatorComponent={() => {
          return <View marginVertical={5} />;
        }}
        renderItem={() => <SearchProductSkeleton />}
        estimatedItemSize={5}
      />
      <FlashList
        data={FALLBACK_ARRAY}
        horizontal={false}
        ItemSeparatorComponent={() => {
          return <View marginVertical={5} />;
        }}
        renderItem={() => <SearchCategorySkeleton />}
        estimatedItemSize={5}
      />
      <FlashList
        data={FALLBACK_ARRAY}
        horizontal={true}
        ItemSeparatorComponent={() => {
          return <View px={5} />;
        }}
        renderItem={() => <SearchBrandSkeleton />}
        estimatedItemSize={5}
      />
    </YStack>
  );
};

const ProductSearch = ({
  results: products,
}: z.infer<typeof productDataSchema>) => {
  return (
    <ProductSearchList
      data={products.map((product) => ({
        imageUrl: product.itemImage,
        title: product.productTitle,
        itemNo: product.materialNumber,
      }))}
    />
  );
};

const CategorySearch = ({
  results: categories,
}: z.infer<typeof categoryDataSchema>) => {
  return (
    <CategorySearchList
      data={categories.map((category) => ({
        category: category.categoryPath,
        link: category.slug,
      }))}
    />
  );
};

const BrandSearch = ({ results: brands }: z.infer<typeof brandDataSchema>) => {
  return (
    <BrandSearchList
      data={brands.map((brand) => ({
        brandName: brand.brandName,
        imageUrl: brand.brandImage,
        link: brand.slug,
      }))}
    />
  );
};

export default Search;
