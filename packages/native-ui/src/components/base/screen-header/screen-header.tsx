import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScanBarcode } from "@tamagui/lucide-icons";
import { Link, useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { Button, Text, View } from "tamagui";

export const ScreenHeader = ({
  title,
  type,
  hideBackButton = false,
  hideSearchButton = false,
  barcodeScannerPath,
  ...delegated
}: {
  readonly title: string;
  readonly type?: string;
  readonly hideBackButton?: boolean;
  readonly hideSearchButton?: boolean;
  readonly barcodeScannerPath?: string;
} & ComponentProps<typeof View>) => {
  const router = useRouter();

  return (
    <View
      flexBasis="auto"
      alignItems="stretch"
      testID="screen-header-main-view"
    >
      <View
        pb={type === "center-aligned" ? 10 : 0}
        pt={type === "center-aligned" ? 10 : 0}
        minHeight={60}
        flexDirection="row"
        alignItems="center"
        testID="screen-header-inner-view"
        backgroundColor="#CC0000"
        {...delegated}
      >
        {type !== "center-aligned" ? (
          <>
            {router.canGoBack() && !hideBackButton && (
              <Button
                onPress={() => router.back()}
                backgroundColor="$colorTransparent"
                testID="back-button"
              >
                <FontAwesome name="angle-left" size={28} color="white" />
              </Button>
            )}
            <Text
              flex={1}
              fontSize="$7"
              ml={12}
              mr="auto"
              numberOfLines={1}
              color="white"
            >
              {title}
            </Text>
            <View
              flexDirection="row"
              pr={20}
              alignItems="center"
              columnGap={20}
              testID="screen-header-icons-view"
            >
              {!hideSearchButton && (
                <Link href={`/search`} testID="search-icon">
                  <AntDesign name="search1" size={24} color="white" />
                </Link>
              )}

              {!!barcodeScannerPath && (
                <Link
                  href={barcodeScannerPath}
                  testID="barcode-scan-icon"
                  asChild
                >
                  <Button
                    icon={ScanBarcode}
                    color="white"
                    backgroundColor="$colorTransparent"
                    size={50}
                    padding={0}
                  />
                </Link>
              )}
            </View>
          </>
        ) : (
          <>
            {router.canGoBack() && (
              <Button
                pos="absolute"
                top={8}
                onPress={() => router.back()}
                backgroundColor="$colorTransparent"
                testID="back-button"
                hitSlop={15}
                paddingRight={0}
                pressStyle={{
                  backgroundColor: "$colorTransparent",
                  borderWidth: 0,
                }}
              >
                <FontAwesome name="angle-left" size={28} color="white" />
              </Button>
            )}

            <Text
              paddingHorizontal={30}
              fontSize="$7"
              ml="auto"
              mr="auto"
              alignSelf="center"
              numberOfLines={1}
              zIndex={-1}
              color="white"
            >
              {title}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};
