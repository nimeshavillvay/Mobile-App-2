import { api } from "@/old/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { PurchasedOrders } from "./types";

const useSuspensePurchasedItemsList = (
  token: string,
  fromDate: string,
  toDate: string,
  page: number,
  size: number,
  orderField: string,
  orderType: string,
) => {
  return useSuspenseQuery({
    queryKey: [
      "user",
      "order-history",
      token,
      fromDate,
      toDate,
      page,
      size,
      orderField,
      orderType,
    ],
    queryFn: () =>
      api
        .get("am/order-history/purchase", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          searchParams: {
            from: fromDate,
            to: toDate,
            page: page,
            size: size,
            field: orderField,
            order: orderType,
          },
        })
        .json<PurchasedOrders>(),
  });
};

export default useSuspensePurchasedItemsList;
