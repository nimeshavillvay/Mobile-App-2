import { ScreenHeader } from "@repo/native-ui/components/base/screen-header";
import { SearchBox } from "@repo/native-ui/components/search/search-box";
import { useRef, useState } from "react";
import type { TextInput } from "react-native";
import { Text } from "tamagui";
import { SearchModalLayout } from "~/components/search/search-modal-layout";

export const SearchLayout = () => {
  const ref = useRef<TextInput>(null);
  const [searchValue, setSearchValue] = useState("");

  const clearSearchTerm = () => {
    ref.current?.clear();
    setSearchValue("");
  };

  return (
    <SearchModalLayout>
      <ScreenHeader title="Search" type="search" />
      <SearchBox
        ref={ref}
        onChangeText={setSearchValue}
        onClear={clearSearchTerm}
      />
    </SearchModalLayout>
  );
};
