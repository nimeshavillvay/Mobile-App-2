import { Bookmark, Upload, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button, View, XStack } from "tamagui";

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
        icon={X}
        padding={20}
        backgroundColor="white"
        height={40}
        width={40}
        borderRadius={80}
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
          icon={Bookmark}
          padding={20}
          backgroundColor="white"
          height={40}
          width={40}
          borderRadius={80}
          shadowColor="$gray12"
          shadowOpacity={0.8}
          shadowRadius={2}
          shadowOffset={{ height: 3, width: 3 }}
          elevation={10}
        />
        <Button
          icon={Upload}
          padding={20}
          backgroundColor="white"
          height={40}
          width={40}
          borderRadius={80}
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
