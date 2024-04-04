import { api } from "@/old/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ItemPrices } from "./types";

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
        .json<ItemPrices>(),
  });
};

export default useSuspensePriceCheck;
