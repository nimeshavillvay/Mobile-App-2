import { z } from "zod";
import { productStatusSchema } from "./product";

export const relatedProductSchema = z.object({
  productid: z.string(),
  is_directly_shipped_from_vendor: z.boolean(),
  is_product_exclude: z.boolean(),
  txt_wurth_lac_item: z.string(),
  item_name: z.string(),
  img: z.string(),
  slug: z.string(),
  is_comparison: z.boolean().or(z.null()),
  txt_hazardous: z.string(),
  txt_special_shipping: z.string(),
  txt_sap: z.string(),
  txt_mfn: z.string(),
  txt_description_name: z.string(),
  txt_sub_description: z.string(),
  txt_uom_label: z.string(),
  txt_box_qt: z.string(),
  txt_min_order_amount: z.string(),
  txt_order_qty_increments: z.string(),
  txt_weight_value: z.string(),
  txt_prop65_message_01: z.string().or(z.null()),
  txt_prop65_message_02: z.string().or(z.null()),
  txt_prop65_message_03: z.string().or(z.null()),
  list_price: z.string(),
  on_sale: z.string(),
  is_new: z.string().or(z.null()).optional(),
  fclassid: z.string(),
  txt_x_pant_Mat_status: productStatusSchema.optional(),
});

export const relatedProductResultSchema = z.object({
  data: z.array(
    z.object({
      heading: z.string(),
      items: z.array(relatedProductSchema),
    }),
  ),
});
