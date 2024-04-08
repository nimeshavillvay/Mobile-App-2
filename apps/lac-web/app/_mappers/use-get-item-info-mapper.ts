import { SPECIAL_SHIPPING_FLAG } from "./constants";

export const mapGetItemInfoResponse = (response: any[]) => {
  return response.map((item: any) => ({
    productId: item.productid,
    isProductExclude: item.is_product_exclude,
    materialNo: item.txt_wurth_lac_item,
    itemName: item.item_name,
    image: item.img,
    isFavourite: !!item.is_favourite,
    isComparison: !!item.is_comparison,
    skuAttribute: item["SKU-attribute"],
    hazardous: item.txt_hazardous === "Y",
    specialShipping: !!SPECIAL_SHIPPING_FLAG.find(
      (flag: string) => flag === item.txt_special_shipping,
    ),
    sapId: item.txt_sap,
    MFRPartNo: item.txt_mfn,
    itemDescription: item.txt_description_name,
    subDescription: item.txt_sub_description,
    brandCode: item.sel_assigned_brand,
    uomLabel: item.txt_uom_label,
    boxQuantity: parseInt(item.txt_box_qt, 10) || 1,
    minimumOrderQuantity: parseInt(item.txt_min_order_amount, 10) || 1,
    quantityByIncrements: parseInt(item.txt_box_qt, 10) || 1,
    weight: item.txt_weight_value,
    prop65MessageOne: item.txt_prop65_message_01,
    prop65MessageTwo: item.txt_prop65_message_02,
    prop65MessageThree: item.txt_prop65_message_03,
    listPrice: item.list_price,
    isSaleItem: item.on_sale === "Y",
    fClassId: item.fclassid,
    class: item.class,
    attributes: item.attributes,
  }));
};
