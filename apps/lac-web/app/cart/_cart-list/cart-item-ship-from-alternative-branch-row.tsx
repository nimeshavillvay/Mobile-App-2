import NumberInputField from "@/_components/number-input-field";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import { type AvailabilityOptionPlants } from "@/_hooks/product/use-suspense-check-availability.hook";
import { type Plant } from "@/_lib/types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/web-ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";
import { useDeferredValue, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { type Availability } from "../types";
import {
  BackOrderItemCountLabel,
  ItemCountBadge,
  ItemInStockCountBadge,
} from "./cart-item-shipping-method";
import { type ShipFromAltQtySchema } from "./helpers";
import PlantName from "./plant-name";

type BranchRowProps = {
  readonly quantityFieldIndex: number;
  readonly plant: AvailabilityOptionPlants;
  readonly plants: Plant[];
  readonly willCallPlant: { plantCode: string; plantName: string };
  readonly availability: Availability;
  readonly minAmount: number;
  readonly increment: number;
  readonly uom: string;
  readonly availableQuantityInPlant: number;
  readonly defaultBoQty: number;
};

const CartItemShipFromAlternativeBranchRow = ({
  quantityFieldIndex,
  plant,
  plants,
  willCallPlant,
  availability,
  minAmount,
  increment,
  uom,
  availableQuantityInPlant,
  defaultBoQty,
}: BranchRowProps) => {
  const { control, watch } = useFormContext<ShipFromAltQtySchema>();
  const [boQty, setBoQty] = useState(defaultBoQty);

  const quantity = watch("quantityAlt");
  const delayedQuantity = useDebouncedState(quantity);
  const deferredQuantity = useDeferredValue(delayedQuantity);

  const updateBackOrderQuantity = (quantity: number) => {
    setBoQty(
      availableQuantityInPlant < quantity
        ? quantity - availableQuantityInPlant
        : 0,
    );
  };

  const isHomePlant = plant.plant === willCallPlant.plantCode;
  const availabilityOfPlant =
    availability.availableLocations.find(
      (item) => item.location === plant.plant,
    )?.amount ?? 0;

  return (
    <>
      <TableRow key={plant.plant} className="w-full border-b-0 pt-5">
        <TableCell className="w-1/2 font-medium">
          <PlantName plants={plants} plantCode={plant.plant} />
          <div className="text-sm">
            <ItemInStockCountBadge availableCount={availabilityOfPlant} />
          </div>
        </TableCell>
        <TableCell className="w-1/2 text-right">
          <Controller
            control={control}
            name={`quantityAlt.${quantityFieldIndex}`}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <div className="flex items-center rounded border focus:border-none focus:outline-none focus:ring-0">
                <NumberInputField
                  onBlur={onBlur}
                  onChange={(event) => {
                    updateBackOrderQuantity(Number(event.target.value));
                    onChange(
                      Number(event.target.value) > availableQuantityInPlant &&
                        !isHomePlant
                        ? availableQuantityInPlant
                        : event,
                    );
                  }}
                  value={value}
                  ref={ref}
                  name={name}
                  removeDefaultStyles
                  className="h-fit w-24 border-none px-2.5 py-1 text-base shadow-none focus:border-r-0 focus:border-none focus:outline-none focus:ring-0 md:w-20"
                  min={minAmount}
                  step={increment}
                  label="Quantity"
                />
                <span className="px-1.5 lowercase text-zinc-500">{uom}</span>
              </div>
            )}
          />
        </TableCell>
      </TableRow>

      <TableRow className="border-y-0 hover:bg-transparent">
        <TableCell colSpan={2}>
          {Number(deferredQuantity[quantityFieldIndex]) < minAmount && (
            <p className="text-sm text-red-700">
              Please consider min. order quantity of: {minAmount}
            </p>
          )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={2}>
          {plant.shippingMethods.length > 0 && (
            <FormField
              control={control}
              name={`shippingMethod.${quantityFieldIndex}`}
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <Select
                    disabled={plant.shippingMethods.length === 1}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a delivery method" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {plant.shippingMethods.map((option) => (
                        <SelectItem key={option.code} value={option.code}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription className="sr-only">
                    Select your country
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {isHomePlant && (
            <div className="py-2 text-sm font-medium">
              <span>
                <ItemCountBadge count={availabilityOfPlant} />{" "}
                <span className="text-sm font-medium">ship to me</span>
              </span>
              {boQty > 0 && <BackOrderItemCountLabel count={boQty} />}{" "}
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartItemShipFromAlternativeBranchRow;
