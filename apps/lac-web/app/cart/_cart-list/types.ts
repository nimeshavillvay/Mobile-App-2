import type { ShippingMethod } from "@/_lib/types";
import type {
  ALTERNATIVE_BRANCHES,
  AVAILABLE_ALL,
  MAIN_OPTIONS,
  TAKE_ON_HAND,
} from "../constants";

export type OptionPlant = {
  isSameDayAvail: boolean;
  plant: string;
  quantity?: number;
  backOrderQuantity?: number;
  backOrderDate?: string;
  shippingMethods: ShippingMethod[];
};

export type ShipToMeOption =
  | typeof AVAILABLE_ALL
  | typeof TAKE_ON_HAND
  | typeof ALTERNATIVE_BRANCHES
  | undefined;

export type MainOption = (typeof MAIN_OPTIONS)[keyof typeof MAIN_OPTIONS];
