"use client";

import NumberInputField from "@/_components/number-input-field";
import type { EdgeBanding } from "@/_lib/types";

import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";
import { Suspense } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { LaminateAddToCartFormSchema } from "../helpers";
import LaminateItemRowPrice from "./laminate-item-row-price";

const LaminateEdgeBandingRow = ({
  product,
  token,
  quantityFieldIndex,
}: {
  readonly groupId: string;
  readonly product: EdgeBanding;
  readonly token: string;
  readonly quantityFieldIndex: number;
}) => {
  const { control, watch, register, setValue } =
    useFormContext<LaminateAddToCartFormSchema>();

  const quantity = watch(`quantity.${quantityFieldIndex}`);

  register(`productId.${quantityFieldIndex}`);
  setValue(`productId.${quantityFieldIndex}`, product.productId.toString());

  register(`sku.${quantityFieldIndex}`);
  setValue(`sku.${quantityFieldIndex}`, product.productSku);

  return (
    <TableRow>
      <TableCell className="font-medium">{product.mfrPartNo}</TableCell>
      <TableCell className="text-center">
        <span className="text-lg font-semibold">$24.99 / EA</span>
      </TableCell>
      <TableCell className="text-right">
        <p className="text-sm text-gray-500">
          $24.99/EA for 25-99 items,
          <br />
          24.99/EA for 25-99 items,
          <br />
          24.99/EA for 25-99 items,
        </p>
      </TableCell>
      <TableCell>
        <Controller
          control={control}
          name={`quantity.${quantityFieldIndex}`}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <NumberInputField
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              ref={ref}
              name={name}
              min={1}
              step={1}
              className="md:w-[6.125rem]"
              removeDefaultStyles={true}
              label="Quantity"
            />
          )}
        />
        <p className="mt-2 text-center text-sm font-medium text-gray-500">EA</p>
      </TableCell>

      <TableCell className="text-right font-medium">
        {!!quantity && (
          <Suspense
            key={product.productId}
            fallback={<Skeleton className="h-4 w-full rounded-lg shadow-md" />}
          >
            <LaminateItemRowPrice
              token={token}
              productId={product.productId}
              quantityFieldIndex={quantityFieldIndex}
            />
          </Suspense>
        )}
      </TableCell>
    </TableRow>
  );
};

export default LaminateEdgeBandingRow;
