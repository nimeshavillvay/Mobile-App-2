"use client";

import { TableCell, TableRow } from "@/old/_components/ui/table";
import VisuallyHidden from "@/old/_components/visually-hidden";
import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import { getMediaUrl } from "@/old/_utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AddItemCell, PriceTableCell, QuantityTableCell } from "../table-cells";
import { RelatedProductItem } from "./types";

const schema = z.object({
  quantity: z.number().int().min(1),
});
type Schema = z.infer<typeof schema>;

type RelatedProductRowProps = {
  item: RelatedProductItem;
};

const RelatedProductRow = ({ item }: RelatedProductRowProps) => {
  const accountListQuery = useAccountList();

  const { register, handleSubmit, watch } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const quantity = watch("quantity") ?? 1;

  return (
    <TableRow key={`${item.group_id}-${item.txt_wurth_lac_item}`}>
      <TableCell>
        <Link
          href={`/product-item/${item.group_id}/${item.txt_wurth_lac_item}`}
        >
          <VisuallyHidden>
            {item.txt_sub_description} by {item.item_brand_name}
          </VisuallyHidden>

          <Image
            src={getMediaUrl(item.item_img)}
            alt={`An image of ${item.txt_sub_description}`}
            width={84}
            height={87}
            className="border-brand-gray-200 h-[87px] w-[84px] rounded-sm border object-contain"
          />
        </Link>
      </TableCell>

      <TableCell className="space-y-0.5">
        <div className="text-sm uppercase leading-5 text-[#333333]">
          {item.item_brand_name}
        </div>

        <Link
          href={`/product-item/${item.group_id}/${item.txt_wurth_lac_item}`}
          className="text-base font-black leading-5 text-black"
        >
          {item.txt_sub_description}
        </Link>

        <div className="text-brand-gray-500 flex flex-row gap-1.5 text-sm leading-5">
          <div>
            Item #: <span className="font-bold">{item.txt_wurth_lac_item}</span>
          </div>

          <div>&bull;</div>

          <div>
            MFR Part #: <span className="font-bold">{item.txt_mfn}</span>
          </div>
        </div>
      </TableCell>

      {!!accountListQuery.data && (
        <>
          <PriceTableCell
            sku={item.txt_wurth_lac_item}
            uom={item.txt_uom_label}
            quantity={quantity}
          />

          <QuantityTableCell
            minOrder={item.txt_min_order_amount}
            multiples={item.txt_order_qty_increments}
            formRegister={register}
          />

          <TableCell>{item.txt_uom_label}</TableCell>
        </>
      )}

      <AddItemCell
        handleSubmit={handleSubmit}
        product={{ sku: item.txt_wurth_lac_item }}
      />
    </TableRow>
  );
};

export default RelatedProductRow;
