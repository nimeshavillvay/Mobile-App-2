import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getSearchResults } from "~/apis/base/elasticsearch/get-search-results";
import type { SearchApiConfig } from "~/lib/types";

const useSuspenseInfiniteSearchResults = (
  config: SearchApiConfig,
  query: string,
) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["search", query, config],
    queryFn: ({ pageParam }) =>
      getSearchResults(config, { query, pageNo: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length,
  });
};

export default useSuspenseInfiniteSearchResults;
