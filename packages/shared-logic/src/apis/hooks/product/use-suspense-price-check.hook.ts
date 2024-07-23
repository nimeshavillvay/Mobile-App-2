import { useSuspenseQuery } from "@tanstack/react-query";
import "client-only";
import { priceCheck, type Product } from "~/apis/base/product/price-check";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspensePriceCheck = (
  config: AuthenticatedApiConfig,
  products: Product[],
) => {
  return useSuspenseQuery({
    queryKey: ["user", "price-check", products, config],
    queryFn: () => priceCheck(config, products),
    staleTime: 60000, // 10 minutes
  });
};

export default useSuspensePriceCheck;
