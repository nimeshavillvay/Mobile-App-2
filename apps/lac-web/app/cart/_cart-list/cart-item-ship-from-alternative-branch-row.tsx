import NumberInputField from "@/_components/number-input-field";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import { type AvailabilityOptionPlants } from "@/_hooks/product/use-suspense-check-availability.hook";
import { type Plant } from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";
import { useDeferredValue } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCartItemQuantityContext } from "../cart-item-quantity-context";
import { type Availability } from "../types";
import {
  BackOrderItemCountLabel,
  ItemCountBadge,
  ItemInStockCountBadge,
} from "./cart-item-shipping-method";
import { shipFromAltQtySchema, type ShipFromAltQtySchema } from "./helpers";
import PlantName from "./plant-name";

type BranchRowProps = {
  readonly quantityFieldIndex: number;
  readonly plant: AvailabilityOptionPlants;
  readonly plants: Plant[];
  readonly willCallPlant: { plantCode: string; plantName: string };
  // readonly homeBranchAvailableQuantity: number;
  readonly availability: Availability;
  readonly requiredQuantity: number;
};

const CartItemShipFromAlternativeBranchRow = ({
  quantityFieldIndex,
  plant,
  plants,
  willCallPlant,
  availability,
  requiredQuantity,
}: BranchRowProps) => {
  const { lineQuantity, setLineQuantity } = useCartItemQuantityContext();

  const { control, watch } = useForm<ShipFromAltQtySchema>({
    resolver: zodResolver(shipFromAltQtySchema),
  });

  const quantities = watch("quantityAlt");
  const delayedQuantities = useDebouncedState(quantities);
  const deferredQuantities = useDeferredValue(delayedQuantities);

  const handleChangeQty = (qty: number) => {
    console.log(">> lineQuantity", lineQuantity);
    console.log(">> getValues", deferredQuantities);
    const altQtySum = deferredQuantities.reduce((collector, num) => {
      return (collector += Number(num));
    }, 0);
    setLineQuantity(lineQuantity + altQtySum - qty);
  };

  const isHomePlant = plant.plant === willCallPlant.plantCode;
  const availabilityOfPlant =
    availability.availableLocations.find(
      (item) => item.location === plant.plant,
    )?.amount ?? 0;

  const getRequiredQuantity = () => {
    if (isHomePlant) {
      return availabilityOfPlant;
    }
    return requiredQuantity;
  };

  return (
    <>
      <TableRow key={plant.plant} className="w-full border-b-0">
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
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <div className="flex items-center rounded border focus:border-none focus:outline-none focus:ring-0">
                <NumberInputField
                  onBlur={onBlur}
                  onChange={(event) => {
                    handleChangeQty(Number(event.target.value));
                    onChange(event);
                  }}
                  defaultValue={getRequiredQuantity()}
                  ref={ref}
                  name={name}
                  removeDefaultStyles
                  className="h-fit w-24 border-none px-2.5 py-1 text-base shadow-none focus:border-r-0 focus:border-none focus:outline-none focus:ring-0 md:w-20"
                  min={0}
                  label="Quantity"
                />
                <span className="px-1.5 lowercase text-zinc-500">each</span>
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
          {isHomePlant && (
            <div className="py-2 text-sm font-medium">
              {/* {availability.availableLocations.find(plant.plant)} */}
              <span>
                <ItemCountBadge count={availabilityOfPlant} />{" "}
                <span className="text-sm font-medium">ship to me</span>
              </span>
              {lineQuantity < availabilityOfPlant && (
                <BackOrderItemCountLabel
                  count={availabilityOfPlant - lineQuantity}
                />
              )}{" "}
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartItemShipFromAlternativeBranchRow;
