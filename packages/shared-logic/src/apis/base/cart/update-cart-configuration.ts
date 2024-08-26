import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";
import {
  type CartConfiguration,
  cartConfigurationSchema,
} from "~/lib/zod-schema/cart";

export const updateCartConfiguration = async <
  T extends Partial<Required<CartConfiguration>>,
>(
  { baseUrl, apiKey, token }: AuthenticatedApiConfig,
  config: T,
) => {
  const response = await api
    .patch("rest/cart-config", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      json: config,
      cache: "no-store",
    })
    .json();

  return z
    .object({
      configuration: cartConfigurationSchema,
      error: z.union([cartConfigurationSchema.partial(), z.array(z.unknown())]),
    })
    .parseAsync(response);
};
