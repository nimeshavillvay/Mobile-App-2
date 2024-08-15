import { Image } from "expo-image";
import type { ComponentProps } from "react";
import { Dimensions } from "react-native";
import Carousel, {
  type TCarouselProps,
} from "react-native-reanimated-carousel";
import YoutubePlayer from "react-native-youtube-iframe";
import { Button, View } from "tamagui";

type ProductImage = {
  img: string;
  alt: string;
  url: string;
  type: string;
};

export const ProductCarousel = ({
  scrollAnimationDuration = 100,
  ...delegated
}: TCarouselProps<ProductImage>) => {
  const defaultWidth = Dimensions.get("window").width;

  return (
    <Carousel
      loop={false}
      width={defaultWidth}
      height={defaultWidth}
      scrollAnimationDuration={scrollAnimationDuration}
      {...delegated}
    />
  );
};

export const ProductCarouselItem = ({
  image,
  alt,
  width,
  height,
  type,
  url,
  onPress,
}: {
  readonly image: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly type: string;
  readonly url: string;
  readonly onPress: () => void;
}) => {
  return (
    <View flex={1}>
      {type === "VIDEO" ? (
        <VideoPlayer
          videoUrl={url}
          flex={1}
          height={height}
          width={width}
          backgroundColor="black"
          justifyContent="center"
        />
      ) : (
        <Button flex={1} onPress={onPress}>
          <Image
            source={image}
            alt={alt}
            contentFit="cover"
            style={{ width, height }}
          />
        </Button>
      )}
    </View>
  );
};

const VideoPlayer = ({
  videoUrl,
  ...style
}: { readonly videoUrl: string } & ComponentProps<typeof View>) => {
  //Regex to get the video id from any YouTube video
  const regex =
    /(https?:\/\/)?(((m|www)\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
  const videoId = videoUrl.match(regex)?.[8];

  const screenWidth = Dimensions.get("window").width;
  const height = (screenWidth * 9) / 16;

  return (
    <View {...style}>
      <YoutubePlayer height={height} videoId={videoId} />
    </View>
  );
};

export const ProductCarouselPagination = ({
  data,
  index,
}: {
  readonly data: ProductImage[];
  readonly index: number;
}) => {
  return (
    <View
      flex={1}
      position="absolute"
      bottom={50}
      flexDirection="row"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      {data.map((_, idx) => {
        let width = 12;
        let height = 12;
        let color = "$gray6";

        if (idx === index) {
          width = 16;
          height = 16;
          color = "white";
        }

        return (
          <View
            key={idx}
            width={width}
            height={height}
            borderRadius={12}
            backgroundColor={color}
            marginHorizontal={3}
          />
        );
      })}
    </View>
  );
};
