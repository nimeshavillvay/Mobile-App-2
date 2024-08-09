import CategoryItem from "@/components/category/category-item";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import useSuspenseProductLandingCategory from "@repo/shared-logic/apis/hooks/category/use-suspense-product-landing-category.hook";
import { Stack, useLocalSearchParams } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { type ComponentProps, Suspense } from "react";
import { ScrollView, YStack } from "tamagui";

const FALLBACK_ARRAY = Array.from(Array(5).keys());

const SubCategoryViewSkeleton = () => {
  return (
    <MotiView style={{ gap: 10, marginHorizontal: 15 }}>
      {FALLBACK_ARRAY.map((item) => (
        <Skeleton key={item} height={60} width="100%" colorMode="light" />
      ))}
    </MotiView>
  );
};

type SubCategoryViewProps = {
  readonly categoryId: string;
} & ComponentProps<typeof YStack>;

const SubCategoryView = ({ categoryId, ...style }: SubCategoryViewProps) => {
  const {
    data: {
      mainCategory: { subCategories: data },
    },
  } = useSuspenseProductLandingCategory(
    {
      baseUrl: API_BASE_URL,
      apiKey: API_KEY,
    },
    categoryId,
  );

  if (!data) {
    return null;
  }

  return (
    <ScrollView>
      <YStack flex={1} marginHorizontal={20} {...style}>
        {data.map((category) => (
          <CategoryItem
            key={category.id}
            category={category.title}
            categoryId={category.id.toString()}
            link={`/browse-categories/${category.id}?title=${category.title}`}
          />
        ))}
      </YStack>
    </ScrollView>
  );
};

const BrowseSubCategoriesPage = () => {
  const localSearchParams = useLocalSearchParams<{
    id: string;
    title: string;
  }>();
  const id = localSearchParams.id?.toString();
  const title = localSearchParams.title?.toString();

  if (!id || !title) {
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
        <ScreenHeader title={title} type="center-aligned" hideSearchButton />
        <Suspense fallback={<SubCategoryViewSkeleton />}>
          <SubCategoryView categoryId={id} />
        </Suspense>
      </ScreenLayout>
    </>
  );
};

export default BrowseSubCategoriesPage;
