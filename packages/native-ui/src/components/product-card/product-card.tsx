import { Bookmark } from "@tamagui/lucide-icons";
import { Image, type ImageProps } from "expo-image";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useId } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, H2, Text, XStack, YStack } from "tamagui";

type ProductCardProps = Readonly<{
  productId: number;
  image: ImageProps["source"];
  title?: string;
  sku?: string;
  brand?: string;
  noOfVariants?: number;
  price: number;
  listPrice: number;
  uom: string;
}>;

const styles = StyleSheet.create({
  image: {
    width: 132,
    height: 132,
    aspectRatio: 1,
  },
  brand: {
    paddingVertical: 4,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
  },
  sku: {
    marginBottom: 5,
    fontSize: 13,
    fontWeight: 400,
    color: "#74767B",
  },
  price: {
    color: "rgba(0,0,0,0.91)",
    fontSize: 16,
    fontWeight: 700,
  },
  priceValue: {
    color: "rgba(0,0,0,0.91)",
    fontSize: 18,
    fontWeight: 700,
  },
  previousPrice: {
    color: "rgba(0,0,0,0.22)",
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  uom: {
    color: "rgba(0,0,0,0.91)",
    fontSize: 13,
  },
  saleText: {
    color: "#236E4A",
  },
  discountLabelText: {
    color: "#236E4A",
    fontSize: 12,
    lineHeight: 12,
  },
  variations: {
    color: "rgba(0, 0, 0, 0.48)",
    fontSize: 13,
  },
});

export const ProductCardSkeleton = () => {
  const id = useId();

  return (
    <MotiView testID={`product-card-skeleton-${id}`}>
      <Skeleton height={300} width="100%" colorMode="light" />
    </MotiView>
  );
};

export const ProductCard = ({
  brand,
  image,
  title,
  sku,
  price,
  listPrice,
  uom,
  noOfVariants,
}: ProductCardProps) => {
  const id = useId();
  const isDiscounted = price < listPrice;
  const discountPercentage = isDiscounted
    ? Math.ceil(((listPrice - price) / listPrice) * 100)
    : 0;

  return (
    <Card backgroundColor="$colorTransparent" flex={1}>
      <XStack height="$1.5">
        {!!isDiscounted && discountPercentage > 0 && (
          <XStack
            backgroundColor="#E5FBEB"
            paddingHorizontal={10}
            height="$1.5"
            alignItems="center"
            gap="$0.5"
            borderRadius={8}
            testID={`discount-label-${id}`}
          >
            <Text
              style={styles.discountLabelText}
              fontWeight={700}
              testID={`discount-amount-${id}`}
            >
              {discountPercentage}%
            </Text>

            <Text style={styles.discountLabelText}>off</Text>
          </XStack>
        )}

        <Button
          icon={<Bookmark size={16} />}
          size={28}
          circular
          backgroundColor="white"
          borderWidth={1}
          borderColor="#E2E2E2"
          testID={`add-to-list-${id}`}
          position="absolute"
          top={0}
          right={0}
        />
      </XStack>

      <XStack gap={8}>
        <Image
          style={styles.image}
          source={image}
          contentFit="contain"
          testID={`product-image-${id}`}
        />

        <YStack gap={10} flex={1}>
          {!!brand && (
            <Text style={styles.brand} testID={`brand-${id}`}>
              {brand}
            </Text>
          )}

          {!!title && (
            <H2 numberOfLines={3} style={styles.title}>
              {title}
            </H2>
          )}

          {!!sku && (
            <Text style={styles.sku} testID={`sku-${id}`}>
              {sku}
            </Text>
          )}

          <XStack justifyContent="space-between" alignItems="center">
            <Text verticalAlign="center">
              <Text style={[styles.price, isDiscounted && styles.saleText]}>
                $
              </Text>
              <Text
                style={[styles.priceValue, isDiscounted && styles.saleText]}
                testID={`price-${id}`}
              >
                {price}
              </Text>

              {!!isDiscounted && (
                <Text
                  style={styles.previousPrice}
                  testID={`previous-price-${id}`}
                >
                  ${listPrice}
                </Text>
              )}

              <Text style={styles.uom} testID={`uom-${id}`}>
                /{uom}
              </Text>
            </Text>

            {!!noOfVariants && (
              <Text style={styles.variations} testID={`variations-${id}`}>
                {noOfVariants} {noOfVariants > 1 ? "Variations" : "Variation"}
              </Text>
            )}
          </XStack>
        </YStack>
      </XStack>
    </Card>
  );
};
