import { SPECIAL_SHIPPING_FLAG } from "@/_lib/constants";
import { getBoolean } from "@/_lib/utils";
import { api } from "../api";
import type {
  AvailabilityParameters,
  CheckAvailability,
  Token,
} from "../types";

export const getItemInfo = async (productIdList: number[]) => {
  const response = await api
    .get("rest/getiteminfo", {
      searchParams: { productids: productIdList.toString() },
    })
    .json<
      {
        productid: string;
        is_product_exclude: boolean;
        txt_wurth_lac_item: string;
        item_name: string;
        img: string;
        slug: string;
        is_comparison: boolean;
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
        txt_chemical_carncengen: string;
        txt_chemical_reproduction: null;
        txt_contains_wood: null;
        txt_prop65_message_01: string;
        txt_prop65_message_02: null;
        txt_prop65_message_03: null;
        txt_meta_title: string;
        txt_upc1: string;
        txt_seo_meta_description: string;
        txt_keywords: string;
        list_price: string;
        on_sale: string;
        is_new: string;
        fclassid: string;
        brand_name: string;
        txt_group_code: null;
        item_status: null;
        category_name: string;
        product_summary: string;
        is_directly_shipped_from_vendor: boolean;
        class: string;
        attributes: {
          attribute_name: string;
          attribute_value: null | string;
        }[];
      }[]
    >();

  const transformedResponse = response.map((item) => ({
    productId: parseInt(item.productid, 10),
    slug: item.slug,
    isExcludedProduct: item.is_product_exclude,
    productSku: item.txt_wurth_lac_item,
    productName: item.item_name,
    image: item.img,
    isComparison: !!item.is_comparison,
    isHazardous: getBoolean(item.txt_hazardous),
    specialShipping: !!SPECIAL_SHIPPING_FLAG.find(
      (flag) => flag === item.txt_special_shipping,
    ),
    productIdOnSap: item.txt_sap,
    mfrPartNo: item.txt_mfn,
    productDescription: item.txt_description_name,
    productSubDescription: item.txt_sub_description,
    brandCode: parseInt(item.sel_assigned_brand, 10),
    unitOfMeasure: item.txt_uom_label,
    boxQuantity: parseInt(item.txt_box_qt, 10) || 1,
    minimumOrderQuantity: parseInt(item.txt_min_order_amount, 10) || 1,
    quantityByIncrements: parseInt(item.txt_box_qt, 10) || 1,
    weight: parseFloat(item.txt_weight_value),
    prop65MessageOne: item.txt_prop65_message_01 ?? "",
    prop65MessageTwo: item.txt_prop65_message_02 ?? "",
    prop65MessageThree: item.txt_prop65_message_03 ?? "",
    listPrice: parseFloat(item.list_price),
    isSaleItem: getBoolean(item.on_sale),
    isNewItem: getBoolean(item.is_new),
    fClassId: parseInt(item.fclassid), //TODO rename after clarify with dimithri
    class: item.class,
    attributes: item.attributes,
    productStatus: item.item_status ?? "",
    isDirectlyShippedFromVendor: item.is_directly_shipped_from_vendor,
    productSummary: item.product_summary,
    brand: item.brand_name,
    productCategory: item.category_name,
  }));

  return transformedResponse;
};

export const checkAvailability = async (
  token: Token,
  { productId, qty, plant }: AvailabilityParameters,
) => {
  const response = await api
    .post("rest/availability-check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        productid: productId,
        qty,
        plant,
      },
      cache: "no-store",
    })
    .json<CheckAvailability>();

  return {
    productId: response.productid,
    status: response.status,
    options: response.options,
    willCallAnywhere: response.willcallanywhere,
    xplant: response.xplant,
    availableLocations: response.available_locations,
  };
};
