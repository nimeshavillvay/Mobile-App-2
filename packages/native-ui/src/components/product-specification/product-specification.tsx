import type { ComponentProps } from "react";
import { Text, XStack, YStack } from "tamagui";

type ProductSpecificationType = {
  readonly data: { attribute_name: string; attribute_value: string | null }[];
} & ComponentProps<typeof YStack>;

export const ProductSpecification = ({
  data,
  ...styles
}: ProductSpecificationType) => {
  return (
    <YStack gap={5} {...styles}>
      <Text fontSize="$6" fontWeight={900} paddingBottom={10}>
        Specifications
      </Text>

      {data.map((item) => (
        <XStack
          key={item.attribute_name}
          borderBottomWidth={1}
          borderBottomColor="$gray6"
          paddingBottom={5}
        >
          <Text flex={1} fontSize="$5" paddingRight={20} numberOfLines={1}>
            {item.attribute_name}
          </Text>
          <Text flex={1} fontSize="$5" paddingRight={20} numberOfLines={1}>
            {item.attribute_value ?? ""}
          </Text>
        </XStack>
      ))}
    </YStack>
  );
};
