import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, usePathname, useRouter } from "expo-router";
import { Button, Text, View } from "tamagui";

const AppBar = ({ title, type }: { title: string; type?: string }) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <View flexBasis="auto" alignItems="stretch">
      <View pb={10} minHeight={60} flexDirection="row" alignItems="center">
        {router.canGoBack() && (
          <Button onPress={() => router.back()} backgroundColor="white">
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
            >
              <Link href={path + "/search-modal"}>
                <AntDesign name="search1" size={24} />
              </Link>
              <Link href={path}>
                <MaterialCommunityIcons name="barcode-scan" size={24} />
              </Link>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default AppBar;
