import ErrorBoundary from "@/old/_components/error-boundary";
import { Button } from "@/old/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/old/_components/ui/collapsible";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import { TableCell, TableRow } from "@/old/_components/ui/table";
import { cn, getMediaUrl } from "@/old/_utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as z from "zod";
import ItemAttributes from "./_item-attributes/item-attributes";
import { DATE_FORMAT } from "./constants";
import ItemPlaceholder from "./item-placeholder.png";
import { CombinedPurchasedItem } from "./types";

const schema = z.object({
  quantity: z.number().min(1).nullable(),
});

type Schema = z.infer<typeof schema>;

type PurchasedItemRowProps = {
  token: string;
  item: CombinedPurchasedItem;
  index: number;
};

const PurchasedItemRow = ({ token, item, index }: PurchasedItemRowProps) => {
  const [showItemAttributes, setShowItemAttributes] = useState<boolean>(false);
  const id = useId();
  const quantityId = `quantity-${id}`;

  const { register } = useForm<Schema>({
    resolver: zodResolver(schema),
    values: {
      quantity: null,
    },
  });

  const generateItemUrl = (group_id: string, sku: string) => {
    if (group_id && sku) {
      return `/product-item/${group_id}/${sku}`;
    }
    return "#";
  };

  return (
    <>
      <TableRow
        className={cn(
          "border-b-0",
          index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
        )}
      >
        <TableCell>
          <Link
            href={generateItemUrl(item.group_id, item.sku)}
            className={
              item.group_id ? "pointer-events-auto" : "pointer-events-none"
            }
          >
            <Image
              src={item.img ? getMediaUrl(item.img) : ItemPlaceholder}
              alt={item.txt_sap_description_name}
              width={92}
              height={92}
              className="size-[92px] border border-brand-gray-200 object-contain"
            />
          </Link>
        </TableCell>

        <TableCell className="flex flex-col gap-0.5">
          <Link
            href={generateItemUrl(item.group_id, item.sku)}
            className={cn(
              "text-sm text-brand-gray-500",
              item.group_id ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            Item# : {item.sku !== "" ? item.sku : "N/A"}
          </Link>

          <div className="text-sm text-brand-gray-500">
            MRF Part# : {item.txt_mfn !== "" ? item.txt_mfn : "N/A"}
          </div>

          <h4 className="text-wrap font-bold">
            {item.txt_sap_description_name}
          </h4>

          <div className="text-sm text-brand-gray-500">
            Category : {item.txt_category !== "" ? item.txt_category : "N/A"}
          </div>
        </TableCell>

        <TableCell className="text-center text-sm text-brand-gray-500">
          {item.orderDate ? dayjs(item.orderDate).format(DATE_FORMAT) : "N/A"}
        </TableCell>

        <TableCell className="text-center text-sm text-brand-gray-500">
          {item.totalItem ?? "N/A"}
        </TableCell>

        <TableCell>
          <div className="cursor-pointer text-sm text-brand-primary">
            Show my price
          </div>
        </TableCell>

        <TableCell className="flex flex-col gap-0.5 pb-0 text-sm text-brand-gray-500">
          <Label htmlFor={quantityId} className="sr-only">
            Quantity
          </Label>
          <Input
            id={quantityId}
            type="number"
            disabled={!item.group_id}
            className="h-6 w-16 px-1 text-right text-base leading-4"
            {...register("quantity", {
              valueAsNumber: true,
            })}
          />
          {item.group_id && (
            <>
              <div>
                <span className="font-bold text-black">Min: </span>
                {item.txt_min_order_amount}
              </div>

              <div>
                <span className="font-bold text-black">Multiples: </span>
                {item.txt_order_qty_increments}
              </div>
            </>
          )}
        </TableCell>

        <TableCell className="text-sm text-brand-gray-500">
          {item.txt_uom !== "" ? item.txt_uom : "N/A"}
        </TableCell>
      </TableRow>

      <TableRow
        className={cn(
          "border-b-0",
          index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
        )}
      >
        <TableCell></TableCell>
        <TableCell colSpan={3} className="py-2">
          <Collapsible
            open={showItemAttributes}
            onOpenChange={setShowItemAttributes}
            disabled={!item?.group_id}
          >
            <CollapsibleTrigger>
              <div
                className={cn(
                  "group flex flex-row items-center text-sm",
                  item.group_id
                    ? "cursor-pointer text-brand-primary"
                    : "cursor-not-allowed text-brand-gray-400",
                )}
              >
                <span>
                  {showItemAttributes ? "Hide" : "View"} item attributes
                </span>

                <MdKeyboardArrowDown className="text-lg leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <ErrorBoundary
                fallback={
                  <div className="p-4 text-brand-primary">
                    Failed to Load Attributes!!!
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="p-4 text-brand-gray-400">
                      Attributes Loading...
                    </div>
                  }
                >
                  <ItemAttributes token={token} sku={item.sku} />
                </Suspense>
              </ErrorBoundary>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>

        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>

      <TableRow
        className={cn(
          "border-b-0",
          index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
        )}
      >
        <TableCell colSpan={7}>
          <div className="flex flex-row items-end justify-end gap-2">
            <Button className="w-[170px]" disabled>
              Add to cart
            </Button>

            <Button variant="ghost">
              <IoMdHeartEmpty className="text-2xl text-brand-gray-500" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PurchasedItemRow;
