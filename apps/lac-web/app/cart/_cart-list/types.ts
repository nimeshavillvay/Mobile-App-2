import type { ShippingMethod } from "@/_lib/types";

export type OptionPlant = {
  isSameDayAvail: boolean;
  plant: string;
  quantity?: number;
  backOrderQuantity?: number;
  backOrderDate?: string;
  shippingMethods: ShippingMethod[];
};
