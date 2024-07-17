import { YStack } from "tamagui";
import AppBar from "../base/app-bar";
import SearchBox from "./search-box";

const SearchModalLayout = () => {
  return (
    <YStack backgroundColor="white" flex={1} paddingHorizontal={12}>
      <AppBar title="Search" type="search" />
      <SearchBox />
    </YStack>
  );
};

export default SearchModalLayout;
