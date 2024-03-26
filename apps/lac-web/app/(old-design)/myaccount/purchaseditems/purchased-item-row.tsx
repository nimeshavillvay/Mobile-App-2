import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import { TableCell, TableRow } from "@/old/_components/ui/table";
import { cn, getMediaUrl } from "@/old/_utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DATE_FORMAT } from "./constants";
import ItemPlaceholder from "./item-placeholder.png";
import { CombinedPurchasedItem } from "./types";

const schema = z.object({
  quantity: z.number().min(1).nullable(),
});

type Schema = z.infer<typeof schema>;

type PurchasedItemRowProps = {
  item: CombinedPurchasedItem;
  index: number;
};

const PurchasedItemRow = ({ item, index }: PurchasedItemRowProps) => {
  const id = useId();
  const quantityId = `quantity-${id}`;

  const { register } = useForm<Schema>({
    resolver: zodResolver(schema),
    values: {
      quantity: null,
    },
  });

  return (
    <TableRow
      className={cn(
        "border-b-0",
        index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
      )}
    >
      <TableCell>
        <Link
          href={
            item.txt_wurth_lac_item
              ? `/product-item/${item.group_id}/${item.txt_wurth_lac_item}`
              : "#"
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

      <TableCell className="flex flex-col gap-0.5 pb-0">
        <Link
          href={
            item.txt_wurth_lac_item
              ? `/product-item/${item.group_id}/${item.txt_wurth_lac_item}`
              : "#"
          }
          className="text-sm text-brand-gray-500"
        >
          Item#: {item.txt_wurth_lac_item ?? "N/A"}
        </Link>

        <h4 className="font-bold">{item.txt_sap_description_name}</h4>
      </TableCell>

      <TableCell className="text-center text-sm text-brand-gray-500">
        {item.orderDate ? dayjs(item.orderDate).format(DATE_FORMAT) : "N/A"}
      </TableCell>

      <TableCell className="text-center text-sm text-brand-gray-500">
        {item.totalItem ?? "N/A"}
      </TableCell>

      <TableCell>{item.sku ?? "N/A"}</TableCell>

      <TableCell className="flex flex-col gap-0.5 pb-0 text-sm text-brand-gray-500">
        <Label htmlFor={quantityId} className="sr-only">
          Quantity
        </Label>
        <Input
          id={quantityId}
          type="number"
          className="h-6 w-16 px-1 text-right text-base leading-4"
          {...register("quantity", {
            valueAsNumber: true,
          })}
        />
        <div>
          <span className="font-bold text-black">Min: </span>
          {item.txt_min_order_amount}
        </div>

        <div>
          <span className="font-bold text-black">Multiples: </span>
          {item.txt_order_qty_increments}
        </div>
      </TableCell>

      <TableCell className="text-right text-sm text-brand-gray-500">
        {item.txt_uom ?? "N/A"}
      </TableCell>
    </TableRow>
  );
};

export default PurchasedItemRow;
