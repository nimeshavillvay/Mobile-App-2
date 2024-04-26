"use client";

import {
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
} from "@repo/web-ui/components/search-box";
import { useState } from "react";
import useMultiSearch, { placeholderData } from "./use-multi-search.hook";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const multiSearchQuery = useMultiSearch(value);

  return (
    <SearchBox>
      <SearchBoxInput
        data={multiSearchQuery.data ?? placeholderData}
        value={value}
        setValue={setValue}
        placeholder="What are you looking for?"
      />

      <SearchBoxButton />
    </SearchBox>
  );
};
export default SearchBar;
