import CategoryItem from "@/components/category/category-item";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import useSuspenseCategoryList from "@repo/shared-logic/apis/hooks/category/use-suspense-category-list.hook";
import { Stack } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { type ComponentProps, Suspense } from "react";
import { ScrollView, YStack } from "tamagui";

const FALLBACK_ARRAY = Array.from(Array(5).keys());

const MainCategoryViewSkeleton = () => {
  return (
    <MotiView style={{ gap: 10, marginHorizontal: 15 }}>
      {FALLBACK_ARRAY.map((item) => (
        <Skeleton key={item} height={60} width="100%" colorMode="light" />
      ))}
    </MotiView>
  );
};

const MainCategoryView = (style: ComponentProps<typeof YStack>) => {
  const { data } = useSuspenseCategoryList(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
    },
    "1",
  );

  return (
    <ScrollView>
      <YStack flex={1} marginHorizontal={20} {...style}>
        {data.map((category) => (
          <CategoryItem
            key={category.name}
            category={category.name}
            categoryId={category.id}
            link={`/browse-categories/${category.id}?title=${category.name}`}
          />
        ))}
      </YStack>
    </ScrollView>
  );
};

const BrowseCategoriesPage = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScreenLayout>
        <ScreenHeader
          title="All Categories"
          type="center-aligned"
          hideSearchButton
        />
        <Suspense fallback={<MainCategoryViewSkeleton />}>
          <MainCategoryView />
        </Suspense>
      </ScreenLayout>
    </>
  );
};

export default BrowseCategoriesPage;
