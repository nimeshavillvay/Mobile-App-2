import { TableCell, TableRow } from "@/old/_components/ui/table";
import { cn, formatNumberToPrice } from "@/old/_utils/helpers";
import dayjs from "dayjs";
import Link from "next/link";
import { MdInsertDriveFile } from "react-icons/md";
import { getTableRowBgColor } from "../_utils/client-helpers";
import { ORDER_TYPES, STATUS_COLOR_CLASSES, UI_DATE_FORMAT } from "./constants";
import type { Order, OrderStatus } from "./types";

type OrderHistoryRowProps = {
  index: number;
  order: Order;
};

const OrderHistoryRow = ({ index, order }: OrderHistoryRowProps) => {
  const orderTrackingHref =
    order.orderNo !== ""
      ? `orderhistory/ordertrackinglog/${order.orderNo}`
      : "#";
  const orderDetailHref =
    order.orderNo !== "" ? `orderhistory/${order.orderNo}` : "#";

  return (
    <>
      <TableRow className={getTableRowBgColor(index)}>
        <TableCell className="text-center" rowSpan={2}>
          <Link
            className="flex flex-col items-center justify-center gap-2"
            href={orderDetailHref}
          >
            <div>{ORDER_TYPES[order.orderType]}</div>
            <MdInsertDriveFile className="text-2xl text-brand-gray-400" />
          </Link>
        </TableCell>

        <TableCell className="text-center">{order.orderNo}</TableCell>

        <TableCell className="text-center">
          {order.orderDate !== ""
            ? dayjs(order.orderDate).format(UI_DATE_FORMAT)
            : "N/A"}
        </TableCell>

        <TableCell className="text-center">
          ${formatNumberToPrice(Number(order.orderTotal))}
        </TableCell>

        <TableCell className="text-center" rowSpan={2}>
          <div className="flex flex-col items-center justify-center gap-2 ">
            <OrderStatusBadge status={order.status} />
            <Link
              className="block rounded-sm bg-brand-gray-200 px-4 py-2 text-center font-wurth font-extrabold uppercase text-brand-gray-500"
              href={orderTrackingHref}
            >
              Order Tracking Log
            </Link>
          </div>
        </TableCell>
      </TableRow>

      <TableRow className={getTableRowBgColor(index)}>
        <TableCell className="flex flex-col text-center">
          <h4 className="font-bold">Order By:</h4>
          <div>{order.orderBy !== "" ? order.orderBy : "N/A"}</div>
        </TableCell>

        <TableCell className="text-center">
          <h4 className="font-bold">PO#:</h4>
          <div>{order.po !== "" ? order.po : "N/A"}</div>
        </TableCell>

        <TableCell className="text-center">
          <h4 className="font-bold">Job#:</h4>
          <div>{order.jobName !== "" ? order.jobName : "N/A"}</div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderHistoryRow;

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const colorClass =
    STATUS_COLOR_CLASSES[status] || STATUS_COLOR_CLASSES.default;

  return (
    <div className={cn("px-4 py-2 font-bold", colorClass)}>
      {status || "N/A"}
    </div>
  );
};
