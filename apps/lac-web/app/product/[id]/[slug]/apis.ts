import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import "server-only";

export const getProduct = async (id: string) => {
  return await api
    .get("rest/landinginfo", {
      searchParams: {
        productid: id,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      page_title: string;
      group_id: string;
      txt_group_part_number: string;
      group_summary: string;
      group_sel_always: string;
      brand_name: string;
      brand_logo: string;
      brand_code: string;
      group_thumbnail: string;
      group_img: string;
      selected_item: {
        productid: number;
        is_product_exclude: boolean;
        txt_wurth_lac_item: string;
        item_name: string;
        img: string;
        url: string;
        is_favourite: null;
        is_comparison: null;
        txt_hazardous: string;
        txt_special_shipping: string;
        txt_sap: string;
        txt_mfn: string;
        txt_description_name: string;
        txt_sub_description: string;
        sel_assigned_brand: string;
        txt_uom: string;
        txt_uom_label: string;
        txt_uom_value: null;
        txt_rounding: null;
        txt_box_qt: string;
        txt_min_order_amount: string;
        txt_order_qty_increments: string;
        txt_weight_value: string;
        txt_wight: string;
        txt_weight_label: string;
        date: Date;
        txt_chemical_carncengen: string[];
        txt_chemical_reproduction: string[];
        txt_contains_wood: string;
        txt_prop65_message_01: string;
        txt_prop65_message_02: string;
        txt_prop65_message_03: string;
        txt_meta_title: string;
        txt_upc1: string;
        txt_seo_meta_description: string;
        txt_keywords: string;
        list_price: string;
        on_sale: string;
        fclassid: string;
        brand_name: string;
        txt_group_code: null;
        txt_x_pant_Mat_status: string;
        thumbnail_img: string;
        class: string;
        attributes: {
          attribute_name: string;
          attribute_value: string;
        }[];
        detailed_images: {
          img: string;
          alt: string;
        }[];
      };
    }>();
};
