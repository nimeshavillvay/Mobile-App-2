import { ProductAction } from "@/components/product";
import {
  ProductCarousel,
  ProductCarouselItem,
  ProductCarouselPagination,
} from "@repo/native-ui/components/product";
import { Stack } from "expo-router";
import { useState } from "react";
import { Dimensions } from "react-native";
import ImageView from "react-native-image-viewing";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "tamagui";

//Placeholder data until API integration
const imageData = [
  {
    img: "https://xcart.wurthlac.com/images/D/EN07125120TG2_1.png",
    alt: "Elgi EN07-125-120T-G2 10 HP 208/230/460 Volt Three Phase Rotary Screw Air Compressor Compressor 120 Gallon Horizontal Tank Mount with Dryer- 125 psi",
    url: "",
    type: "IMAGE",
  },
  {
    img: "https://xcart.wurthlac.com/images/D/EN07125120TG2_2.png",
    alt: "Elgi EN07-125-120T-G2 10 HP 208/230/460 Volt Three Phase Rotary Screw Air Compressor Compressor 120 Gallon Horizontal Tank Mount with Dryer- 125 psi",
    url: "",
    type: "IMAGE",
  },
  {
    img: "https://xcart.wurthlac.com/images/D/EN07125120TG2_3.png",
    alt: "Elgi EN07-125-120T-G2 10 HP 208/230/460 Volt Three Phase Rotary Screw Air Compressor Compressor 120 Gallon Horizontal Tank Mount with Dryer- 125 psi",
    url: "",
    type: "IMAGE",
  },
  {
    img: "https://xcart.wurthlac.com/images/PA/0_ec2ca.png",
    alt: "Elgi Infrastructure",
    url: "www.youtube.com/embed/KmmI8cUG6DI",
    type: "VIDEO",
  },
];

const Product = () => {
  const [index, setIndex] = useState(0);
  const [imageOverlayVisible, setImageOverlayVisible] = useState(false);

  const screenWidth = Dimensions.get("window").width;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView flex={1} backgroundColor="white">
          <View flex={1}>
            <ProductCarousel
              width={screenWidth}
              height={screenWidth}
              data={imageData}
              renderItem={({ item }) => (
                <ProductCarouselItem
                  image={item.img}
                  alt={item.alt}
                  width={screenWidth}
                  height={screenWidth}
                  type={item.type}
                  url={item.url}
                  onPress={() => setImageOverlayVisible(true)}
                />
              )}
              onScrollEnd={(index) => {
                setIndex(index);
              }}
            />
            <ProductAction width={screenWidth} />
            <ProductCarouselPagination data={imageData} index={index} />
          </View>
          <ImageView
            images={[{ uri: imageData[index]?.img }]}
            imageIndex={0}
            visible={imageOverlayVisible}
            onRequestClose={() => setImageOverlayVisible(false)}
            presentationStyle="overFullScreen"
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Product;
