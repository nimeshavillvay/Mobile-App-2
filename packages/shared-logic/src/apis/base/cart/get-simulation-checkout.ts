import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";
import { cartConfigurationSchema } from "~/lib/zod-schema/cart";

const simulationCheckoutSchema = z.object({
  net: z.number(),
  shippingcost: z.number(),
  tax: z.number(),
  discount: z.number(),
  total: z.number(),
  "total-quantity": z.number(),
  cartItemsCount: z.number(),
  delivery: z
    .array(
      z.object({
        home: z.number(),
        multi: z.number(),
        truck: z.string(),
      }),
    )
    .optional(),
  configuration: cartConfigurationSchema,
  productslist: z.array(
    z.object({
      extendedprice: z.number(),
      price: z.number(),
      priceunit: z.string(),
      sku: z.string().nullable(),
      productid: z.string(),
      cartid: z.number().optional(),
      coupon: z.string().nullable(),
      quantity: z.number(),
      overrideprice: z.number(),
      originalprice: z.number().nullable(),
    }),
  ),
});

export const getSimulationCheckout = async ({
  baseUrl,
  apiKey,
  token,
}: AuthenticatedApiConfig) => {
  const response = await api
    .get("rest/simulation-checkout", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  return await simulationCheckoutSchema.parseAsync(response);
};
