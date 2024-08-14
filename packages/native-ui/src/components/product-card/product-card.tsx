import { Bookmark } from "@tamagui/lucide-icons";
import { Image, type ImageProps } from "expo-image";
import { Link } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useId } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Button, Card, H2, Text, XStack, YStack } from "tamagui";

type ProductCardProps = Readonly<{
  productId: number;
  slug: string;
  image: ImageProps["source"];
  title?: string;
  sku?: string;
  price: number;
  listPrice: number;
  uom: string;
}>;

export const ProductCardSkeleton = () => {
  const id = useId();

  return (
    <MotiView testID={`product-card-skeleton-${id}`}>
      <Skeleton height={300} width="100%" colorMode="light" />
    </MotiView>
  );
};

export const ProductCard = ({
  productId,
  slug,
  image,
  title,
  sku,
  price,
  listPrice,
  uom,
}: ProductCardProps) => {
  const id = useId();
  const isDiscounted = price < listPrice;
  const discountPercentage = isDiscounted
    ? Math.ceil(((listPrice - price) / listPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${productId}/${slug}`} asChild>
      <Pressable style={{ flex: 1 }}>
        <Card backgroundColor="$colorTransparent" flex={1} padding={12}>
          <YStack gap="$2" alignItems="flex-start" justifyContent="center">
            <Image
              style={styles.image}
              source={image}
              contentFit="contain"
              testID={`product-image-${id}`}
            />
            {!!title && (
              <H2 numberOfLines={2} style={styles.title}>
                {title}
              </H2>
            )}
            {!!sku && (
              <Text style={styles.sku} testID={`sku-${id}`}>
                {sku}
              </Text>
            )}
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
            <XStack
              position="absolute"
              left="$0"
              top="$0"
              right="$0"
              flexDirection="row-reverse"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Button
                icon={<Bookmark size={16} />}
                size={28}
                circular
                backgroundColor="white"
                borderWidth={1}
                borderColor="#E2E2E2"
                testID={`add-to-list-${id}`}
              />
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
            </XStack>
          </YStack>
        </Card>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
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
});
