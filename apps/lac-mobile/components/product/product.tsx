import { Bookmark, Upload, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Dimensions } from "react-native";
import { Button, View, XStack } from "tamagui";

export const ProductDetailsSkeleton = () => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <MotiView style={{ flex: 1, gap: 20, marginHorizontal: 20 }}>
      <Skeleton
        width={screenWidth - 40}
        height={screenWidth - 40}
        colorMode="light"
      />
      <MotiView style={{ gap: 5 }}>
        <Skeleton width="100%" height={25} colorMode="light" />
        <Skeleton width={screenWidth * 0.7} height={25} colorMode="light" />
      </MotiView>

      <Skeleton width="50%" height={50} colorMode="light" />
      <MotiView style={{ gap: 5 }}>
        <Skeleton width="30%" height={30} colorMode="light" />
        <Skeleton width="100%" height={150} colorMode="light" />
      </MotiView>
    </MotiView>
  );
};

export const ProductAction = ({ width }: { readonly width: number }) => {
  return (
    <View
      flex={1}
      position="absolute"
      top={20}
      left={20}
      right={40}
      flexDirection="row"
      justifyContent="space-between"
      width={width - 40}
    >
      <Button
        circular
        icon={X}
        padding={20}
        backgroundColor="white"
        height={40}
        width={40}
        shadowColor="$gray12"
        shadowOpacity={0.8}
        shadowRadius={2}
        shadowOffset={{ height: 3, width: 3 }}
        elevation={10}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          }
        }}
      />
      <XStack gap={10}>
        <Button
          circular
          icon={Bookmark}
          padding={20}
          backgroundColor="white"
          height={40}
          width={40}
          shadowColor="$gray12"
          shadowOpacity={0.8}
          shadowRadius={2}
          shadowOffset={{ height: 3, width: 3 }}
          elevation={10}
        />
        <Button
          circular
          icon={Upload}
          padding={20}
          backgroundColor="white"
          height={40}
          width={40}
          shadowColor="$gray12"
          shadowOpacity={0.8}
          shadowRadius={2}
          shadowOffset={{ height: 3, width: 3 }}
          elevation={10}
        />
      </XStack>
    </View>
  );
};
