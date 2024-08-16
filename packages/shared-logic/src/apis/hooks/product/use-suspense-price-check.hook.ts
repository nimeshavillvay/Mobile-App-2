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
    queryFn: async () => {
      if (products.length > 0) {
        return await priceCheck(config, products);
      } else {
        return {
          error: null,
          productPrices: [],
        };
      }
    },
  });
};

export default useSuspensePriceCheck;
