import { api } from "@/old/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MyOrders } from "./types";

const useSuspenseOrderHistoryList = (
  token: string,
  fromDate: string,
  toDate: string,
  orderNumber: string,
  orderType: string,
  sortBy: string,
  currentPage: number,
  pageSize: number,
) => {
  return useSuspenseQuery({
    queryKey: [
      "user",
      "my-orders",
      token,
      orderNumber,
      orderType,
      sortBy,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      api
        .get("am/order-history/search", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          searchParams: {
            orderNo: orderNumber,
            page: currentPage,
            size: pageSize,
            sort: sortBy,
            order: orderType,
          },
        })
        .json<MyOrders>(),
  });
};

export default useSuspenseOrderHistoryList;
