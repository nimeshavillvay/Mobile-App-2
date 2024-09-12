import { api } from "@/_lib/api";
import { z } from "zod";

const productListSchema = z.array(
  z.object({
    productid: z.string(),
    cartid: z.number(),
    item_id: z.string(),
    item_sku: z.string(),
    item_name: z.string(),
    price: z.string(),
    item_brand: z.string(),
    item_variant: z.string(),
    item_categoryid: z.string(),
    coupon: z.string(),
    coupon_discount: z.string(),
    item_primarycategory: z.string(),
    item_category_path: z.array(z.string()),
  }),
);

export type Product = {
  productid: number;
  cartid: number | null | undefined;
}[];

export const getGtmProducts = async (productIdList: Product, token: string) => {
  const response = await api
    .post("rest/gtm/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        products: productIdList,
      },
    })
    .json();

  return productListSchema.parse(response);
};
