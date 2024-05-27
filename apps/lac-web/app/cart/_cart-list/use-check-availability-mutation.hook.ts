import { api } from "@/_lib/api";
import type { ShippingMethod } from "@/_lib/types";
import { useMutation } from "@tanstack/react-query";

type CheckAvailability = {
  productid: number;
  status: string;
  options: {
    backOrder: boolean;
    plants: {
      index: number;
      isSameDayAvail: boolean;
      plant: string;
      quantity?: number;
      backOrderQuantity?: number;
      backOrderDate?: string;
      shippingMethods: ShippingMethod[];
    }[];
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

type AvailabilityParams = {
  productId: number;
  qty: number;
  plant?: string;
};

const useCheckAvailabilityMutation = (token: string) => {
  return useMutation({
    mutationFn: async ({ productId, qty, plant }: AvailabilityParams) => {
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
    },
  });
};

export default useCheckAvailabilityMutation;
