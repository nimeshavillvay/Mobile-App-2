import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getSearch,
  type SearchDetails,
  type SelectedFilters,
} from "~/apis/base/search/get-search";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseSearch = (
  config: AuthenticatedApiConfig,
  searchDetails: SearchDetails,
  selectedFilters?: SelectedFilters,
) => {
  return useSuspenseQuery({
    queryKey: ["search", searchDetails, selectedFilters, config],
    queryFn: () => getSearch(config, searchDetails, selectedFilters),
  });
};

export default useSuspenseSearch;
