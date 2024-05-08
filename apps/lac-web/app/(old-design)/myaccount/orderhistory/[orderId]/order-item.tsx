import AlertInline from "@/old/_components/alert-inline";
import { Button } from "@/old/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import { cn, formatNumberToPrice } from "@/old/_utils/helpers";
import { WurthFullBlack } from "@repo/web-ui/components/logos/wurth-full-black";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { UI_DATE_FORMAT } from "../constants";

type OrderItemProps = {
  index: number;
  orderItem: {
    sku: string;
    productId: number;
    totalQuantity: number;
    lineItems: {
      itemNo: string;
      sku: string;
      productId: number;
      itemDescription: string;
      deliveryDate: string;
      plant: string;
      shippingCondition: string;
      invoice: string;
      shipQuantity: number;
      boQty: number;
      boDate: string;
      itemStatus: string;
    }[];
    itemSubTotal: number;
    promoCode: string;
    itemNo: string;
    sapNo: string;
    price: number;
    itemPo: string;
    itemDescription: string;
    descriptionChanged: boolean;
    unitOfMeasure?: string;
    image?: string;
    productTitle?: string;
    isExcludedProduct?: boolean;
  };
  getShippingMethodName: (shippingCode: string) => string;
  getPlantName: (plantId: string) => string;
};

const OrderItem = ({
  index,
  orderItem,
  getShippingMethodName,
  getPlantName,
}: OrderItemProps) => {
  const {
    productId,
    sku,
    itemDescription,
    totalQuantity,
    itemSubTotal,
    unitOfMeasure,
    image,
    productTitle,
    promoCode,
    itemPo,
    lineItems,
    isExcludedProduct = false,
  } = orderItem;

  const generateProductUrl = (productId: number) => {
    if (productId) {
      return `/product/${productId}`;
    }
    return "#";
  };

  return (
    <div
      className={cn(
        "space-y-2 p-4 text-brand-gray-500",
        index % 2 === 0 ? "bg-brand-gray-100" : "bg-white",
      )}
    >
      <div className="flex flex-row">
        <div className="flex flex-1 flex-row gap-4">
          <div className="min-w-[76px]">
            <Link
              href={generateProductUrl(productId)}
              className={
                productId ? "pointer-events-auto" : "pointer-events-none"
              }
            >
              {image ? (
                <Image
                  src={image}
                  alt={itemDescription}
                  width={76}
                  height={76}
                />
              ) : (
                <WurthFullBlack
                  width={76}
                  height={76}
                  className="border border-brand-gray-200 px-2"
                />
              )}
            </Link>
          </div>
          <div className="flex flex-col">
            <div>Item#: {sku ?? "N/A"}</div>

            <div className="text-wrap font-bold text-black">
              {itemDescription ?? productTitle ?? "Description N/A"}
            </div>

            <div className="">
              Order Qty: {totalQuantity} {unitOfMeasure ?? "Unit"} | $
              {itemSubTotal ? formatNumberToPrice(itemSubTotal) : "0.00"}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-row justify-between gap-4">
          <div className="flex flex-col">
            <div className="text-wrap">
              Line Item Project Name / PO#: {itemPo !== "" ? itemPo : "N/A"}
            </div>
            <div>
              Promo Code:&nbsp;
              <span className="text-brand-secondary">
                {promoCode !== "" ? promoCode : "N/A"}
              </span>
            </div>
          </div>

          <Button className="w-[170px] text-base" disabled={isExcludedProduct}>
            Buy Again
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className="[&_tr]:border-b [&_tr]:border-t-0">
          <TableRow>
            <TableHead className="h-8">Line#</TableHead>
            <TableHead className="h-8">Status</TableHead>
            <TableHead className="h-8 text-center">Invoice</TableHead>
            <TableHead className="h-8 text-center">Ship Date</TableHead>
            <TableHead className="h-8 text-center">Qty Shipped</TableHead>
            <TableHead className="h-8 text-center">B/O Qty</TableHead>
            <TableHead className="h-8 text-center">B/O ETA</TableHead>
            <TableHead className="h-8 text-center">Ship Via</TableHead>
            <TableHead className="h-8 text-center">Location</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {lineItems?.length &&
            lineItems.map((lineItem) => (
              <Fragment key={lineItem.itemNo}>
                <TableRow>
                  <TableCell className="py-2">
                    {lineItem?.itemNo ?? "N/A"}
                  </TableCell>

                  <TableCell className="py-2 text-brand-secondary">
                    {lineItem?.itemStatus ?? "N/A"}
                  </TableCell>

                  <TableCell className="py-2 text-center">
                    {lineItem?.invoice !== "" ? lineItem.invoice : "N/A"}
                  </TableCell>

                  <TableCell className="py-2 text-center">
                    {lineItem?.deliveryDate !== ""
                      ? dayjs(lineItem.deliveryDate).format(UI_DATE_FORMAT)
                      : "N/A"}
                  </TableCell>

                  <TableCell className="py-2 text-center">
                    {lineItem?.shipQuantity ? lineItem.shipQuantity : 0}
                  </TableCell>

                  <TableCell className="py-2 text-center">
                    {lineItem?.boQty ? lineItem.boQty : 0}
                  </TableCell>

                  <TableCell className="py-2 text-center">
                    {lineItem?.boDate !== ""
                      ? dayjs(lineItem.boDate).format(UI_DATE_FORMAT)
                      : "N/A"}
                  </TableCell>

                  <TableCell className="py-2 text-center">
                    {lineItem?.shippingCondition
                      ? getShippingMethodName(lineItem.shippingCondition)
                      : "N/A"}
                  </TableCell>

                  <TableCell className="py-2 text-center">
                    {lineItem?.plant ? getPlantName(lineItem.plant) : "N/A"}
                  </TableCell>
                </TableRow>

                {lineItem?.boDate !== "" && (
                  <TableRow>
                    <TableCell colSpan={9} className="py-2">
                      <AlertInline
                        variant="destructive"
                        description="Back order dates are subject to change by suppliers without notice."
                      />
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderItem;
