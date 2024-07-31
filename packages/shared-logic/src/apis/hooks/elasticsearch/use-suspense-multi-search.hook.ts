import { useSuspenseQuery } from "@tanstack/react-query";
import { getMultisearchResults } from "~/apis/base/elasticsearch/get-multisearch-results";
import type { SearchApiConfig } from "~/lib/types";

const useSuspenseMultiSearch = (config: SearchApiConfig, query: string) => {
  return useSuspenseQuery({
    queryKey: ["multi-search", query, config],
    queryFn: () => getMultisearchResults(config, query),
  });
};

export default useSuspenseMultiSearch;
