"use client";

import { TableCell, TableRow } from "@/old/_components/ui/table";
import useAccountList from "@/old/_hooks/account/use-account-list.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AddItemCell, PriceTableCell, QuantityTableCell } from "../table-cells";
import type { Attribute, Variant } from "../types";

const schema = z.object({
  quantity: z.number().int().min(1),
});
type Schema = z.infer<typeof schema>;

type VariantRowProps = {
  variant: Variant;
  attributes: Attribute[];
};

const VariantRow = ({ variant, attributes }: VariantRowProps) => {
  const accountListQuery = useAccountList();

  const { register, handleSubmit, watch } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const quantity = watch("quantity") ?? 1;

  return (
    <TableRow key={variant.txt_wurth_lac_item}>
      <TableCell className="space-y-0.5 text-sm leading-5">
        <div className="font-bold">{variant.txt_wurth_lac_item}</div>
        <div className="text-brand-gray-500">{variant.txt_mfn}</div>
      </TableCell>

      {attributes.map((attribute) => (
        <TableCell
          key={attribute.slug}
          className="text-center text-sm leading-5 text-brand-gray-500"
        >
          {
            variant.Attributes.find(
              (variantAttribute) => variantAttribute.slug === attribute.slug,
            )?.value
          }
        </TableCell>
      ))}

      {!!accountListQuery.data && (
        <>
          <PriceTableCell
            sku={variant.txt_wurth_lac_item}
            uom={variant.txt_uom_label}
            quantity={quantity}
          />

          <QuantityTableCell
            minOrder={variant.txt_min_order_amount}
            multiples={variant.txt_order_qty_increments}
            formRegister={register}
          />
        </>
      )}

      <TableCell className="text-left text-sm leading-5 text-brand-gray-500">
        {variant.txt_uom_label}
      </TableCell>

      <AddItemCell
        handleSubmit={handleSubmit}
        product={{ sku: variant.txt_wurth_lac_item }}
      />
    </TableRow>
  );
};

export default VariantRow;
