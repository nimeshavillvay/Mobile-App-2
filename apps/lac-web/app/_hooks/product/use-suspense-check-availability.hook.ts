import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export type CheckAvailability = {
  productid: number;
  status: string;
  options: {
    backOrder: boolean;
    plants: {
      [key: string]: {
        plant: string;
        quantity?: number;
        backOrderQuantity?: number;
        backOrderDate?: string;
        shippingMethods: string[];
      };
    };
    type: string;
    hash: string;
  }[];
  willcallanywhere: {
    hash: string;
    status: string;
    willCallBackOrder: string; // Back order date
    willCallPlant: string;
    willCallQuantity: number;
    backOrder?: boolean;
    backOrderDate_1?: string;
    backOrderQuantity_1?: number;
    index?: number;
    plant_1?: string;
    quantity_1?: number;
    shippingMethods_1?: string[];
    type?: string;
  };
  xplant: string;
  available_locations: {
    location: string;
    name: string;
    amount: number;
  }[];
};

type Token = string;
type AvailabilityParameters = {
  productId: number;
  qty: number;
  plant?: string;
};

export const checkAvailability = async (
  token: Token,
  { productId, qty, plant }: AvailabilityParameters,
) => {
  const response = await api
    .post("rest/availability-check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        productid: productId,
        qty,
        plant,
      },
      cache: "no-store",
    })
    .json<CheckAvailability>();

  return {
    productId: response.productid,
    status: response.status,
    options: response.options,
    willCallAnywhere: response.willcallanywhere,
    xplant: response.xplant,
    availableLocations: response.available_locations,
  };
};

const useSuspenseCheckAvailability = (
  token: Token,
  { productId, qty, plant }: AvailabilityParameters,
) => {
  return useSuspenseQuery({
    queryKey: [
      "user",
      "product",
      "availability",
      {
        productId,
        qty,
        plant,
      },
      token,
    ],
    queryFn: () => checkAvailability(token, { productId, qty, plant }),
  });
};

export default useSuspenseCheckAvailability;
