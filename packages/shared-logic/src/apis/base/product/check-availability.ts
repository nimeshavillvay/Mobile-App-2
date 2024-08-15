import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";
import { checkAvailabilitySchema } from "~/lib/zod-schema/product";

export type CheckAvailabilityParams = {
  productId: number;
  quantity: number;
  plant?: string;
};

export const checkAvailability = async (
  config: AuthenticatedApiConfig,
  { productId, quantity, plant }: CheckAvailabilityParams,
) => {
  const response = await api
    .post("rest/availability-check", {
      prefixUrl: config.baseUrl,
      headers: {
        "X-AUTH-TOKEN": config.apiKey,
        authorization: `Bearer ${config.token}`,
      },
      json: {
        productid: productId,
        qty: quantity,
        plant,
      },
      cache: "no-store",
    })
    .json();

  const parsedResponse = await checkAvailabilitySchema.parseAsync(response);

  return {
    productId: parsedResponse.productid,
    status: parsedResponse.status,
    options: parsedResponse.options,
    willCallAnywhere: parsedResponse.willcallanywhere,
    xplant: parsedResponse.xplant,
    availableLocations: parsedResponse.available_locations,
  };
};
