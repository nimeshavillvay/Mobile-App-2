import type { ComponentProps } from "react";
import { Pressable } from "react-native";
import { Image, Text, XStack } from "tamagui";

type SearchBrandProps = {
  readonly imageUrl: string;
  readonly brandName: string;
} & ComponentProps<typeof XStack>;

export const SearchBrand = ({
  imageUrl,
  brandName,
  ...style
}: SearchBrandProps) => {
  return (
    <Pressable>
      <XStack
        flex={1}
        alignItems="center"
        gap={10}
        borderWidth={1}
        p={10}
        pressStyle={{ backgroundColor: "$blue3" }}
        {...style}
      >
        <Image
          testID="brand-image"
          source={{
            uri: imageUrl,
          }}
          style={{ height: 20, width: 20 }}
        />
        <Text>{brandName}</Text>
      </XStack>
    </Pressable>
  );
};
