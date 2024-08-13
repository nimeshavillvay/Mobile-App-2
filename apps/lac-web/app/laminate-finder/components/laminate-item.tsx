import NumberInputField from "@/_components/number-input-field";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";
import { Suspense } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { LaminateAddToCartFormSchema } from "../helpers";
import LaminateItemRowPrice from "./laminate-item-row-price";

const LaminateItem = ({
  productId,
  token,
  size,
  quantityFieldIndex,
  sku,
}: {
  readonly productId: number;
  readonly token: string;
  readonly size: string;
  readonly quantityFieldIndex: number;
  readonly formId: string;
  readonly sku: string;
}) => {
  const { data: checkAvailabilityQuery } = useSuspenseCheckAvailability(token, {
    productId: Number(productId),
    qty: 1,
  });

  const { control, watch, register, setValue } =
    useFormContext<LaminateAddToCartFormSchema>();

  const quantity = watch(`quantity.${quantityFieldIndex}`);

  register(`productId.${quantityFieldIndex}`);
  setValue(`productId.${quantityFieldIndex}`, productId.toString());

  register(`sku.${quantityFieldIndex}`);
  setValue(`sku.${quantityFieldIndex}`, sku);

  return (
    <TableRow key={productId}>
      <TableCell className="w-40 text-nowrap">{size}</TableCell>
      <TableCell className="text-nowrap">
        Home Branch:{" "}
        <strong className="font-semibold">
          {checkAvailabilityQuery.availableLocations[0]?.amount ?? 0}
        </strong>
        <br />
        Alt Branch:{" "}
        <strong className="font-semibold">
          {checkAvailabilityQuery.availableLocations[1]?.amount ?? 0}
        </strong>
        <br />
      </TableCell>
      <TableCell className="text-right">
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
      </TableCell>
      {!!quantity && (
        <TableCell className="text-right font-medium">
          <Suspense
            key={productId}
            fallback={<Skeleton className="h-4 w-full rounded-lg shadow-md" />}
          >
            <LaminateItemRowPrice
              token={token}
              productId={productId}
              quantityFieldIndex={quantityFieldIndex}
            />
          </Suspense>
        </TableCell>
      )}
    </TableRow>
  );
};

export default LaminateItem;
