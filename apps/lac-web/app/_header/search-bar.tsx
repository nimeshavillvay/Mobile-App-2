"use client";

import { BarcodeScannerDialog } from "@repo/web-ui/components/barcode-scan-dialog";
import {
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
} from "@repo/web-ui/components/search-box";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useMultiSearch, { placeholderData } from "./use-multi-search.hook";

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const multiSearchQuery = useMultiSearch(value);
  const handleSearchEnter = () => {
    router.push(`/search?query=${encodeURIComponent(value)}`);
  };
  return (
    <SearchBox>
      <SearchBoxInput
        data={multiSearchQuery.data ?? placeholderData}
        value={value}
        setValue={setValue}
        onEnterPressed={handleSearchEnter}
        placeholder="What are you looking for?"
      />

      <SearchBoxButton />
      <BarcodeScannerDialog />
    </SearchBox>
  );
};
export default SearchBar;
