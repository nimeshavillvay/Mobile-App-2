import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFilters, type FilterType } from "~/apis/base/search/get-filters";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useFilters = (
  config: AuthenticatedApiConfig,
  filterType: FilterType,
  /**
   * Keep the previous data when the products list changes to avoid
   * loading states every time the products list changes
   */
  staleListTillFetched = false,
) => {
  return useQuery({
    queryKey: ["filters", filterType, config],
    queryFn: () => getFilters(config, filterType),
    placeholderData: staleListTillFetched ? keepPreviousData : undefined,
  });
};

export default useFilters;
