import NumberInputField from "@/_components/number-input-field";
import { type AvailabilityOptionPlants } from "@/_hooks/product/use-suspense-check-availability.hook";
import { type Plant } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";
import { Controller, useForm } from "react-hook-form";
import { shipFromAltQtySchema, type ShipFromAltQtySchema } from "./helpers";
import PlantName from "./plant-name";

type BranchRowProps = {
  readonly quantityFieldIndex: number;
  readonly plant: AvailabilityOptionPlants;
  readonly plants: Plant[];
};

const CartItemShipFromAlternativeBranchRow = ({
  quantityFieldIndex,
  plant,
  plants,
}: BranchRowProps) => {
  const { control } = useForm<ShipFromAltQtySchema>({
    resolver: zodResolver(shipFromAltQtySchema),
  });
  const handleChangeQty = (qty: number) => {
    console.log(">> number", qty);
  };
  return (
    <TableRow key={plant.plant}>
      <TableCell>
        <div>
          <PlantName plants={plants} plantCode={plant.plant} />
        </div>
        {/* <div className="text-xs">
        via&nbsp;
        {plant.plant === willCallPlant.plantCode
          ? shippingMethods?.find(
              (option) =>
                option.code ===
                selectedShippingMethod,
            )?.name ?? defaultShippingMethod?.name
          : "Ground"}
      </div> */}
      </TableCell>
      <TableCell className="text-end">
        {plant.quantity}
        <Controller
          control={control}
          name={`quantity.${quantityFieldIndex}`}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <NumberInputField
              onBlur={onBlur}
              onChange={(event) => {
                // if (
                //   Number(event.target.value) >= product.minAmount &&
                //   Number(event.target.value) % product.increment === 0
                // ) {
                //   handleChangeQtyOrPO(Number(event.target.value));
                // }
                handleChangeQty(Number(event.target.value));
                onChange(event);
              }}
              value={value}
              ref={ref}
              name={name}
              className={cn(
                "h-fit w-24 rounded border-r-0 px-2.5 py-1 text-base focus:border-none focus:outline-none focus:ring-0 md:w-20",
                // isQuantityLessThanMin ? "border-red-700" : "",
              )}
              required
              // min={product.minAmount}
              // step={product.increment}
              // disabled={checkAvailabilityQuery.isPending}
              // form={cartFormId} // This is to check the validity when clicking "checkout"
              label="Quantity"
            />
          )}
        />
      </TableCell>
    </TableRow>
  );
};

export default CartItemShipFromAlternativeBranchRow;
