import { type ProductStatus } from "@repo/shared-logic/zod-schema/product";
import { Bookmark } from "@tamagui/lucide-icons";
import { Image, type ImageProps } from "expo-image";
import { Link } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useId, type ComponentProps } from "react";
import { Pressable, StyleSheet } from "react-native";
import { AlertDialog, Button, Card, H2, Text, XStack, YStack } from "tamagui";

type ProductCardProps = Readonly<{
  productId: number;
  image: ImageProps["source"];
  title?: string;
  sku?: string;
  price: number;
  listPrice: number;
  uom: string;
  link: string;
  status?: ProductStatus;
  handleDiscontinuedPressed: () => void;
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
  image,
  title,
  sku,
  price,
  listPrice,
  uom,
  link,
  status = "active",
  handleDiscontinuedPressed,
}: ProductCardProps) => {
  const id = useId();
  const isDiscounted = price < listPrice;
  const discountPercentage = isDiscounted
    ? Math.ceil(((listPrice - price) / listPrice) * 100)
    : 0;

  return (
    <Card backgroundColor="$colorTransparent" flex={1} padding={12}>
      <YStack gap="$2" alignItems="flex-start" justifyContent="center">
        <PressHandler
          href={link}
          productStatus={status}
          handleDiscontinuedPressed={handleDiscontinuedPressed}
        >
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
        </PressHandler>

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
  );
};

const PressHandler = ({
  children,
  productStatus,
  handleDiscontinuedPressed,
  ...delegated
}: Omit<ComponentProps<typeof Link>, "asChild"> & {
  readonly productStatus: ProductStatus;
  readonly handleDiscontinuedPressed: () => void;
}) => {
  if (productStatus === "discontinued") {
    return (
      <AlertDialog>
        <AlertDialog.Trigger asChild>
          <Pressable style={{ flex: 1 }} testID="discontinued-alert-button">
            {children}
          </Pressable>
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            bordered
            elevate
            key="content"
            animation={[
              "quick",
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            x={0}
            scale={1}
            opacity={1}
            y={0}
          >
            <YStack gap={24}>
              <AlertDialog.Title
                style={{
                  color: "#171717",
                  fontSize: 20,
                  lineHeight: 24,
                  fontWeight: 700,
                }}
              >
                Discontinued
              </AlertDialog.Title>

              <AlertDialog.Description
                style={{
                  color: "#171717",
                  fontSize: 13,
                }}
              >
                We&apos;re sorry, that product has been discontinued. Would you
                like to go its category to find a substitute?
              </AlertDialog.Description>

              <XStack gap="$3" justifyContent="flex-end">
                <AlertDialog.Cancel asChild>
                  <Button
                    style={{
                      borderWidth: 1,
                      borderColor: "#E2E2E2",
                      borderRadius: 7,
                      backgroundColor: "transparent",
                      color: "#171717",
                      fontSize: 16,
                    }}
                  >
                    No
                  </Button>
                </AlertDialog.Cancel>

                <AlertDialog.Action asChild>
                  <Button
                    theme="active"
                    style={{
                      borderRadius: 7,
                      backgroundColor: "#282828",
                      color: "#EDEDED",
                      fontSize: 16,
                    }}
                    onPress={handleDiscontinuedPressed}
                    testID="yes-button"
                  >
                    Yes
                  </Button>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    );
  }

  return (
    <Link asChild {...delegated}>
      <Pressable style={{ flex: 1 }}>{children}</Pressable>
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
