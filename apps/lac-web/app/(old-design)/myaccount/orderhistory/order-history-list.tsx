"use client";

import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  INIT_FROM_DATE,
  INIT_PAGE_NUMBER,
  INIT_PAGE_SIZE,
  INIT_SORT_DIRECTION,
  INIT_SORT_TYPE,
  INIT_TO_DATE,
  QUERY_KEYS,
} from "./constants";
import OrderHistoryListFilters from "./order-history-list-filters";
import OrderHistoryListForMobile from "./order-history-list-for-mobile";
import OrderHistoryRow from "./order-history-row";
import TotalCountAndPagination from "./total-count-and-pagination";
import useSuspenseOrderHistorySearch from "./use-suspense-order-history-search.hook";

const OrderHistoryList = ({ token }: { token: string }) => {
  const searchParams = useSearchParams();
  const fromDate = searchParams.get(QUERY_KEYS.FROM_DATE) ?? INIT_FROM_DATE;
  const toDate = searchParams.get(QUERY_KEYS.TO_DATE) ?? INIT_TO_DATE;
  const page = Number(searchParams.get(QUERY_KEYS.PAGE) ?? INIT_PAGE_NUMBER);
  const perPage = Number(
    searchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PAGE_SIZE,
  );
  const sortBy = searchParams.get(QUERY_KEYS.SORT_TYPE) ?? INIT_SORT_TYPE;
  const sortDirection =
    searchParams.get(QUERY_KEYS.SORT_DIRECTION) ?? INIT_SORT_DIRECTION;

  const filtersQuery = useSuspenseFilters(token, {
    type: "Order History",
    from: fromDate,
    to: toDate,
  });

  const searchQuery = useSuspenseOrderHistorySearch(
    token,
    fromDate,
    toDate,
    page - 1,
    perPage,
    sortBy,
    sortDirection,
    filtersQuery.data,
  );

  const orderHistoryItems = searchQuery?.data?.orders ?? null;
  const totalItems = searchQuery?.data?.pagination[0]?.db_count ?? 0;

  return (
    <>
      <div className="flex flex-row items-center md:justify-end md:py-4">
        <Link
          className="hidden text-nowrap rounded-sm bg-brand-secondary px-4 py-2 text-center font-wurth font-extrabold uppercase text-white md:block"
          href="https://wurthlac.billtrust.com/"
        >
          Pay Your Bill Online
        </Link>
      </div>

      <Suspense fallback={<div>Filters Loading...</div>}>
        <OrderHistoryListFilters
          token={token}
          fromDate={fromDate}
          toDate={toDate}
          totalItems={totalItems}
        />
      </Suspense>

      <TotalCountAndPagination
        isLoading={searchQuery.isLoading}
        totalItems={totalItems}
      />

      {/* Mobile View */}
      <OrderHistoryListForMobile
        items={orderHistoryItems}
        token={token}
        isLoading={searchQuery.isLoading}
      />

      {/* Desktop View */}
      <Table className="hidden md:table">
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
        isLoading={searchQuery.isLoading}
        totalItems={totalItems}
      />
    </>
  );
};

export default OrderHistoryList;
