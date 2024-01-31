import { api } from "@/_lib/api";
import { notFound } from "next/navigation";
import "server-only";

export const getProduct = async (groupId: string, sku?: string) => {
  const response = await api
    .get(`pim/webservice/rest/landinginfo/${groupId}`, {
      searchParams: sku
        ? new URLSearchParams({
            sku,
          })
        : undefined,
      next: {
        revalidate: 3600,
      },
    })
    .json<
      | {
          page_title: string;
          group_id: number;
          txt_group_part_number: string;
          group_summary: string;
          group_sel_always: string;
          brand_name: string;
          group_brand_logo_thumnail: string[];
          group_brand_logo_thumnail_zoom: {
            small: string;
            big: string;
          }[];
          group_img: string[];
          group_imgSZ: {
            small: string;
            big: string;
          }[];
          selected_item?: {
            is_product_exclude: boolean;
            txt_web_direct: string;
            txt_hazardous: string;
            txt_special_shipping: string;
            txt_x_pant_Mat_status: string;
            pim_item_name: string;
            sel_profile: string;
            txt_abc_code: null;
            txt_m_type: string;
            txt_reserve: null;
            txt_web_visible_status: string;
            txt_sap: string;
            txt_mfn: string;
            txt_wurth_lac_item: string;
            txt_CI_number: string;
            txt_description_name: string;
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
            txt_sku_optioon_value: null;
            date: Date;
            txt_group_code: null;
            txt_mat_group: string;
            txt_mat_description_1: null;
            txt_mat_description_2: null;
            txt_print_cat_page_number: null;
            txt_product_summary: string;
            txt_chemical_carncengen: string;
            txt_chemical_reproduction: string;
            txt_contains_wood: string;
            txt_meta_title: string;
            txt_h1: string;
            txt_h2: string;
            txt_h3: string;
            txt_upc1: string;
            txt_upc2: null;
            txt_seo_meta_description: null;
            txt_keywords: string;
            override_price?: string;
            item_brand_code: string;
            item_brand_name: string;
            item_brand_logo: string;
            item_brand_logo_thumnail: string;
            txt_prop65_message_01: string;
            txt_prop65_message_02: string;
            txt_prop65_message_03: string;
            item_img: string[];
            item_imgSZ: {
              small: string;
              big: string;
            }[];
          };
          selected_object_attributes: {
            attribute_name: string;
            attribute_value: string;
          }[];
        }
      | []
    >();

  // If the product is not found, an empty array is returned
  if (Array.isArray(response)) {
    return notFound();
  }

  return response;
};
