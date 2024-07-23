import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";

const priceCheckSchema = z.object({
  error: z.union([z.boolean(), z.null()]),
  items: z.array(
    z.object({
      productid: z.string(),
      price: z.number(),
      price_unit: z.string(),
      extended: z.number(),
      list_price: z.number(),
      coupon: z.string().nullable(),
      price_breakdowns: z.array(
        z.object({
          qty_1: z.number(),
          price_1: z.number(),
        }),
      ),
      uom_price: z.number().optional(),
      uom_price_unit: z.string().optional(),
    }),
  ),
});

export type Product = {
  productId: number;
  qty: number;
  cartId?: number;
};

export const priceCheck = async (
  config: AuthenticatedApiConfig,
  products: Product[],
) => {
  const response = await api
    .post("rest/pricecheck", {
      prefixUrl: config.baseUrl,
      headers: {
        "X-AUTH-TOKEN": config.apiKey,
        authorization: `Bearer ${config.token}`,
      },
      json: {
        products: products.map((product) => ({
          productid: product.productId,
          qty: product.qty <= 0 ? 1 : product.qty,
          cartid: product.cartId,
        })),
      },
      cache: "no-store",
    })
    .json();

  const { error, items } = await priceCheckSchema.parseAsync(response);

  return {
    error,
    productPrices: items.map(
      ({
        productid,
        price,
        price_unit,
        extended,
        list_price,
        coupon,
        price_breakdowns,
        uom_price,
        uom_price_unit,
      }) => ({
        productId: productid,
        price: price,
        priceUnit: price_unit,
        extendedPrice: extended,
        listPrice: list_price,
        couponCode: coupon,
        priceBreakDowns: price_breakdowns.map(({ qty_1, price_1 }) => ({
          quantity: price_1,
          price: qty_1,
        })),
        uomPrice: uom_price,
        uomPriceUnit: uom_price_unit,
      }),
    ),
  };
};
