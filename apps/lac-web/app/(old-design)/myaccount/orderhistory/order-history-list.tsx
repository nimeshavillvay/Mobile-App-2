"use client";

import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import { cn } from "@/_lib/utils";
import { Button } from "@/old/_components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useDeferredValue } from "react";
import {
  INIT_FROM_DATE,
  INIT_PAGE_NUMBER,
  INIT_PAGE_SIZE,
  INIT_SORT_DIRECTION,
  INIT_SORT_TYPE,
  INIT_TO_DATE,
  QUERY_KEYS,
  SORTING_DIRECTION,
  SORT_BY_FIELDS,
} from "./constants";
import OrderHistoryListForMobile from "./order-history-list-for-mobile";
import OrderHistoryListSelectors from "./order-history-list-selectors";
import OrderHistoryRow from "./order-history-row";
import TotalCountAndPagination from "./total-count-and-pagination";
import useSuspenseOrderHistorySearch from "./use-suspense-order-history-search.hook";

const OrderHistoryList = ({ token }: { readonly token: string }) => {
  const searchParams = useSearchParams();

  const fromDate = searchParams.get(QUERY_KEYS.FROM_DATE) ?? INIT_FROM_DATE;
  const toDate = searchParams.get(QUERY_KEYS.TO_DATE) ?? INIT_TO_DATE;
  const page = Number(searchParams.get(QUERY_KEYS.PAGE) ?? INIT_PAGE_NUMBER);
  const perPage = Number(
    searchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PAGE_SIZE,
  );
  const urlSortBy = searchParams.get(QUERY_KEYS.SORT_TYPE) ?? INIT_SORT_TYPE;
  const urlSortDirection =
    searchParams.get(QUERY_KEYS.SORT_DIRECTION) ?? INIT_SORT_DIRECTION;

  const deferredPerPage = useDeferredValue(perPage);

  const filtersQuery = useSuspenseFilters(token, {
    type: "Order History",
    from: fromDate,
    to: toDate,
  });

  const searchQuery = useSuspenseOrderHistorySearch(
    token,
    fromDate,
    toDate,
    page,
    deferredPerPage,
    urlSortBy,
    urlSortDirection,
    filtersQuery.data,
  );

  const orderHistoryItems = searchQuery?.data?.orders ?? null;
  const totalItems = searchQuery?.data?.pagination[0]?.db_count ?? 0;

  const handleHeaderSort = ({
    sortBy,
    direction,
  }: {
    sortBy: string;
    direction: string;
  }) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);

    if (sortBy) {
      newUrlSearchParams.set(QUERY_KEYS.SORT_TYPE, sortBy);
    }

    if (direction) {
      newUrlSearchParams.set(QUERY_KEYS.SORT_DIRECTION, direction);
    }

    window.history.pushState(null, "", `?${newUrlSearchParams.toString()}`);
  };

  return (
    <>
      <div className="flex flex-row items-center md:justify-end md:py-4">
        <Link
          className="btnAction hidden text-nowrap rounded-sm bg-brand-secondary px-4 py-2 text-center font-wurth font-extrabold uppercase text-white hover:bg-[#008fc6] md:block"
          href="https://wurthlac.billtrust.com/"
          data-button-action="Pay Your Bill Online"
        >
          Pay Your Bill Online
        </Link>
      </div>

      <div className="space-y-4">
        <Suspense fallback={<div>Filters Loading...</div>}>
          <OrderHistoryListSelectors token={token} totalItems={totalItems} />
        </Suspense>

        {orderHistoryItems?.length > 0 ? (
          <>
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
                  <TableHead>
                    <div className="inline-flex w-full items-center justify-center">
                      Order #&nbsp;
                      <HeaderSortButtons
                        active={urlSortBy === SORT_BY_FIELDS.SKU}
                        direction={urlSortDirection}
                        onClickAsc={() =>
                          handleHeaderSort({
                            sortBy: SORT_BY_FIELDS.SKU,
                            direction: SORTING_DIRECTION.ASC,
                          })
                        }
                        onClickDesc={() =>
                          handleHeaderSort({
                            sortBy: SORT_BY_FIELDS.SKU,
                            direction: SORTING_DIRECTION.DESC,
                          })
                        }
                      />
                    </div>
                  </TableHead>

                  <TableHead>
                    <div className="inline-flex w-full items-center justify-center">
                      Order Date&nbsp;
                      <HeaderSortButtons
                        active={urlSortBy === SORT_BY_FIELDS.ORDER_DATE}
                        direction={urlSortDirection}
                        onClickAsc={() =>
                          handleHeaderSort({
                            sortBy: SORT_BY_FIELDS.ORDER_DATE,
                            direction: SORTING_DIRECTION.ASC,
                          })
                        }
                        onClickDesc={() =>
                          handleHeaderSort({
                            sortBy: SORT_BY_FIELDS.ORDER_DATE,
                            direction: SORTING_DIRECTION.DESC,
                          })
                        }
                      />
                    </div>
                  </TableHead>

                  <TableHead>
                    <div className="inline-flex w-full items-center justify-center">
                      Order Total&nbsp;
                      <HeaderSortButtons
                        active={urlSortBy === SORT_BY_FIELDS.TOTAL_ITEMS}
                        direction={urlSortDirection}
                        onClickAsc={() =>
                          handleHeaderSort({
                            sortBy: SORT_BY_FIELDS.TOTAL_ITEMS,
                            direction: SORTING_DIRECTION.ASC,
                          })
                        }
                        onClickDesc={() =>
                          handleHeaderSort({
                            sortBy: SORT_BY_FIELDS.TOTAL_ITEMS,
                            direction: SORTING_DIRECTION.DESC,
                          })
                        }
                      />
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Order Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-brand-gray-500">
                {orderHistoryItems.map((order, index) => (
                  <OrderHistoryRow
                    key={order.orderNo}
                    index={index}
                    order={order}
                  />
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="px-4 font-wurth text-xl font-bold text-brand-gray-500 md:px-0">
            No records found.
          </div>
        )}
      </div>

      {orderHistoryItems?.length > 0 && totalItems >= perPage && (
        <TotalCountAndPagination
          isLoading={searchQuery.isLoading}
          totalItems={totalItems}
        />
      )}
    </>
  );
};

export default OrderHistoryList;

const HeaderSortButtons = ({
  active = false,
  direction,
  onClickDesc,
  onClickAsc,
}: {
  readonly active: boolean;
  readonly direction?: string;
  readonly onClickDesc: () => void;
  readonly onClickAsc: () => void;
}) => (
  <div className="flex flex-col">
    <Button
      variant="ghost"
      className={cn(
        "h-3 px-1",
        active && direction === "desc" ? "text-black" : "text-brand-gray-400",
      )}
      onClick={onClickDesc}
    >
      <CaretUpIcon
        className="h-4 w-4 opacity-70"
        data-button-action="Order History Descending"
      />
    </Button>
    <Button
      variant="ghost"
      className={cn(
        "h-3 px-1",
        active && direction === "asc" ? "text-black" : "text-brand-gray-400",
      )}
      onClick={onClickAsc}
    >
      <CaretDownIcon
        className="h-4 w-4 opacity-70"
        data-button-action="Order History Ascending"
      />
    </Button>
  </div>
);
