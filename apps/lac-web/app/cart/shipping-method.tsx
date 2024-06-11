"use client";

import useSuspenseWillCallPlant from "@/_hooks/address/use-suspense-will-call-plant.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartItemMutation from "@/_hooks/cart/use-update-cart-item-mutation.hook";
import { checkAvailability } from "@/_lib/apis/shared";
import {
  DEFAULT_PLANT,
  IN_STOCK,
  LIMITED_STOCK,
  NOT_IN_STOCK,
} from "@/_lib/constants";
import type { CartItemConfiguration } from "@/_lib/types";
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
import {
  ALTERNATIVE_BRANCHES,
  AVAILABLE_ALL,
  BACK_ORDER_ALL,
  EXCLUDED_SHIPPING_METHODS,
  TAKE_ON_HAND,
} from "./constants";
import type { Availability, ShippingMethod } from "./types";
import useCartPageStore from "./use-cart-page-store.hook";

const SHIP_TO_ME = "ship-to-me";
const WILL_CALL = "will-call";

type ShippingMethodProps = {
  readonly token: string;
  readonly options: ShippingMethod[];
};

const ShippingMethod = ({ token, options }: ShippingMethodProps) => {
  const id = useId();
  const shipToMeId = `${SHIP_TO_ME}-${id}`;
  const willCallId = `${WILL_CALL}-${id}`;

  const shippingMethods = options?.filter(
    (method) => !EXCLUDED_SHIPPING_METHODS.includes(method.code),
  );

  const [selectedSection, setSelectedSection] = useState<string>();

  const cartQuery = useSuspenseCart(token);
  const willCallPlantQuery = useSuspenseWillCallPlant(token);
  const willCallPlant = willCallPlantQuery.data;

  const updateCartItemMutation = useUpdateCartItemMutation(token);

  const clearConfigKeys = (
    config: CartItemConfiguration,
    prefixes: string[],
  ): void => {
    (Object.keys(config) as (keyof typeof config)[]).forEach((key) => {
      if (prefixes.some((prefix) => key.startsWith(prefix))) {
        config[key] = "";
      }
    });
  };
  const transformConfiguration = (
    availability: Availability,
    config: CartItemConfiguration,
  ) => {
    clearConfigKeys(config, ["avail_", "shipping_method_", "plant_"]);
    config.plant_1 = DEFAULT_PLANT.code;
    config.hashvalue = availability.willCallAnywhere.hash;

    if (availability.willCallAnywhere.status === IN_STOCK) {
      config.shipping_method_1 = "0";
      config.avail_1 =
        availability.willCallAnywhere?.willCallQuantity.toString();
      config.backorder_date =
        availability.willCallAnywhere?.backOrderDate_1 ?? "";
      config.will_call_avail =
        availability.willCallAnywhere?.willCallQuantity.toString();
      config.will_call_plant = DEFAULT_PLANT.code;
    } else if (availability.willCallAnywhere.status === NOT_IN_STOCK) {
      config.avail_1 = "0";
      config.shipping_method_1 = "0";
      config.backorder_all = "T";
      config.backorder_date =
        availability.willCallAnywhere?.willCallBackOrder ?? "";
      config.backorder_quantity =
        availability.willCallAnywhere?.willCallQuantity.toString();
    } else if (availability.willCallAnywhere.status === LIMITED_STOCK) {
      config.shipping_method_1 = "0";
      config.avail_1 =
        availability.willCallAnywhere?.willCallQuantity.toString();
      config.backorder_date =
        availability.willCallAnywhere?.backOrderDate_1 ?? "";
      config.will_call_avail =
        availability.willCallAnywhere?.willCallQuantity.toString();
      config.will_call_plant = DEFAULT_PLANT.code;
      config.backorder_all = "F";
      config.backorder_quantity =
        availability.willCallAnywhere?.backOrderQuantity_1?.toString() ?? "";
    }
    return config;
  };

  // TODO Delete this hook after refactoring the entire cart item section
  const { incrementCartItemKey } = useCartPageStore((state) => state.actions);

  const handleSelectValueChange = async (value: string) => {
    // Get the available shipping methods for each item in the cart
    const itemShippingMethods = await Promise.all(
      cartQuery.data.cartItems.map(async (item) => {
        const availability = await checkAvailability(token, {
          productId: item.itemInfo.productId,
          qty: item.quantity,
          plant: item.configuration?.plant_1,
        });

        const allAvailableOption = availability.options.find(
          (option) => option.type === AVAILABLE_ALL,
        );
        const takeOnHandOption = availability.options.find(
          (option) => option.type === TAKE_ON_HAND,
        );
        const alternativeBranchesOption = availability.options.find(
          (option) => option.type === ALTERNATIVE_BRANCHES,
        );
        const backOrderAllOption = availability.options.find(
          (option) => option.type === BACK_ORDER_ALL,
        );

        // Get all methods for "Ship to me"
        const shippingMethods =
          allAvailableOption?.plants.at(0)?.shippingMethods ?? // First check for all available
          takeOnHandOption?.plants.at(0)?.shippingMethods ?? // Then for order some and back order the rest
          alternativeBranchesOption?.plants.at(0)?.shippingMethods ?? // Then for alternative branches
          backOrderAllOption?.plants.at(0)?.shippingMethods ?? // Finally backorder everything
          [];

        return {
          id: item.itemInfo.productId,
          hashvalue:
            allAvailableOption?.hash ??
            takeOnHandOption?.hash ??
            alternativeBranchesOption?.hash ??
            backOrderAllOption?.hash ??
            "",
          shippingMethods,
        };
      }),
    );

    await updateCartItemMutation.mutateAsync(
      cartQuery.data.cartItems.map((item) => {
        const config = {
          ...item.configuration,
        };

        let newValue: string | undefined = undefined;
        let newHashValue: string | undefined = undefined;
        // Check if the value is available
        const shippingMethod = itemShippingMethods.find(
          (shippingMethod) => shippingMethod.id === item.itemInfo.productId,
        );
        if (shippingMethod) {
          // Check if the global shipping method selected is available for the item
          const isValid = !!shippingMethod.shippingMethods.find(
            (element) => element.code === value,
          );

          if (isValid) {
            newValue = value;
            newHashValue = shippingMethod.hashvalue;
          }
        }

        // Change the shipping method only if it can be changed
        if (newValue && newHashValue) {
          // Check the 1st available shipping method
          if (config.shipping_method_1) {
            config.shipping_method_1 = newValue;
          } else if (config.shipping_method_2) {
            config.shipping_method_2 = newValue;
          } else if (config.shipping_method_3) {
            config.shipping_method_3 = newValue;
          } else if (config.shipping_method_4) {
            config.shipping_method_4 = newValue;
          } else if (config.shipping_method_5) {
            config.shipping_method_5 = newValue;
          }

          // Set hash value
          config.hashvalue = newHashValue;
        }

        {
          return {
            cartItemId: item.cartItemId,
            quantity: item.quantity,
            config,
          };
        }
      }),
      {
        onSuccess: () => {
          incrementCartItemKey();
        },
      },
    );
  };

  const handleGlobalWillCall = async () => {
    const cartItemsAvailability = await Promise.all(
      cartQuery.data.cartItems.map(async (item) => {
        return await checkAvailability(token, {
          productId: item.itemInfo.productId,
          qty: item.quantity,
          plant: DEFAULT_PLANT.code,
        });
      }),
    );

    const cartItems = cartQuery.data.cartItems.map((item) => {
      const config = {
        ...item.configuration,
      };
      const availability = cartItemsAvailability.find(
        (willCall) => willCall.productId === item.itemInfo.productId,
      );
      const transformedConfig = availability
        ? transformConfiguration(availability, config)
        : config;
      return {
        cartItemId: item.cartItemId,
        quantity: item.quantity,
        config: transformedConfig,
      };
    });

    await updateCartItemMutation.mutateAsync(cartItems, {
      onSuccess: () => {
        incrementCartItemKey();
      },
    });
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
                handleGlobalWillCall();
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
