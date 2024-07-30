import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getSearchResults } from "~/apis/base/elasticsearch/get-search-results";
import type { SearchApiConfig } from "~/lib/types";

const useSuspenseInfiniteSearchResults = (
  config: SearchApiConfig,
  {
    query,
    searchParams,
  }: {
    query: string;
    searchParams?: string;
  },
) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["search", query, searchParams, config],
    queryFn: async ({ pageParam }) =>
      getSearchResults(config, {
        query,
        pageNo: pageParam,
        searchParams,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.summary.pageNo + 1,
  });
};

export default useSuspenseInfiniteSearchResults;
