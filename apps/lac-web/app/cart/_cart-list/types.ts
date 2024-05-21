import type { ShippingMethod } from "@/_lib/types";

export type CartItemConfigurationOptional = {
  avail_1?: string;
  avail_2?: string;
  avail_3?: string;
  avail_4?: string;
  avail_5?: string;
  plant_1?: string;
  plant_2?: string;
  plant_3?: string;
  plant_4?: string;
  plant_5?: string;
  poOrJobName?: string;
  shipping_method_1?: string;
  shipping_method_2?: string;
  shipping_method_3?: string;
  shipping_method_4?: string;
  shipping_method_5?: string;
  will_call_avail?: string;
  will_call_plant?: string;
  hashvalue?: string;
  selectedOption?: string;
  backorder_all?: string;
};

export type OptionPlant = {
  isSameDayAvail: boolean;
  plant: string;
  quantity?: number;
  backOrderQuantity?: number;
  backOrderDate?: string;
  shippingMethods: ShippingMethod[];
};
