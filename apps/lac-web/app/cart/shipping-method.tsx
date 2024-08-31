"use client";

import useSuspenseWillCallPlant from "@/_hooks/address/use-suspense-will-call-plant.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useSuspenseShippingMethods from "@/_hooks/cart/use-suspense-shipping-method.hook";
import useUpdateCartItemMutation from "@/_hooks/cart/use-update-cart-item-mutation.hook";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { checkAvailability } from "@/_lib/apis/shared";
import {
  DEFAULT_PLANT,
  IN_STOCK,
  LIMITED_STOCK,
  NOT_AVAILABLE,
  NOT_IN_STOCK,
} from "@/_lib/constants";
import type { CartItemConfiguration, Plant } from "@/_lib/types";
import { sendGTMEvent } from "@next/third-parties/google";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import { Label } from "@repo/web-ui/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@repo/web-ui/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { useToast } from "@repo/web-ui/components/ui/toast";
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
  readonly plants: Plant[];
  readonly token: string;
};

type ConfigKey = keyof CartItemConfiguration;

const ShippingMethod = ({ token, plants }: ShippingMethodProps) => {
  const { toast } = useToast();
  const id = useId();
  const shipToMeId = `${SHIP_TO_ME}-${id}`;
  const willCallId = `${WILL_CALL}-${id}`;

  const checkLoginQuery = useSuspenseCheckLogin(token);

  const isForCart = checkLoginQuery.data?.status_code === "OK";

  const shippingMethodsQuery = useSuspenseShippingMethods(token, isForCart);

  const shippingMethods = shippingMethodsQuery?.data.filter(
    (method) => !EXCLUDED_SHIPPING_METHODS.includes(method.code),
  );

  const [selectedSection, setSelectedSection] = useState<string>();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<string>();
  const cartQuery = useSuspenseCart(token);
  const willCallPlantQuery = useSuspenseWillCallPlant(token);
  const willCallPlant = willCallPlantQuery.data;

  const [isShipToMeSelected, setIsShipToMeSelected] = useState(false);
  const [isWillCallSelected, setIsWillCallSelected] = useState(false);

  const [selectedWillCallPlant, setSelectedWillCallPlant] = useState("");

  const updateCartItemMutation = useUpdateCartItemMutation();

  const gtmProducts = cartQuery.data.cartItems.map((item) => {
    return {
      productid: item.itemInfo.productId,
      cartid: item.cartItemId,
      quantity: item.quantity,
    };
  });

  const gtmItemInfoQuery = useGtmProducts(
    gtmProducts.length > 0 ? gtmProducts : [],
  );
  const gtmItemsInfo = gtmItemInfoQuery.data;

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  const sendToGTMShippingMethodChanged = () => {
    if (gtmItemsInfo !== null && gtmItemsInfo !== undefined) {
      gtmItemsInfo?.forEach((gtmItemInfo) => {
        sendGTMEvent({
          event: "apply_shipping",
          applyShippingData: {
            currency: "USD",
            value: gtmItemInfo?.price,
            items: [
              {
                item_id: gtmItemInfo?.item_id,
                item_sku: gtmItemInfo?.item_sku,
                item_name: gtmItemInfo?.item_name,
                item_brand: gtmItemInfo?.item_brand,
                price: gtmItemInfo?.price,
                quantity: gtmProducts.find(
                  (item) => item.productid === Number(gtmItemInfo?.productid),
                )?.quantity,
              },
            ],
          },
          data: {
            userid: gtmUser?.userid,
            account_type: gtmUser?.account_type,
            account_industry: gtmUser?.account_industry,
            account_sales_category: gtmUser?.account_sales_category,
          },
        });
      });
    }
  };

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
      config.will_call_shipping = willCallPlant.willCallMethod;
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
      config.will_call_shipping = willCallPlant.willCallMethod;
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
      config.will_call_shipping = willCallPlant.willCallMethod;
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
                    : newValue ?? "";

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
          toast({ description: "Updated delivery method for all items" });
          setIsShipToMeSelected(false);
          setSelectedDeliveryMethod(undefined);
          incrementCartItemKey();
          sendToGTMShippingMethodChanged();
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
        (willCall) =>
          willCall.productId === item.itemInfo.productId &&
          willCall.willCallAnywhere[0]?.shippingMethod ===
            WILLCALL_SHIPING_METHOD &&
          willCall.willCallAnywhere[0]?.status !== NOT_AVAILABLE,
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
        toast({ description: "Updated delivery method for all items" });
        setIsWillCallSelected(false);
        incrementCartItemKey();
        sendToGTMShippingMethodChanged();
      },
    });
  };

  return (
    <div className="space-y-3 rounded-lg border border-wurth-gray-150 px-5 py-4 shadow-md">
      <h3 className="pb-2 text-sm text-black">
        Set Delivery Method for All Items
      </h3>

      <ul className="flex flex-col gap-3">
        <li className="flex flex-col items-stretch gap-2">
          <div className="flex flex-row items-center gap-3">
            <Checkbox
              id={shipToMeId}
              className="rounded-full"
              checked={selectedSection === SHIP_TO_ME && isShipToMeSelected}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setIsShipToMeSelected(true);
                  setSelectedSection(SHIP_TO_ME);
                  if (selectedDeliveryMethod) {
                    handleSelectValueChange(selectedDeliveryMethod);
                  }
                } else {
                  setIsShipToMeSelected(false);
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
                updateCartItemMutation.isPending ||
                !isShipToMeSelected
              }
              key={selectedDeliveryMethod}
              value={selectedDeliveryMethod}
              onValueChange={handleSelectValueChange}
            >
              <SelectTrigger className="avail-change-button w-full">
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

        <li className="flex flex-col items-stretch gap-2">
          <div className="flex flex-row items-center gap-3">
            <Checkbox
              id={willCallId}
              className="avail-change-button rounded-full"
              checked={selectedSection === WILL_CALL && isWillCallSelected}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setIsWillCallSelected(true);
                  setSelectedSection(WILL_CALL);
                } else {
                  setIsWillCallSelected(false);
                  setSelectedSection(undefined);
                }
              }}
              disabled={updateCartItemMutation.isPending}
            />

            <Label htmlFor={willCallId}>Store pick up (Will call)</Label>
          </div>
          <div className="ml-[1.625rem]">
            <Select
              disabled={selectedSection !== WILL_CALL}
              value={selectedWillCallPlant}
              onValueChange={setSelectedWillCallPlant}
            >
              <SelectTrigger className="avail-change-button w-full">
                <SelectValue placeholder="Select a store" />
              </SelectTrigger>

              <SelectContent>
                {plants?.length > 0 &&
                  plants.map((option) => (
                    <SelectItem key={option.code} value={option.code}>
                      {option.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {selectedWillCallPlant && (
            <RadioGroup
              className="ml-[1.625rem] flex flex-col"
              onValueChange={handleGlobalWillCall}
            >
              <div className="flex shrink-0 flex-row items-center gap-0.5 rounded border border-wurth-gray-250 object-contain p-1 text-sm shadow-sm">
                <RadioGroupItem
                  className="h-3.5 w-3.5"
                  value={"ees"}
                  id={"id"}
                />
                <span className="pl-2">
                  Pick up at{" "}
                  {
                    plants.find((plant) => plant.code === selectedWillCallPlant)
                      ?.name
                  }
                </span>
              </div>
              <div className="flex shrink-0 flex-row items-center gap-0.5 rounded border border-wurth-gray-250 object-contain p-1 text-sm shadow-sm">
                <RadioGroupItem
                  className="h-3.5 w-3.5"
                  value={"ewe"}
                  id={"iwd"}
                  // disabled={false}
                />
                <span className="pl-2">
                  Transfer from {willCallPlant?.plantName ?? DEFAULT_PLANT.name}{" "}
                  to{" "}
                  {
                    plants.find((plant) => plant.code === selectedWillCallPlant)
                      ?.name
                  }
                </span>
              </div>
            </RadioGroup>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ShippingMethod;
