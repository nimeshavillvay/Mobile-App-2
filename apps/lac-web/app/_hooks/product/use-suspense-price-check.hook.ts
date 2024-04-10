import type { ItemPricesResult } from "@/_lib/types";
import { api } from "@/old/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspensePriceCheck = (
  token: string,
  sku: string,
  quantity: number,
) => {
  return useSuspenseQuery({
    queryKey: ["user", "price-check", token, sku, quantity],
    queryFn: () =>
      api
        // TODO Replace with X-Cart route
        .post("pim/webservice/ecommerce/price-check", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          json: { skuqty: [{ sku, quantity }] },
        })
        .json<ItemPricesResult>(),
    staleTime: 60000,
  });
};

export default useSuspensePriceCheck;
