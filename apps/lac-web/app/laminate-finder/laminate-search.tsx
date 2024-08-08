"use client";
import { changeSearchParams } from "@/_lib/client-helpers";
import { INIT_PAGE_NUMBER, QUERY_KEYS } from "@/osr/dashboard/constants";
import { MagnifyingGlass } from "@repo/web-ui/components/icons/magnifying-glass";
import { Button } from "@repo/web-ui/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState, type ComponentProps } from "react";

const LaminateSearch = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("searchText") ?? "";
  const [searchInput, setSearchInput] = useState(searchText);

  const searchOnEnter: ComponentProps<"input">["onKeyDown"] = (event) => {
    if (event.key === "Enter") {
      changeSearchParams(searchParams, [
        {
          key: QUERY_KEYS.SEARCH_TEXT,
          value: searchInput,
        },
        {
          key: QUERY_KEYS.PAGE,
          value: INIT_PAGE_NUMBER,
        },
      ]);
    }
  };

  return (
    <div className="col-span-1">
      <div className="flex flex-row items-center rounded border border-wurth-gray-250">
        <input
          value={searchInput}
          placeholder="Search for laminates"
          className="min-w-0 flex-1 shrink rounded border-0 py-2.5 pl-3.5 text-sm placeholder:text-wurth-gray-400"
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyDown={(event) => searchOnEnter(event)}
        />

        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="mx-0.5 rounded px-2 text-wurth-gray-500"
          onClick={() => {
            changeSearchParams(searchParams, [
              {
                key: QUERY_KEYS.SEARCH_TEXT,
                value: searchInput,
              },
              {
                key: QUERY_KEYS.PAGE,
                value: INIT_PAGE_NUMBER,
              },
            ]);
          }}
        >
          <MagnifyingGlass className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default LaminateSearch;
