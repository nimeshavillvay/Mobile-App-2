import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import {
  getSearch,
  type SearchDetails,
  type SelectedFilters,
} from "~/apis/base/search/get-search";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseInfiniteSearch = (
  config: AuthenticatedApiConfig,
  searchDetails: Omit<SearchDetails, "page">,
  selectedFilters?: SelectedFilters,
) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["search", "infinite", searchDetails, selectedFilters, config],
    queryFn: ({ pageParam }) =>
      getSearch(config, { ...searchDetails, page: pageParam }, selectedFilters),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const paginationDetails = lastPage.pagination[0];
      const totalPages = Math.ceil(
        paginationDetails.db_count / paginationDetails.perPage,
      );

      return lastPageParam < totalPages ? lastPageParam + 1 : null;
    },
  });
};

export default useSuspenseInfiniteSearch;
