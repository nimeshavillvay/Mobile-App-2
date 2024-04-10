import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { mapGetPurchasedItemListResponse } from "./get-purchased-item-list.mapper";
import type { PurchasedItems } from "./types";

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
        .get("rest/order-history/purchase", {
          headers: {
            authorization: `Bearer ${token}`,
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
        .json<PurchasedItems>(),
    select: (data) => mapGetPurchasedItemListResponse(data),
  });
};

export default useSuspensePurchasedItemsList;
