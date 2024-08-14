import { z } from "zod";

export type Product = z.infer<typeof productSchema>;

export const productSchema = z.object({
  page_title: z.string(),
  group_id: z.string().or(z.null()),
  group_summary: z.string(),
  group_sel_always: z.string(),
  brand_name: z.string(),
  brand_logo: z.string(),
  brand_code: z.string(),
  group_thumbnail: z.string(),
  group_img: z.string(),
  selected_item: z.object({
    productid: z.number(),
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
    is_new: z.string(),
    fclassid: z.string(),
    txt_x_pant_Mat_status: z.string().or(z.undefined()),
    thumbnail_img: z.string(),
    class: z.string(),
    attributes: z
      .array(
        z.object({
          attribute_name: z.string(),
          attribute_value: z.string().or(z.null()),
        }),
      )
      .optional(),
    detailed_images: z.array(
      z.object({
        img: z.string(),
        alt: z.string(),
        url: z.string(),
        type: z.enum(["IMAGE", "VIDEO"]),
      }),
    ),
  }),
});
