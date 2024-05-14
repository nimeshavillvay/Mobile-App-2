"use client";

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
  const handleSearch = () => {
    router.push(`/search?query=${encodeURIComponent(value)}`);
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
      <SearchBoxButton onClick={handleSearch} />
    </SearchBox>
  );
};

export default SearchBar;
