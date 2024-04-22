import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { MyOrders } from "./types";

type RFData = {
  rf_data: {
    [filterId: string]: string[];
  };
};

const useSuspenseOrderHistorySearch = (
  token: string,
  fromDate: string,
  toDate: string,
  orderTypes: string[],
  orderStatus: string[],
  currentPage: number,
  pageSize: number,
  sortBy: string,
  sortDirection: string,
  rfData?: RFData,
) => {
  return useSuspenseQuery({
    queryKey: [
      "user",
      "my-orders",
      token,
      fromDate,
      toDate,
      currentPage,
      pageSize,
      sortBy,
      sortDirection,
      rfData,
    ],
    queryFn: () =>
      api
        .get("rest/order-history/search", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          searchParams: {
            from: fromDate,
            to: toDate,
            order_type: orderTypes.join(","),
            order_status: orderStatus.join(","),
            page: currentPage,
            perpage: pageSize,
            sort: sortBy,
            sort_direction: sortDirection,
          },
        })
        .json<MyOrders>(),
  });
};

export default useSuspenseOrderHistorySearch;
