import Separator from "@/(old-design)/_components/separator";
import ShippingOptions from "@/(old-design)/_components/shipping-options";
import useSelectedAddress from "@/(old-design)/_hooks/account/use-selected-address.hook";
import useCheckAvailability from "@/(old-design)/_hooks/product/use-check-availability.hook";
import { AVAILABILITY_STATUSES } from "@/(old-design)/_lib/constants";
import {
  cn,
  formatNumberToPrice,
  getMediaUrl,
  getStatusLabel,
  getUomLabel,
} from "@/(old-design)/_utils/helpers";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/old/_components/ui/collapsible";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import { TableCell, TableRow } from "@/old/_components/ui/table";
import VisuallyHidden from "@/old/_components/visually-hidden";
import type { Product } from "@/old/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteOutline, MdKeyboardArrowDown } from "react-icons/md";
import * as z from "zod";

const schema = z.object({
  quantity: z.number().min(1),
});
type Schema = z.infer<typeof schema>;

type ShoppingCartListRowProps = {
  item: Product;
};

const ShoppingCartListRow = ({ item }: ShoppingCartListRowProps) => {
  const id = useId();
  const jobNameId = `jobName-${id}`;
  const quantityId = `quantity-${id}`;

  const checkAvailabilityQuery = useCheckAvailability(item.code, item.quantity);
  const availabilityData = checkAvailabilityQuery.data?.[0];

  const { register, watch } = useForm<Schema>({
    resolver: zodResolver(schema),
    values: {
      quantity: item.quantity ?? 0,
    },
  });
  const quantity = watch("quantity");
  const price = availabilityData?.price ?? 0;

  const address = useSelectedAddress();

  let shipText = "";
  let shipTime = "";
  let disclaimer = "";
  if (AVAILABILITY_STATUSES.IN_STOCK === availabilityData?.status) {
    shipText = `Ships from ${address?.locality}, ${address?.region}`;
    shipTime = "Same Day Shipping (if ordered before 12:00 Noon)";
  } else if (AVAILABILITY_STATUSES.NOT_IN_STOCK === availabilityData?.status) {
    shipText = `Backordered, ETA ${dayjs(availabilityData.options?.[0]?.backOrderDate_1).format("ddd MMM D, YYYY")} Ships from ${address?.locality}, ${address?.region}`;
    shipTime = "Will Call Pickup";
    disclaimer =
      "(Note: Dates are subject to change by suppliers without notice.)";
  }

  return (
    <>
      <TableRow className="border-b-0">
        <TableCell rowSpan={2}>
          <Link
            href={`/product-item/${item.itemInfo.groupId}/${item.itemInfo.txt_wurth_lac_item}`}
          >
            <Image
              src={getMediaUrl(item.itemInfo.img)}
              alt={item.itemInfo.txt_sub_description}
              width={92}
              height={92}
              className="size-[92px] border border-brand-gray-200 object-contain"
            />
          </Link>
        </TableCell>

        <TableCell className="flex flex-col gap-0.5 pb-0">
          <Link
            href={`/product-item/${item.itemInfo.groupId}/${item.itemInfo.txt_wurth_lac_item}`}
            className="text-sm text-brand-gray-500"
          >
            Item#: {item.itemInfo.txt_wurth_lac_item}
          </Link>

          <h4 className="font-bold">{item.itemInfo.txt_description_name}</h4>
        </TableCell>

        <TableCell className="pb-0 text-right text-brand-gray-500">
          <span className="font-bold">${price}</span> /{" "}
          {getUomLabel(item.itemInfo.txt_uom)}
        </TableCell>

        <TableCell className="pb-0">
          <VisuallyHidden>
            <Label htmlFor={quantityId}>Quantity</Label>
          </VisuallyHidden>

          <Input
            id={quantityId}
            className="mx-auto h-6 w-16 px-1 text-base leading-4"
            {...register("quantity", {
              valueAsNumber: true,
            })}
          />
        </TableCell>

        <TableCell className="pb-0 text-center text-brand-gray-500">
          {getUomLabel(item.itemInfo.txt_uom)}
        </TableCell>

        <TableCell className="pb-0 text-right font-bold text-brand-gray-500">
          $ {formatNumberToPrice(quantity * price)}
        </TableCell>

        <TableCell className="pb-0">
          <button>
            <VisuallyHidden>Remove item</VisuallyHidden>

            <MdDeleteOutline />
          </button>
        </TableCell>
      </TableRow>

      <TableRow className="border-b-0">
        <TableCell colSpan={2}>
          <VisuallyHidden>
            <Label htmlFor={jobNameId}>PO/Job Name</Label>
          </VisuallyHidden>

          <Input
            id={jobNameId}
            placeholder="PO/Job Name"
            className="h-6 w-full max-w-[164px] border-brand-gray-300 px-1 text-base leading-4 placeholder:text-brand-gray-300"
          />
        </TableCell>

        <TableCell colSpan={4}>
          <Collapsible className="flex flex-col items-end">
            <CollapsibleTrigger className="group flex flex-row items-center font-wurth text-sm font-extrabold uppercase leading-[22px] text-black">
              <span>Change Shipping Options</span>

              <MdKeyboardArrowDown className="text-[22px] leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <ShippingOptions
                sku={item.itemInfo.txt_wurth_lac_item}
                quantity={quantity}
              />
            </CollapsibleContent>
          </Collapsible>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          colSpan={7}
          className="space-y-1 text-right text-sm font-bold leading-5 text-brand-gray-500"
        >
          <div className="flex flex-row items-center justify-end gap-1">
            <span>Availability</span>

            <Separator className="h-3.5 w-0.5 bg-brand-gray-500" />

            <span
              className={cn({
                "text-brand-success":
                  availabilityData?.status === AVAILABILITY_STATUSES.IN_STOCK,
                "text-brand-primary":
                  availabilityData?.status ===
                  AVAILABILITY_STATUSES.NOT_IN_STOCK,
              })}
            >
              {!!availabilityData?.status &&
                getStatusLabel(availabilityData.status)}
            </span>
          </div>

          <div className="flex flex-row items-center justify-end gap-1">
            <span className="font-normal">Quantity {quantity} </span>

            <Separator className="inline-block h-3.5 w-0.5 bg-brand-gray-500" />

            <span>{shipText}</span>

            <Separator className="inline-block h-3.5 w-0.5 bg-brand-gray-500" />

            <span>{shipTime}</span>
          </div>

          {!!disclaimer && <div>{disclaimer}</div>}
        </TableCell>
      </TableRow>
    </>
  );
};

export default ShoppingCartListRow;
