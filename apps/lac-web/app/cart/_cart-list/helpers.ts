import type { CartItemConfiguration } from "@/_lib/types";
import {
  DEFAULT_PLANT,
  EMPTY_STRING,
  EXCLUDED_SHIPPING_METHODS,
  FALSE_STRING,
  TRUE_STRING,
} from "../constants";
import type { AvailabilityOption } from "../types";

export const createCartItemConfig = ({
  method,
  quantity,
  plant,
  hash,
  backOrderAll = false,
  backOrderDate,
  backOrderQuantity,
  shippingMethod,
}: {
  method: string;
  quantity: number;
  plant: string;
  hash: string;
  backOrderAll?: boolean;
  backOrderQuantity?: number;
  backOrderDate?: string;
  shippingMethod?: string;
}) => ({
  avail_1: quantity ? quantity.toString() : EMPTY_STRING,
  avail_2: EMPTY_STRING,
  avail_3: EMPTY_STRING,
  avail_4: EMPTY_STRING,
  avail_5: EMPTY_STRING,
  plant_1: plant,
  plant_2: EMPTY_STRING,
  plant_3: EMPTY_STRING,
  plant_4: EMPTY_STRING,
  plant_5: EMPTY_STRING,
  shipping_method_1: method,
  shipping_method_2: EMPTY_STRING,
  shipping_method_3: EMPTY_STRING,
  shipping_method_4: EMPTY_STRING,
  shipping_method_5: EMPTY_STRING,
  will_call_shipping: shippingMethod,
  backorder_all: backOrderAll ? TRUE_STRING : FALSE_STRING,
  hashvalue: hash,
  will_call_avail: EMPTY_STRING,
  will_call_plant: EMPTY_STRING,
  backorder_date: backOrderDate,
  backorder_quantity: backOrderQuantity?.toString(),
});

export const getAlternativeBranchesConfig = ({
  plants,
  method,
  hash,
  backOrderQuantity,
  backOrderDate,
  backOrderAll,
  homePlant,
}: {
  plants: {
    index: number;
    quantity?: number;
    plant: string;
  }[];
  method: string;
  hash: string;
  backOrderQuantity?: number;
  backOrderDate?: string;
  backOrderAll?: boolean;
  homePlant?: string;
}) => {
  let config: Partial<CartItemConfiguration> = {
    hashvalue: hash,
    backorder_quantity: backOrderQuantity?.toString(),
    backorder_date: backOrderDate,
    backorder_all: backOrderAll ? TRUE_STRING : FALSE_STRING,
  };
  const plantName = homePlant ?? DEFAULT_PLANT;
  const data = plants?.map((plant) => ({
    [`avail_${plant?.index}`]: (plant?.quantity ?? 0).toString(),
    [`plant_${plant?.index}`]: plant?.plant ?? "",
    [`shipping_method_${plant?.index}`]:
      plant?.plant !== plantName ? "G" : method,
  }));

  config = Object.assign(config, ...data);

  return config;
};

export const getShippingMethods = (
  selectedOption: string | undefined,
  availableOptions: { [key: string]: AvailabilityOption | undefined },
) => {
  if (!selectedOption) {
    return [];
  }

  const availableOption = availableOptions[selectedOption];

  if (availableOption) {
    const shippingMethods =
      availableOption.plants?.at(0)?.shippingMethods ?? [];

    return shippingMethods.filter(
      (method) => !EXCLUDED_SHIPPING_METHODS.includes(method.code),
    );
  }

  return [];
};

export const findAvailabilityOptionForType = (
  options: AvailabilityOption[],
  type: string,
) => {
  return options.find((option) => option.type === type) ?? undefined;
};
