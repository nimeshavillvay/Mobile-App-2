"use client";

import {
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
  SearchClearButton,
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
  const handleSearch = () => {
    if (value != "") {
      router.push(`/search?query=${value}`);
    }
  };

  const clearInput = () => {
    setValue("");
  };

  return (
    <SearchBox>
      <SearchBoxInput
        data={multiSearchQuery.data ?? placeholderData}
        value={value}
        setValue={setValue}
        onEnterPressed={handleSearch}
        placeholder="What are you looking for?"
      />
      {value && <SearchClearButton onClick={clearInput} />}{" "}
      <SearchBoxButton onClick={handleSearch} />
      <VerticalLine className="size-5" />
      <BarcodeScannerDialog />
    </SearchBox>
  );
};

export default SearchBar;
