import { useSuspenseQuery } from "@tanstack/react-query";
import { getFilters, type FilterType } from "~/apis/base/search/get-filters";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseFilters = (
  config: AuthenticatedApiConfig,
  filterType: FilterType,
) => {
  return useSuspenseQuery({
    queryKey: ["filters", filterType, config],
    queryFn: () => getFilters(config, filterType),
  });
};

export default useSuspenseFilters;
