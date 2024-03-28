export type Option = {
  value: string;
  label: string;
};

export type Duration = {
  value: string;
  label: string;
};

export type PurchasedOrder = {
  isFavourite: boolean;
  orderDate: string;
  sku: string;
  totalItem: number;
};

export type PurchasedOrders = {
  purchesOrders: {
    content: PurchasedOrder[];
    totalElements: number;
  };
};

export type CategoryInfo = {
  oo_id: number;
  cat_name: string;
};

export type OrderHistoryItem = {
  brand_name: string;
  categoryInfo: CategoryInfo[];
  group_id: string;
  img: string;
  is_product_exclude: boolean | null;
  sel_assigned_brand: number | null;
  txt_CI_number: string;
  txt_category: string;
  txt_hazardous: string;
  txt_mfn: string;
  txt_min_order_amount: number | null;
  txt_order_qty_increments: number | null;
  txt_sap: number | null;
  txt_sap_description_name: string;
  txt_special_shipping: string;
  txt_uom: string;
  txt_uom_label: string;
  txt_uom_value: string;
  txt_web_direct: string;
  txt_wurth_lac_item: string;
  txt_x_pant_Mat_status: string;
};

export type OrderHistoryItems = OrderHistoryItem[];

export type CombinedPurchasedItem = OrderHistoryItem & PurchasedOrder;
