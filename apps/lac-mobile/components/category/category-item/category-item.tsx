import { API_BASE_URL, API_KEY } from "@/lib/constants";
import useSuspenseProductLandingCategory from "@repo/shared-logic/apis/hooks/category/use-suspense-product-landing-category.hook";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { Pressable } from "react-native";
import { Button, Text, XStack } from "tamagui";

type CategoryItemProps = {
  readonly category: string;
  readonly categoryId: string;
  readonly link: string;
} & ComponentProps<typeof XStack>;

const CategoryItem = ({
  category,
  categoryId,
  link,
  ...style
}: CategoryItemProps) => {
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

  const linkUrl = data && data.length > 0 ? link : `/category/${categoryId}`;

  return (
    <Link href={linkUrl} asChild>
      <Pressable>
        <XStack
          flex={1}
          borderBottomWidth={1}
          borderBottomColor="$gray6"
          paddingVertical={15}
          alignItems="center"
          justifyContent="space-between"
          {...style}
        >
          <Text flex={1} fontSize="$5" color="#171717" numberOfLines={1}>
            {category}
          </Text>
          {!!data && data.length > 0 && (
            <Button
              disabled
              icon={ChevronRight}
              size={35}
              backgroundColor="$colorTransparent"
              paddingRight={5}
              marginVertical={-6}
            />
          )}
        </XStack>
      </Pressable>
    </Link>
  );
};

export default CategoryItem;
