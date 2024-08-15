import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";

export const removeCartItem = async (
  { baseUrl, apiKey, token }: AuthenticatedApiConfig,
  cartIds: number[],
) => {
  const response = await api
    .delete("rest/cart", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      json: {
        products: cartIds.map((id) => ({
          cartid: id,
        })),
      },
      cache: "no-store",
    })
    .json();

  return response;
};
