import type { OldPagination, Pagination } from "@/_lib/types";

export type ShoppingListItemsResponse = {
  items: ShoppingListItemsElementResponse[];
  pagination: OldPagination;
};

export type ShoppingListItemsElementResponse = {
  productid: string;
  is_product_exclude?: boolean;
  txt_wurth_lac_item?: string;
  item_name?: string;
  img?: string;
  slug?: string;
  is_favourite?: boolean;
  is_comparison?: boolean;
  txt_hazardous?: string;
  txt_special_shipping?: string;
  txt_sap?: string;
  txt_mfn?: string;
  txt_description_name?: string;
  txt_sub_description?: string;
  sel_assigned_brand?: string;
  txt_uom?: string;
  txt_uom_label?: string;
  txt_uom_value?: string;
  txt_rounding?: string;
  txt_box_qt?: string;
  txt_min_order_amount?: string;
  txt_order_qty_increments?: string;
  txt_weight_value?: string;
  txt_wight?: string;
  txt_weight_label?: string;
  date?: string;
  txt_chemical_carncengen?: string;
  txt_chemical_reproduction?: string;
  txt_contains_wood?: string;
  txt_prop65_message_01?: string;
  txt_prop65_message_02?: string;
  txt_prop65_message_03?: string;
  txt_meta_title?: string;
  txt_upc1?: string;
  txt_seo_meta_description?: string;
  txt_keywords?: string;
  list_price?: string;
  on_sale?: string;
  is_new?: string;
  fclassid?: string;
  brand_name?: string;
  txt_group_code?: string;
  item_status?: string;
  category_name?: string;
  product_summary?: string;
  is_directly_shipped_from_vendor?: boolean;
};

export type ShoppingListItemsElement = {
  productId: string;
  isProductExclude?: boolean;
  txtWurthLacItem?: string;
  itemName?: string;
  img?: string;
  slug?: string;
  isFavorite?: boolean;
  isComparison?: boolean;
  txtHazardous?: string;
  txtSpecialShipping?: string;
  txtSap?: string;
  txtMfn?: string;
  txtDescriptionName?: string;
  txtSubDescription?: string;
  selAssignedBrand?: string;
  txtUom?: string;
  txtUomLabel?: string;
  txtUomValue?: string | null;
  txtRounding?: string | null;
  txtBoxQt?: string;
  txtMinOrderAmount?: string;
  txtOrderQtyIncrements?: string;
  txtWeightValue?: string;
  txtWight?: string;
  txtWeightLabel?: string;
  date?: string;
  txtChemicalCarncengen?: string;
  txtChemicalReproduction?: string;
  txtContainsWood?: string;
  txtProp65Message01?: string;
  txtProp65Message02?: string;
  txtProp65Message03?: string;
  txtMetaTitle?: string;
  txtUpc1?: string;
  txtSeoMetaDescription?: string;
  txtKeywords?: string;
  listPrice?: string;
  onSale?: string;
  isNewItem?: string;
  fClassId?: string;
  brandName?: string;
  txtGroupCode?: string;
  itemStatus?: string;
  categoryName?: string;
  productSummary?: string;
  isDirectlyShippedFromVendor?: boolean;
};

export type ShoppingListItems = {
  items: ShoppingListItemsElement[];
  pagination: Pagination;
};
