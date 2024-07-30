import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import type { ComponentProps } from "react";
import { Text, XStack } from "tamagui";

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
      <Link testID="link" href={link} style={{ color: "#CC0000" }}>
        {category}
      </Link>
    </XStack>
  );
};
