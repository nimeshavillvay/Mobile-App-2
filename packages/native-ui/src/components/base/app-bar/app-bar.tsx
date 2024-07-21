import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, usePathname, useRouter } from "expo-router";
import { Button, Text, View } from "tamagui";

export const AppBar = ({
  title,
  type,
}: {
  readonly title: string;
  readonly type?: string;
}) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <View flexBasis="auto" alignItems="stretch" testID="app-bar-main-view">
      <View
        pb={10}
        minHeight={60}
        flexDirection="row"
        alignItems="center"
        testID="app-bar-inner-view"
      >
        {router.canGoBack() && (
          <Button
            onPress={() => router.back()}
            backgroundColor="white"
            testID="back-button"
          >
            <FontAwesome name="angle-left" size={28} />
          </Button>
        )}

        {type !== "search" && (
          <>
            <Text fontSize="$7" ml={12} mr="auto">
              {title}
            </Text>
            <View
              flexDirection="row"
              pr={20}
              alignItems="center"
              columnGap={20}
              testID="app-bar-icons-view"
            >
              <Link href={path + "/search"} testID="search-icon">
                <AntDesign name="search1" size={24} />
              </Link>
              <Link href={path}>
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={24}
                  testID="barcode-scan-icon"
                />
              </Link>
            </View>
          </>
        )}
      </View>
    </View>
  );
};
