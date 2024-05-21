"use client";

import {
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
  SearchClearButton,
} from "@repo/web-ui/components/search-box";
import { Separator } from "@repo/web-ui/components/ui/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BarcodeScannerDialog from "./barcode-scan-dialog";
import useMultiSearch, { placeholderData } from "./use-multi-search.hook";

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const multiSearchQuery = useMultiSearch(value);
  const handleSearch = () => {
    if (value !== "") {
      const queryParams = new URLSearchParams({
        query: value,
      });
      router.push(`/search?${queryParams.toString()}`);
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
      >
        {value && <SearchClearButton onClick={clearInput} />}
        <SearchBoxButton onClick={handleSearch} />
        <Separator orientation="vertical" className="h-5" />
        <BarcodeScannerDialog />
      </SearchBoxInput>
    </SearchBox>
  );
};

export default SearchBar;
