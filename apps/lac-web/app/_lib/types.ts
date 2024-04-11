export type ImageInfo = {
  original: string;
  webp: string;
  jp2: string;
};

export type Attributes = {
  attribute_name: string;
  attribute_value: string;
};

export type ItemInfo = {
  productid: string;
  item_name: string;
  is_favourite: boolean | null;
  is_comparison: boolean | null;
  img: ImageInfo[];
  attributes: Attributes[];
  group_id: string;
  is_product_exclude: boolean;
  sel_assigned_brand: string;
  txt_hazardous: string;
  txt_mfn: string;
  txt_min_order_amount: string;
  txt_order_qty_increments: string;
  txt_sap: string;
  txt_special_shipping: string;
  txt_uom_label: string;
  txt_web_direct: string;
  txt_wurth_lac_item: string;
  txt_x_pant_Mat_status: string;
  txt_description_name: string;
  txt_sub_description: string;
  txt_box_qt: string;
  txt_weight_value: string;
  txt_prop65_message_01: string;
  txt_prop65_message_02: string;
  txt_prop65_message_03: string;
  list_price: string;
  on_sale: string;
  fclassid: string;
  class: string;
  "SKU-attribute": string;
  item_status: string;
  is_directly_shipped_from_vendor: boolean;
  product_summary: string;
  brand_name: string;
  category_name: string;
};

export type Pagination = {
  db_count: string;
  offset: number;
  perPage: number;
};
