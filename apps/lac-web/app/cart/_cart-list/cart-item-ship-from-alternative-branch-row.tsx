import NumberInputField from "@/_components/number-input-field";
import { type AvailabilityOptionPlants } from "@/_hooks/product/use-suspense-check-availability.hook";
import { type Plant } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
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
    <>
      <TableRow key={plant.plant} className="border-b-0">
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
        <TableCell className="float-right text-end">
          {/* {plant.quantity} */}
          <Controller
            control={control}
            name={`quantity.${quantityFieldIndex}`}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <div className="flex items-center rounded border focus:border-none focus:outline-none focus:ring-0">
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
                  removeDefaultStyles
                  className={cn(
                    "h-fit w-24 border-none px-2.5 py-1 text-base shadow-none focus:border-r-0 focus:border-none focus:outline-none focus:ring-0 md:w-20",
                    // isQuantityLessThanMin ? "border-red-700" : "",
                  )}
                  // className="float-right md:w-[6.125rem]"
                  min={0}
                  // step={product.increment}
                  // disabled={checkAvailabilityQuery.isPending}
                  label="Quantity"
                />
                <span className={cn("px-1.5 lowercase text-zinc-500")}>
                  each
                  {/* {product.uom} */}
                </span>
              </div>
            )}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={2} className="">
          {plant.shippingMethods.length > 0 && (
            <Select
            // disabled={
            //   selectedShippingOption !== MAIN_OPTIONS.SHIP_TO_ME ||
            //   shipToMeShippingMethods?.length === 1
            // }
            // value={selectedShippingMethod}
            // onValueChange={(method) => handleShipToMeMethod(method)}
            >
              <SelectTrigger className="avail-change-button w-full">
                <SelectValue placeholder="Select a delivery method" />
              </SelectTrigger>

              <SelectContent>
                {plant.shippingMethods.map((option) => (
                  <SelectItem key={option.code} value={option.code}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartItemShipFromAlternativeBranchRow;
