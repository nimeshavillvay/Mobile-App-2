"use client";

import NumberInputField from "@/_components/number-input-field";
import type { EdgeBanding } from "@/_lib/types";

import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";
import { Suspense, useDeferredValue } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { EdgeBandingAddToCartFormSchema } from "../helpers";
import EdgeBandRowPrice from "./edgeband-item-row-price";

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
    useFormContext<EdgeBandingAddToCartFormSchema>();

  register(`bandProductId.${quantityFieldIndex}`);
  register(`bandSku.${quantityFieldIndex}`);

  setValue(`bandProductId.${quantityFieldIndex}`, product.productId.toString());
  setValue(`bandSku.${quantityFieldIndex}`, product.productSku);
  const quantity = watch(`bandQuantity.${quantityFieldIndex}`);

  const delayedQuantity = useDebouncedState(quantity);
  const deferredQuantity = useDeferredValue(delayedQuantity);
  console.log(">> quantity", quantity);
  console.log(">> deferredQuantity", deferredQuantity);
  const priceCheckQueryBreakdown = useSuspensePriceCheck(token, [
    { productId: product.productId, qty: 1 },
  ]);
  const priceBreakdown =
    priceCheckQueryBreakdown.data?.productPrices[0]?.priceBreakDowns;
  const uom = priceCheckQueryBreakdown.data.productPrices[0]?.priceUnit;

  return (
    <TableRow>
      <TableCell className="font-medium">{product.productSku}</TableCell>
      <TableCell className="text-center">
        <span className="text-lg font-semibold">
          {priceCheckQueryBreakdown.data?.productPrices[0]?.price} / {uom}
        </span>
        {priceBreakdown !== undefined &&
          priceBreakdown?.length > 0 &&
          priceBreakdown.map((price, index) => (
            <div className="text-sm text-gray-500" key={index}>
              {price.price}/{uom} for{" "}
              {index === 0
                ? "1"
                : (priceBreakdown[index - 1]?.quantity ?? 0) + 1}
              -{price.quantity} items
            </div>
          ))}
      </TableCell>
      <TableCell>
        <Controller
          control={control}
          name={`bandQuantity.${quantityFieldIndex}`}
          render={({ field: { onChange, onBlur, value = "", name, ref } }) => (
            <NumberInputField
              // form={}
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
        <p className="mt-2 text-center text-sm font-medium text-gray-500">
          {uom}
        </p>
      </TableCell>

      <TableCell className="text-right font-medium">
        {!!quantity && (
          <Suspense
            key={product.productId}
            fallback={<Skeleton className="h-4 w-full rounded-lg shadow-md" />}
          >
            <EdgeBandRowPrice
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
