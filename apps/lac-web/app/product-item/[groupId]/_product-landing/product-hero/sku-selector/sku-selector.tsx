import { api } from "@/_lib/api";
import SKUSelect from "./sku-select";

type SKUSelectorProps = {
  groupId: string;
  sku?: string;
};

const SKUSelector = async ({ groupId, sku }: SKUSelectorProps) => {
  const variants = await api
    .get(`pim/webservice/rest/landingvariant/${groupId}`, {
      searchParams: sku ? new URLSearchParams({ sku }) : undefined,
      next: {
        revalidate: 3600,
      },
    })
    .json<{
      AvailableAttributes: {
        name: string;
        slug: string;
        variations: {
          value: string;
          id: string;
        }[];
      }[];
      items: {
        is_product_exclude: boolean;
        item_img: string;
        item_img_zoom: {
          zoom_small: string;
          zoom_big: string;
        };
        SKU_attribute: string;
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
        item_brand_name: string;
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
        txt_sub_description: string;
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
        Attributes: {
          name: string;
          value: string;
          id: string;
          slug: string;
        }[];
        override_price?: string;
      }[];
    }>();

  return (
    <SKUSelect
      groupId={groupId}
      selectedSku={sku}
      variants={variants.items.map((item) => ({
        sku: item.txt_wurth_lac_item,
        name: item.SKU_attribute,
      }))}
    />
  );
};

export default SKUSelector;
