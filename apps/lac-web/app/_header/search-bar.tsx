"use client";

import {
  BarcodeScanButton,
  SearchBox,
  SearchBoxButton,
  SearchBoxInput,
} from "@repo/web-ui/components/search-box";
import dynamic from "next/dynamic";
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
  const BarcodeScannerDialog = dynamic(
    () =>
      import("@repo/web-ui/components/barcode-scan-dialog").then(
        (mod) => mod.BarcodeScannerDialog,
      ),
    {
      loading: () => <BarcodeScanButton />,
      ssr: false,
    },
  );
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
