import dayjs from "dayjs";
// import Link from "next/link";
import { cn, formatNumberToPrice } from "@/old/_utils/helpers";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  ORDER_STATUS,
  STATUS_COLOR_CLASSES,
  UI_DATE_FORMAT,
} from "./constants";
import type { Order, OrderStatus } from "./types";

type OrderHistoryListForMobileProps = {
  items: Order[];
  token: string;
  isLoading: boolean;
};

const OrderHistoryListForMobile = ({
  items,
}: OrderHistoryListForMobileProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 bg-brand-gray-200 py-4 md:hidden">
        {items &&
          items.length > 0 &&
          items.map((order) => (
            <OrderHistoryRowForMobile key={order.orderNo} order={order} />
          ))}
      </div>
    </>
  );
};

export default OrderHistoryListForMobile;

const OrderHistoryRowForMobile = ({ order }: { order: Order }) => {
  return (
    <div className="flex flex-col gap-3 bg-white p-4">
      <div className="flex flex-row justify-between">
        <div className="font-bold">{order.orderBy}</div>
        <div className="text-brand-gray-500">
          {order.orderDate
            ? dayjs(order.orderDate).format(UI_DATE_FORMAT)
            : "N/A"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 rounded-md bg-brand-gray-100 p-4">
        <div className="font-bold">Order</div>
        <div>
          <span className="text-brand-gray-400">PO #: </span>
          {order.po}
        </div>
        <div>No. {order.orderNo}</div>
        <div>
          <span className="text-brand-gray-400">Job #: </span>
          {order.jobName}
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <OrderStatusBadgeMobile status={order.status} />
        <div className="flex flex-row items-center">
          <div className="font-bold">
            ${formatNumberToPrice(Number(order.orderTotal))}
          </div>
          <MdKeyboardArrowRight className="text-2xl leading-none text-brand-gray-400" />
        </div>
      </div>
    </div>
  );
};

const OrderStatusBadgeMobile = ({ status }: { status: OrderStatus }) => {
  const colorClass =
    STATUS_COLOR_CLASSES[status] || STATUS_COLOR_CLASSES.default;

  return (
    <div className={cn("font-bold", colorClass)}>
      {ORDER_STATUS[status] || "N/A"}
    </div>
  );
};
