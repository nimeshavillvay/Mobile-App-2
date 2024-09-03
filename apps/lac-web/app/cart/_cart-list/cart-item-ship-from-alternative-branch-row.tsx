import NumberInputField from "@/_components/number-input-field";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import { type AvailabilityOptionPlants } from "@/_hooks/product/use-suspense-check-availability.hook";
import { DEFAULT_PLANT, MAX_QUANTITY } from "@/_lib/constants";
import type { CartItemConfiguration } from "@/_lib/types";
import { type Plant } from "@/_lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";
import { useDeferredValue } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useCartItemQuantityContext } from "../cart-item-quantity-context";
import { FALSE_STRING } from "../constants";
import { type Availability } from "../types";
import {
  BackOrderItemCountLabel,
  ItemCountBadge,
  ItemInStockCountBadge,
} from "./cart-item-shipping-method";
import {
  getAlternativeBranchesConfig,
  type ShipFromAltQtySchema,
} from "./helpers";
import PlantName from "./plant-name";

type BranchRowProps = {
  readonly quantityFieldIndex: number;
  readonly plant: AvailabilityOptionPlants;
  readonly plants: Plant[];
  readonly willCallPlant: { plantCode: string; plantName: string };
  readonly availability: Availability;
  readonly requiredQuantity: number;
  readonly minAmount: number;
  readonly increment: number;
  readonly uom: string;
  readonly onSave: (config: Partial<CartItemConfiguration>) => void;
  readonly hash: string;
  //todo: send selected shipping method
};

const CartItemShipFromAlternativeBranchRow = ({
  quantityFieldIndex,
  plant,
  plants,
  willCallPlant,
  availability,
  requiredQuantity,
  minAmount,
  increment,
  uom,
  hash,
  onSave,
}: BranchRowProps) => {
  const { lineQuantity, setLineQuantity } = useCartItemQuantityContext();

  const { control, watch } = useFormContext<ShipFromAltQtySchema>();

  const quantities = watch("quantityAlt");
  const delayedQuantities = useDebouncedState(quantities);
  const deferredQuantities = useDeferredValue(delayedQuantities);

  const handleChangeQtyShippingMethod = (qtyOrMethod: {
    qty?: number;
    method?: string;
  }) => {
    console.log("qtyOrMethod qty", qtyOrMethod.qty);
    console.log("qtyOrMethod", qtyOrMethod.method);
    if (qtyOrMethod.qty === undefined && !!qtyOrMethod.method) {
      return;
    }
    console.log(">> pass");
    const newQuantity =
      qtyOrMethod.qty ?? Number(deferredQuantities[quantityFieldIndex]);
    const existingQuantity = deferredQuantities.filter(
      (_, index) => index === quantityFieldIndex,
    );
    const totalQty = lineQuantity + newQuantity - Number(existingQuantity);
    setLineQuantity(totalQty);

    const SelectedPlant = [
      {
        index: plant.index,
        quantity: newQuantity,
        method: qtyOrMethod.method,
        plant: plant.plant,
      },
    ];

    onSave({
      ...getAlternativeBranchesConfig({
        plants: SelectedPlant,
        method: qtyOrMethod.method ?? "",
        hash: hash,
        backOrderDate: "",
        backOrderQuantity: 0,
        homePlant: willCallPlant.plantCode ?? DEFAULT_PLANT.code,
      }),
      will_call_not_in_stock: FALSE_STRING,
    });
  };

  const isHomePlant = plant.plant === willCallPlant.plantCode;
  const availabilityOfPlant =
    availability.availableLocations.find(
      (item) => item.location === plant.plant,
    )?.amount ?? 0;

  const requiredQtyOfPlant = isHomePlant
    ? availabilityOfPlant
    : requiredQuantity;

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
                    handleChangeQtyShippingMethod({
                      qty: Number(event.target.value),
                    });
                    onChange(event);
                  }}
                  value={value}
                  ref={ref}
                  name={name}
                  removeDefaultStyles
                  className="h-fit w-24 border-none px-2.5 py-1 text-base shadow-none focus:border-r-0 focus:border-none focus:outline-none focus:ring-0 md:w-20"
                  min={minAmount}
                  max={isHomePlant ? MAX_QUANTITY : requiredQtyOfPlant}
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
          {requiredQtyOfPlant < minAmount && (
            <p className="text-sm text-red-700">
              Please consider min. order quantity of: {minAmount}
            </p>
          )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={2}>
          {plant.shippingMethods.length > 0 && (
            <Select
              disabled={plant.shippingMethods.length === 1}
              defaultValue={plant.shippingMethods[0]?.code}
              onValueChange={(method) => {
                handleChangeQtyShippingMethod({ method: method });
              }}
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
              <span>
                <ItemCountBadge count={availabilityOfPlant} />{" "}
                <span className="text-sm font-medium">ship to me</span>
              </span>
              {lineQuantity - availabilityOfPlant > 0 && (
                <BackOrderItemCountLabel
                  count={lineQuantity - availabilityOfPlant}
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
