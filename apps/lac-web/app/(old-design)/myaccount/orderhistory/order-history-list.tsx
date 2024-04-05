"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import { useSearchParams } from "next/navigation";
import {
  ALL_ORDER_TYPES,
  INIT_FROM_DATE,
  INIT_PAGE_NUMBER,
  INIT_PAGE_SIZE,
  INIT_TO_DATE,
} from "./constants";
import OrderHistoryListSelectors from "./order-history-list-selectors";
import OrderHistoryRow from "./order-history-row";
import TotalCountAndPagination from "./total-count-and-pagination";
import useSuspenseOrderHistoryList from "./use-suspense-order-history-list.hook";

const OrderHistoryList = ({ token }: { token: string }) => {
  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from") ?? INIT_FROM_DATE;
  const toDate = searchParams.get("to") ?? INIT_TO_DATE;
  const urlOrderType = searchParams.get("orderType");
  const currentPage = Number(searchParams.get("page") ?? INIT_PAGE_NUMBER);
  const pageSize = Number(searchParams.get("perPage") ?? INIT_PAGE_SIZE);
  const orderTypes = urlOrderType?.split(",") ?? ALL_ORDER_TYPES;
  const orderStatus = searchParams.get("orderStatus")?.split(",") ?? [];

  const orderHistoryListQuery = useSuspenseOrderHistoryList(
    token,
    fromDate,
    toDate,
    orderTypes,
    orderStatus,
    currentPage - 1,
    pageSize,
    "date",
    "desc",
    "",
  );

  console.log("orderTypes", orderTypes);

  const orderHistoryItems = orderHistoryListQuery?.data?.orders ?? null;
  const totalItems = orderHistoryListQuery?.data?.pagination[0]?.db_count ?? 0;

  return (
    <>
      <OrderHistoryListSelectors />

      <TotalCountAndPagination
        isLoading={orderHistoryListQuery.isLoading}
        totalItems={totalItems}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Order Type</TableHead>
            <TableHead className="text-center">Order #</TableHead>
            <TableHead className="text-center">Order Date</TableHead>
            <TableHead className="text-center">Order Total</TableHead>
            <TableHead className="text-center">Order Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-brand-gray-500">
          {orderHistoryItems &&
            orderHistoryItems.map((order, index) => (
              <OrderHistoryRow
                key={order.orderNo}
                index={index}
                order={order}
              />
            ))}
        </TableBody>
      </Table>

      <TotalCountAndPagination
        isLoading={orderHistoryListQuery.isLoading}
        totalItems={totalItems}
      />
    </>
  );
};

export default OrderHistoryList;
