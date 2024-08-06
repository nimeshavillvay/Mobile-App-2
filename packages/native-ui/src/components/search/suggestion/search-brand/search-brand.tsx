import { Image } from "expo-image";
import { Link } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { type ComponentProps } from "react";
import { Text, XStack } from "tamagui";

export const SearchBrandSkeleton = () => {
  return (
    <MotiView>
      <Skeleton height={40} width="20%" colorMode="light" />
    </MotiView>
  );
};

type SearchBrandProps = {
  readonly imageUrl?: string;
  readonly brandName: string;
  readonly link: string;
} & ComponentProps<typeof XStack>;

export const SearchBrand = ({
  imageUrl,
  brandName,
  link,
  ...style
}: SearchBrandProps) => {
  return (
    <Link href={link}>
      <XStack
        flex={1}
        alignItems="center"
        gap={10}
        borderWidth={1}
        borderColor="#E5E7EB"
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
    </Link>
  );
};
