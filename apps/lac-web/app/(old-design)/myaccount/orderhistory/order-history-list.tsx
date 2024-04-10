"use client";

import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import { Button } from "@/old/_components/ui/button";
import { Input } from "@/old/_components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MdSearch } from "react-icons/md";
import {
  ALL_ORDER_TYPES,
  INIT_FROM_DATE,
  INIT_PAGE_NUMBER,
  INIT_PAGE_SIZE,
  INIT_TO_DATE,
} from "./constants";
import OrderHistoryListForMobile from "./order-history-list-for-mobile";
import OrderHistoryListSelectors from "./order-history-list-selectors";
import OrderHistoryRow from "./order-history-row";
import TotalCountAndPagination from "./total-count-and-pagination";
import useSuspenseOrderHistorySearch from "./use-suspense-order-history-search.hook";

const OrderHistoryList = ({ token }: { token: string }) => {
  const searchParams = useSearchParams();
  const fromDate = searchParams.get("from") ?? INIT_FROM_DATE;
  const toDate = searchParams.get("to") ?? INIT_TO_DATE;
  const urlOrderType = searchParams.get("orderType");
  const currentPage = Number(searchParams.get("page") ?? INIT_PAGE_NUMBER);
  const pageSize = Number(searchParams.get("perPage") ?? INIT_PAGE_SIZE);
  const orderTypes = urlOrderType?.split(",") ?? ALL_ORDER_TYPES;
  const orderStatus = searchParams.get("orderStatus")?.split(",") ?? [];

  const searchQuery = useSuspenseOrderHistorySearch(
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

  const filterQuery = useSuspenseFilters({
    type: "Order History",
    from: fromDate,
    to: toDate,
  });

  const orderHistoryItems = searchQuery?.data?.orders ?? null;
  const totalItems = searchQuery?.data?.pagination[0]?.db_count ?? 0;

  return (
    <>
      <div className="flex flex-row items-center py-4 md:justify-between">
        <div className="flex w-full flex-row">
          <Input
            className="h-9 rounded-l-full border-r-0 border-brand-gray-200 text-sm md:w-[270px]"
            placeholder="Search by order number"
          />
          <Button
            variant="ghost"
            className="gap-0 rounded-r-full border border-l-0 px-2"
          >
            <MdSearch className="text-xl leading-none text-brand-gray-400" />
          </Button>
        </div>
        <Link
          className="hidden text-nowrap rounded-sm bg-brand-secondary px-4 py-2 text-center font-wurth font-extrabold uppercase text-white md:block"
          href="https://wurthlac.billtrust.com/"
        >
          Pay Your Bill Online
        </Link>
      </div>

      <OrderHistoryListSelectors
        filters={filterQuery.data.map((filter) => ({
          id: filter.id,
          title: filter.filter,
          values: filter.values.map((value) => ({
            id: value.id.toString(),
            value: value.value,
            active: value.active,
          })),
        }))}
      />

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
