import type { Banner } from "@repo/shared-logic/zod-schema/banner";
import { Image } from "expo-image";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { useId } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Carousel, {
  type TCarouselProps,
} from "react-native-reanimated-carousel";
import { Button, View } from "tamagui";

const styles = StyleSheet.create({
  carousel: {
    backgroundColor: "#F7F8FA",
  },
});

export const BannersCarouselSkeleton = () => {
  const id = useId();
  const width = Dimensions.get("window").width;

  return (
    <MotiView testID={`banners-carousel-skeleton-${id}`}>
      <Skeleton width={width} height={width / 2} colorMode="light" />
    </MotiView>
  );
};

export const BannersCarousel = ({
  loop = true,
  autoPlay = true,
  scrollAnimationDuration = 1000,
  autoPlayInterval = 5000,
  style = styles.carousel,
  ...delegated
}: TCarouselProps<Banner["banners"][number]>) => {
  const defaultWidth = Dimensions.get("window").width;

  return (
    <Carousel
      loop={loop}
      width={defaultWidth}
      height={defaultWidth / 2}
      autoPlay={autoPlay}
      scrollAnimationDuration={scrollAnimationDuration}
      autoPlayInterval={autoPlayInterval}
      style={style}
      {...delegated}
    />
  );
};

export const BannersCarouselItem = ({
  image,
  alt,
  width,
  height,
  onPress,
}: {
  readonly image: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly onPress: () => void;
}) => {
  return (
    <View
      flex={1}
      paddingHorizontal={16}
      paddingVertical={24}
      justifyContent="center"
      testID="banner-carousel-item"
    >
      <Button onPress={onPress}>
        <Image
          source={image}
          alt={alt}
          contentFit="contain"
          style={{ width, height }}
        />
      </Button>
    </View>
  );
};
