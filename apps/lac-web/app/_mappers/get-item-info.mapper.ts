import { SPECIAL_SHIPPING_FLAG } from "@/_lib/constants";
import type { ItemInfo } from "@/_lib/types";

export const mapGetItemInfoResponse = (response: ItemInfo[]) => {
  return response.map((item) => ({
    productId: parseInt(item.productid, 10),
    isExcludedProduct: item.is_product_exclude,
    productSku: item.txt_wurth_lac_item,
    productName: item.item_name,
    image: item.img,
    isFavourite: !!item.is_favourite,
    isComparison: !!item.is_comparison,
    skuAttribute: item["SKU-attribute"],
    isHazardous: item.txt_hazardous === "Y",
    specialShipping: !!SPECIAL_SHIPPING_FLAG.find(
      (flag) => flag === item.txt_special_shipping,
    ),
    productIdOnSap: item.txt_sap,
    mfrPartNo: item.txt_mfn,
    productDescription: item.txt_description_name,
    productTitle: item.txt_sub_description,
    brandCode: parseInt(item.sel_assigned_brand, 10),
    unitOfMeasure: item.txt_uom_label,
    boxQuantity: parseInt(item.txt_box_qt, 10) || 1,
    minimumOrderQuantity: parseInt(item.txt_min_order_amount, 10) || 1,
    quantityByIncrements: parseInt(item.txt_box_qt, 10) || 1,
    weight: parseFloat(item.txt_weight_value),
    prop65MessageOne: item.txt_prop65_message_01,
    prop65MessageTwo: item.txt_prop65_message_02,
    prop65MessageThree: item.txt_prop65_message_03,
    listPrice: parseFloat(item.list_price),
    isSaleItem: item.on_sale === "Y",
    fClassId: parseInt(item.fclassid), //TODO rename after clarify with dimithri
    class: item.class,
    attributes: item.attributes,
    productStatus: item.item_status,
    isDirectlyShippedFromVendor: item.is_directly_shipped_from_vendor,
    productSummary: item.product_summary,
    brand: item.brand_name,
    productCategory: item.category_name,
  }));
};
