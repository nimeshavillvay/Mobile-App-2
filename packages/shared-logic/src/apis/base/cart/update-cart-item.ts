import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";
import { type CartItemConfiguration } from "~/lib/zod-schema/cart";

export const updateCartItem = async (
  { baseUrl, apiKey, token }: AuthenticatedApiConfig,
  products: {
    quantity?: number;
    cartItemId: number;
    price?: number;
    config: CartItemConfiguration;
  }[],
) => {
  return await api
    .put("rest/cart", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      json: {
        cartitembatchconfiguration: products.map((product) => ({
          quantity: product.quantity,
          cartid: product.cartItemId,
          price: product.price,
          cartitemconfiguration: product.config,
        })),
      },
      cache: "no-store",
    })
    .json();
};
