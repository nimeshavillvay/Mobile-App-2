import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { MyOrders, OrderStatus, SortBy, SortDirection } from "./types";

const useSuspenseOrderHistorySearch = (
  token: string,
  fromDate: string,
  toDate: string,
  orderTypes: string[],
  orderStatus: string[],
  currentPage: number,
  pageSize: number,
  sortBy: SortBy,
  sortDirection: SortDirection,
  rfData: string,
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
            rf_data: rfData,
          },
        })
        .json<MyOrders>(),
    // Transformer to select the data needed
    select: (data) => {
      const ORDER_STATUS = ["C", "I", "R", "S", "K", "F"];
      const getRandomStatus = () =>
        Math.floor(Math.random() * ORDER_STATUS.length);

      return {
        orders: data.orders.map((order) => ({
          ...order,
          status: ORDER_STATUS[getRandomStatus()] as OrderStatus,
        })),
        pagination: data.pagination,
      };
    },
  });
};

export default useSuspenseOrderHistorySearch;
