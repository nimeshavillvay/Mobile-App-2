import type { ComponentProps } from "react";
import { Image, Text, View, XStack, YStack } from "tamagui";

type SearchProductProps = {
  readonly imageUrl: string;
  readonly title: string;
  readonly itemNo: string;
} & ComponentProps<typeof XStack>;

export const SearchProduct = ({
  imageUrl,
  title,
  itemNo,
  ...style
}: SearchProductProps) => {
  return (
    <XStack
      testID="search-product-container"
      flex={1}
      alignItems="center"
      gap={20}
      w="100%"
      py={5}
      {...style}
    >
      <View borderColor="lightgray" borderWidth={1}>
        <Image
          testID="search-product-image"
          h={80}
          w={80}
          source={{
            uri: imageUrl,
          }}
        />
      </View>
      <YStack flex={1} justifyContent="space-between" h="100%">
        <XStack flex={1}>
          <Text numberOfLines={3}>{title}</Text>
        </XStack>
        <XStack alignItems="flex-end" flex={1} gap={10}>
          <Text color="$gray10">Item #</Text>
          <Text color="$gray10">{itemNo}</Text>
        </XStack>
      </YStack>
    </XStack>
  );
};
