"use client";

import {
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
} from "@repo/web-ui/components/search-box";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VerticalLine } from "~/components/icons/vertical-line/vertical-line";
import { BarcodeScannerDialog } from "./barcode-scan-dialog";
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
      <VerticalLine className="size-5" />
      <BarcodeScannerDialog />
    </SearchBox>
  );
};

export default SearchBar;
