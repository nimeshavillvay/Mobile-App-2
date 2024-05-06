"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
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
import type { ShippingMethod } from "./types";
import useUpdateCartItemMutation from "./use-update-cart-item-mutation.hook";

const SHIP_TO_ME = "ship-to-me";
const WILL_CALL = "will-call";

type ShippingMethodProps = {
  token: string;
  options: ShippingMethod[];
};

const ShippingMethod = ({ token, options }: ShippingMethodProps) => {
  const id = useId();
  const shipToMeId = `ship-to-me-${id}`;
  const willCallId = `will-call-${id}`;

  const [selectedSection, setSelectedSection] = useState<string>();

  const cartQuery = useSuspenseCart(token);

  const updateCartItemMutation = useUpdateCartItemMutation();

  const handleSelectValueChange = (value: string) => {
    updateCartItemMutation.mutate(
      cartQuery.data.cartItems.map((item) => ({
        productId: item.itemInfo.productId,
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
                {options.map((option) => (
                  <SelectItem key={option.code} value={option.code}>
                    {option.name}
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
            Store pick up (Will call) at Brea, CA
          </Label>
        </li>
      </ul>
    </div>
  );
};

export default ShippingMethod;
