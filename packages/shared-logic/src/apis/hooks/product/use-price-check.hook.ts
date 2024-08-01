import { keepPreviousData, useQuery } from "@tanstack/react-query";
import "client-only";
import { priceCheck, type Product } from "~/apis/base/product/price-check";
import type { AuthenticatedApiConfig } from "~/lib/types";

const usePriceCheck = (
  config: AuthenticatedApiConfig,
  products: Product[],
  /**
   * Keep the previous data when the products list changes to avoid
   * loading states every time the products list changes
   */
  staleListTillFetched = false,
) => {
  return useQuery({
    queryKey: ["user", "price-check", products, config],
    queryFn: () => priceCheck(config, products),
    placeholderData: staleListTillFetched ? keepPreviousData : undefined,
  });
};

export default usePriceCheck;
