import { Image } from "expo-image";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import type { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Text, View, XStack, YStack } from "tamagui";

export const SearchProductSkeleton = () => {
  return (
    <MotiView>
      <Skeleton height={80} width="100%" colorMode="light" />
    </MotiView>
  );
};

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
      <View borderColor="lightgray" borderWidth={1} borderRadius={4}>
        <Image
          testID="search-product-image"
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />
      </View>
      <YStack flex={1} h="100%">
        <XStack pb={10}>
          <Text numberOfLines={3}>{title}</Text>
        </XStack>
        <XStack gap={10}>
          <Text color="$gray10">Item #</Text>
          <Text color="$gray10">{itemNo}</Text>
        </XStack>
      </YStack>
    </XStack>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
});
