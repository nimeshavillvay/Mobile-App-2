import { useSuspenseQuery } from "@tanstack/react-query";
import { getGroupFilters } from "~/apis/base/product/get-group-filters";
import type { ApiConfig } from "~/lib/types";

export const useSuspenseGroupFilters = (
  config: ApiConfig,
  productId: number,
) => {
  return useSuspenseQuery({
    queryKey: ["product", productId, "group-filters", config],
    queryFn: () => getGroupFilters(config, productId),
  });
};
