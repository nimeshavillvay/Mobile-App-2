import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { ScreenLayout } from "@repo/native-ui/components/base/screen-layout";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router/stack";
import { Text } from "tamagui";

const SearchResultPage = () => {
  const { query } = useLocalSearchParams();
  const searchQuery = query?.toString() ?? "";

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScreenLayout>
        <ScreenHeader title="" hideSearchButton hideBarcodeScanner />

        <Text>Search Results Page {searchQuery}</Text>
      </ScreenLayout>
    </>
  );
};

export default SearchResultPage;
