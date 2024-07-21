import { YStack } from "tamagui";
import { AppBar } from "~/components/base/app-bar";
import { SearchBox } from "~/components/search/search-box";

export const SearchModalLayout = () => {
  return (
    <YStack
      testID="search-modal-layout"
      backgroundColor="white"
      flex={1}
      paddingHorizontal={12}
    >
      <AppBar title="Search" type="search" />
      <SearchBox />
    </YStack>
  );
};
