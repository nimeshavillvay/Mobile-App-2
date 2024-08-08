import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { SubCategoriesList as SubCategoriesListPrimitive } from "@repo/native-ui/components/category/sub-categories-list";
import useSuspenseProductLandingCategory from "@repo/shared-logic/apis/hooks/category/use-suspense-product-landing-category.hook";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router/stack";
import { Suspense } from "react";
import { H1, View } from "tamagui";

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

        <Suspense>
          <CategoryPageHeader id={id} />

          <SubCategoriesList id={id} />
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
