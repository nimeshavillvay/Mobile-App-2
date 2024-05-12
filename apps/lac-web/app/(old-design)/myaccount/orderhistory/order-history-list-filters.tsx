"use client";

import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import OrderHistoryListSelectors from "./order-history-list-selectors";

type OrderHistoryListFiltersProps = {
  token: string;
  fromDate: string;
  toDate: string;
  totalItems: number;
};

const OrderHistoryListFilters = ({
  token,
  fromDate,
  toDate,
  totalItems,
}: OrderHistoryListFiltersProps) => {
  const filterQuery = useSuspenseFilters(token, {
    type: "Order History",
    from: fromDate,
    to: toDate,
  });

  return (
    <OrderHistoryListSelectors
      filters={filterQuery.data}
      isLoading={filterQuery.isLoading}
      totalItems={totalItems}
    />
  );
};

export default OrderHistoryListFilters;
