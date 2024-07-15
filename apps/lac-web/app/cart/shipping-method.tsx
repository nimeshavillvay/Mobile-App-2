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
  BACKORDER_DISABLED,
  BACKORDER_ENABLED,
  DEFAULT_SHIPPING_METHOD,
  EXCLUDED_SHIPPING_METHODS,
  FALSE_STRING,
  TAKE_ON_HAND,
  WILLCALL_SHIPING_METHOD,
} from "./constants";
import type { Availability, ShippingMethod } from "./types";
import useCartPageStore from "./use-cart-page-store.hook";

const SHIP_TO_ME = "ship-to-me";
const WILL_CALL = "will-call";

type ShippingMethodProps = {
  readonly token: string;
  readonly options: ShippingMethod[];
};

type ConfigKey = keyof CartItemConfiguration;

const ShippingMethod = ({ token, options }: ShippingMethodProps) => {
  const id = useId();
  const shipToMeId = `${SHIP_TO_ME}-${id}`;
  const willCallId = `${WILL_CALL}-${id}`;

  const shippingMethods = options?.filter(
    (method) => !EXCLUDED_SHIPPING_METHODS.includes(method.code),
  );

  const [selectedSection, setSelectedSection] = useState<string>();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<string>();
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

  const setConfigValues = (
    config: CartItemConfiguration,
    index: number,
    availValue: string,
    plantValue: string,
    shippingMethodValue: string,
  ): void => {
    const configKeyAvail: ConfigKey = `avail_${index}` as ConfigKey;
    const configKeyPlant: ConfigKey = `plant_${index}` as ConfigKey;
    const configKeyShippingMethod: ConfigKey =
      `shipping_method_${index}` as ConfigKey;

    config[configKeyAvail] = availValue;
    config[configKeyPlant] = plantValue;
    config[configKeyShippingMethod] = shippingMethodValue;
  };

  const transformConfiguration = (
    availability: Availability,
    config: CartItemConfiguration,
  ) => {
    clearConfigKeys(config, ["avail_", "shipping_method_", "plant_"]);
    config.plant_1 = willCallPlant?.plantCode ?? DEFAULT_PLANT.code;
    config.hashvalue = availability?.willCallAnywhere?.[0]?.hash
      ? availability.willCallAnywhere[0].hash
      : "";

    if (
      availability.willCallAnywhere &&
      availability.willCallAnywhere[0] &&
      availability.willCallAnywhere[0].status === IN_STOCK
    ) {
      config.shipping_method_1 =
        availability?.options?.at(0)?.plants?.at(0)?.shippingMethods?.at(0)
          ?.code ?? "0";
      config.avail_1 =
        availability.willCallAnywhere[0]?.willCallQuantity.toString();
      config.backorder_date =
        availability.willCallAnywhere[0]?.backOrderDate_1 ?? "";
      config.will_call_avail =
        availability.willCallAnywhere[0]?.willCallQuantity.toString();
      config.will_call_plant = willCallPlant?.plantCode ?? DEFAULT_PLANT.code;
      config.will_call_shipping = WILLCALL_SHIPING_METHOD;
      config.will_call_not_in_stock = FALSE_STRING;
    } else if (
      availability.willCallAnywhere &&
      availability.willCallAnywhere[0] &&
      availability.willCallAnywhere[0].status === NOT_IN_STOCK
    ) {
      config.avail_1 = "0";
      config.shipping_method_1 =
        availability?.options?.at(0)?.plants?.at(0)?.shippingMethods?.at(0)
          ?.code ?? "0";
      config.backorder_all = "T";
      config.backorder_date =
        availability.willCallAnywhere[0]?.willCallBackOrder ?? "";
      config.backorder_quantity =
        availability.willCallAnywhere[0]?.willCallQuantity.toString();
      config.will_call_plant = willCallPlant?.plantCode ?? DEFAULT_PLANT.code;
      config.will_call_shipping = WILLCALL_SHIPING_METHOD;
      config.will_call_not_in_stock = FALSE_STRING;
    } else if (
      availability.willCallAnywhere &&
      availability.willCallAnywhere[0] &&
      availability.willCallAnywhere[0].status === LIMITED_STOCK
    ) {
      config.shipping_method_1 =
        availability?.options?.at(0)?.plants?.at(0)?.shippingMethods?.at(0)
          ?.code ?? "0";
      config.avail_1 =
        availability.willCallAnywhere[0]?.willCallQuantity.toString();
      config.backorder_date =
        availability.willCallAnywhere[0]?.backOrderDate_1 ?? "";
      config.will_call_avail =
        availability.willCallAnywhere[0]?.willCallQuantity.toString();
      config.will_call_plant = willCallPlant?.plantCode ?? DEFAULT_PLANT.code;
      config.backorder_all = "F";
      config.backorder_quantity =
        availability.willCallAnywhere[0]?.backOrderQuantity_1?.toString() ?? "";
      config.will_call_shipping = WILLCALL_SHIPING_METHOD;
      config.will_call_not_in_stock = FALSE_STRING;
    }
    return config;
  };

  // TODO Delete this hook after refactoring the entire cart item section
  const { incrementCartItemKey } = useCartPageStore((state) => state.actions);

  const handleSelectValueChange = async (value: string) => {
    setSelectedDeliveryMethod(value);
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

        // Get all methods for "Ship to me"
        const options = [
          allAvailableOption,
          takeOnHandOption,
          alternativeBranchesOption,
        ];

        const selectedOption = options.find((option) =>
          option?.plants.some((plant) =>
            plant?.shippingMethods.some((method) => method?.code === value),
          ),
        );

        const shippingMethods =
          selectedOption?.plants.at(0)?.shippingMethods ?? [];
        return {
          id: item.itemInfo.productId,
          hashvalue: selectedOption?.hash ?? "",
          shippingMethods,
          plants: selectedOption?.plants,
          backOrder: selectedOption?.backOrder,
          type: selectedOption?.type,
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
        const selectedOption = shippingMethod;
        const addedIndexes: number[] = [];

        if (newValue && newHashValue) {
          config.will_call_shipping = "";
          config.will_call_avail = "";
          config.will_call_plant = "";
          config.will_call_not_in_stock = FALSE_STRING;
          // Set hash value
          config.hashvalue = newHashValue;
          if (selectedOption) {
            config.backorder_all =
              selectedOption.type === "backOrderAll" && selectedOption.backOrder
                ? BACKORDER_ENABLED
                : BACKORDER_DISABLED;
            config.backorder_quantity =
              selectedOption.plants?.[0]?.backOrderQuantity?.toString() ?? "0";
            config.backorder_date =
              selectedOption.plants?.[0]?.backOrderDate?.toString() ?? "";
          }

          for (let i = 0; i < 5; i++) {
            if (
              selectedOption &&
              selectedOption.plants &&
              selectedOption.plants[i]
            ) {
              const selectedPlant = selectedOption.plants[i];

              if (selectedPlant) {
                const quantity = selectedPlant.quantity ?? "";
                const index = selectedPlant.index;
                addedIndexes.push(index);

                const availValue = quantity?.toString() ?? "";
                const plantValue = selectedPlant.plant ?? "";
                const shippingMethodValue =
                  selectedPlant.plant !== willCallPlant?.plantCode
                    ? DEFAULT_SHIPPING_METHOD
                    : (newValue ?? "");

                // Set values for the selected plant
                setConfigValues(
                  config,
                  index,
                  availValue,
                  plantValue,
                  shippingMethodValue,
                );
              }
            }
          }

          // Add the missing plants
          for (let i = 1; i <= 5; i++) {
            if (!addedIndexes.includes(i)) {
              setConfigValues(config, i, "", "", "");
            }
          }
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
          plant: willCallPlant?.plantCode ?? DEFAULT_PLANT.code,
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
                  if (selectedDeliveryMethod) {
                    handleSelectValueChange(selectedDeliveryMethod);
                  }
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
