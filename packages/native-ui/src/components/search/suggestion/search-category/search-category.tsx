import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import type { ComponentProps } from "react";
import { Text, XStack } from "tamagui";

export const SearchCategorySkeleton = () => {
  return (
    <MotiView>
      <Skeleton height={40} width="100%" colorMode="light" />
    </MotiView>
  );
};

type SearchCategoryProps = {
  readonly category: string;
  readonly link: string;
} & ComponentProps<typeof XStack>;

export const SearchCategory = ({
  category,
  link,
  ...style
}: SearchCategoryProps) => {
  return (
    <XStack testID="x-stack" alignItems="center" gap={10} {...style}>
      <Feather
        testID="feather-icon"
        name="corner-down-right"
        size={20}
        color="#74767B"
      />
      <Link testID="link" href={link}>
        <Text testID="text" color="#CC0000" lineHeight={20}>
          {category}
        </Text>
      </Link>
    </XStack>
  );
};
