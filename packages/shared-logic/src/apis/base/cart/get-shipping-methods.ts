import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";

const shippingMethodsSchema = z.array(
  z.object({
    code: z.string(),
    name: z.string(),
  }),
);

export const getShippingMethods = async ({
  baseUrl,
  apiKey,
  token,
}: AuthenticatedApiConfig) => {
  const response = await api
    .get("rest/shipping-methods", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  return await shippingMethodsSchema.parseAsync(response);
};
