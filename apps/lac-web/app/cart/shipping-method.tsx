"use client";

import useSuspenseWillCallPlant from "@/_header/_will-call-plant/use-suspense-will-call-plant.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartItemMutation from "@/_hooks/cart/use-update-cart-item-mutation.hook";
import { DEFAULT_PLANT } from "@/_lib/constants";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import { Label } from "@repo/web-ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { useId, useState } from "react";
import { EXCLUDED_SHIPPING_METHODS } from "./constants";
import type { ShippingMethod } from "./types";

const SHIP_TO_ME = "ship-to-me";
const WILL_CALL = "will-call";

type ShippingMethodProps = {
  readonly token: string;
  readonly options: ShippingMethod[];
};

const ShippingMethod = ({
  token,
  options: shippingMethods,
}: ShippingMethodProps) => {
  const id = useId();
  const shipToMeId = `${SHIP_TO_ME}-${id}`;
  const willCallId = `${WILL_CALL}-${id}`;

  shippingMethods = shippingMethods.filter(
    (method) => !EXCLUDED_SHIPPING_METHODS.includes(method.code),
  );

  const [selectedSection, setSelectedSection] = useState<string>();

  const cartQuery = useSuspenseCart(token);
  const willCallPlantQuery = useSuspenseWillCallPlant(token);
  const willCallPlant = willCallPlantQuery.data;

  const updateCartItemMutation = useUpdateCartItemMutation(token);

  const handleSelectValueChange = (value: string) => {
    updateCartItemMutation.mutate(
      cartQuery.data.cartItems.map((item) => ({
        cartItemId: item.cartItemId,
        quantity: item.quantity,
        config: {
          ...item.configuration,
          shipping_method_1: value,
        },
      })),
    );
  };

  return (
    <div className="space-y-3 rounded-lg border border-wurth-gray-150 px-5 py-4 shadow-md">
      <h3 className="pb-2 text-sm text-black">Default delivery method</h3>

      <ul className="flex flex-col gap-3">
        <li className="flex flex-col items-stretch gap-2">
          <div className="flex flex-row items-center gap-3">
            <Checkbox
              id={shipToMeId}
              className="rounded-full"
              checked={selectedSection === SHIP_TO_ME}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setSelectedSection(SHIP_TO_ME);
                } else {
                  setSelectedSection(undefined);
                }
              }}
              disabled={updateCartItemMutation.isPending}
            />

            <Label htmlFor={shipToMeId}>Ship to me</Label>
          </div>

          <div className="ml-[1.625rem]">
            <Select
              disabled={
                selectedSection !== SHIP_TO_ME ||
                updateCartItemMutation.isPending
              }
              onValueChange={handleSelectValueChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a delivery method" />
              </SelectTrigger>

              <SelectContent>
                {shippingMethods.map((method) => (
                  <SelectItem key={method.code} value={method.code}>
                    {method.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </li>

        <li className="flex flex-row items-center gap-3">
          <Checkbox
            id={willCallId}
            className="rounded-full"
            checked={selectedSection === WILL_CALL}
            onCheckedChange={(checked) => {
              if (checked === true) {
                setSelectedSection(WILL_CALL);
              } else {
                setSelectedSection(undefined);
              }
            }}
            disabled={updateCartItemMutation.isPending}
          />

          <Label htmlFor={willCallId}>
            Store pick up (Will call) at&nbsp;
            {willCallPlant?.plantName ?? DEFAULT_PLANT.name}
          </Label>
        </li>
      </ul>
    </div>
  );
};

export default ShippingMethod;
