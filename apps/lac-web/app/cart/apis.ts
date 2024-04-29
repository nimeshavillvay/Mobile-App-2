import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import "server-only";
import type { ShippingMethod } from "./types";

export const getShippingMethods = async () => {
  return api
    .get("rest/shipping-methods", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<ShippingMethod[]>();
};
