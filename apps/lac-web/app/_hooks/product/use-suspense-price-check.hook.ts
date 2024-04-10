import type { ItemPricesResult } from "@/_lib/types";
import { api } from "@/old/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

// TODO: Need to remove usePriceCheck hook and replace it with useSuspensePriceCheck
const useSuspensePriceCheck = (
  token: string,
  sku: string,
  quantity: number,
) => {
  return useSuspenseQuery({
    queryKey: ["user", "price-check", token, sku, quantity],
    queryFn: () =>
      api
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
