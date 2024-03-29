"use client";

import dayjs from "dayjs";
import { DATE_FORMAT } from "./constants";
import useSuspenseOrderHistoryList from "./use-suspense-order-history-list.hook";

const OrderHistoryList = ({ token }: { token: string }) => {
  const initialFromDate = dayjs().subtract(1, "year").format(DATE_FORMAT);
  const initialToDate = dayjs().format(DATE_FORMAT);

  const orderHistoryListQuery = useSuspenseOrderHistoryList(
    token,
    initialFromDate,
    initialToDate,
    "",
    "desc",
    "orderDate",
    0,
    10,
  );

  console.log("oh items >", orderHistoryListQuery.data);

  return (
    <div className="max-w-desktop text-wrap text-brand-success">
      Order History List Here
    </div>
  );
};

export default OrderHistoryList;
