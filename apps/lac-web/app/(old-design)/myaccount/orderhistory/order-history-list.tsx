"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import dayjs from "dayjs";
// import { useSearchParams } from "next/navigation";
import { DATE_FORMAT } from "./constants";
import OrderHistoryRow from "./order-history-row";
import useSuspenseOrderHistoryList from "./use-suspense-order-history-list.hook";

const OrderHistoryList = ({ token }: { token: string }) => {
  // const searchParams = useSearchParams();
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

  const orderHistoryItems =
    orderHistoryListQuery?.data?.orderHistoryResponse?.content ?? null;

  console.log("oh items >", orderHistoryItems);

  return (
    <div>
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
    </div>
  );
};

export default OrderHistoryList;
