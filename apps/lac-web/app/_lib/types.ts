export type ImageInfo = {
  original: string;
  webp: string;
  jp2: string;
};

export type Attributes = {
  attribute_name: string;
  attribute_value: string;
};

export type OldItemInfo = {
  productid: string;
  item_name: string;
  is_favourite: boolean | null;
  is_comparison: boolean | null;
  img: ImageInfo;
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

export type OldPagination = {
  db_count: string;
  offset: number;
  perPage: number;
};

export type ItemInfo = {
  productId: number;
  isExcludedProduct: boolean;
  productSku: string;
  productName: string;
  image: ImageInfo;
  isComparison: boolean;
  skuAttribute: string;
  isHazardous: boolean;
  specialShipping: boolean;
  productIdOnSap: string;
  mfrPartNo: string;
  productDescription: string;
  productTitle: string;
  brandCode: number;
  unitOfMeasure: string;
  boxQuantity: number;
  minimumOrderQuantity: number;
  quantityByIncrements: number;
  weight: number;
  prop65MessageOne: string;
  prop65MessageTwo: string;
  prop65MessageThree: string;
  listPrice: number;
  isSaleItem: boolean;
  fClassId: number;
  class: string;
  attributes: Attributes[];
  productStatus: string;
  isDirectlyShippedFromVendor: boolean;
  productSummary: string;
  brand: string;
  productCategory: string;
};

export type OldPurchasedProduct = {
  product: string;
  id: string;
  isFavourite: boolean;
  orderDate: string;
  sku: string;
  totalItem: string;
};

export type OldPurchasedItems = {
  products: OldPurchasedProduct[];
  pagination: [OldPagination];
};

export type PurchasedProduct = {
  productTitle: string;
  productSku: string;
  productId: number;
  totalItem: number;
  purchaseOrderDate: string;
  isFavorite: boolean;
};

export type Pagination = {
  totalCount: number;
  offset: number;
  perPage: number;
};

export type PurchasedItems = {
  products: PurchasedProduct[];
  pagination: Pagination;
};

export type PriceBreakDownObject = {
  qty_1: number;
  price_1: number;
};

export type PriceBreakDowns = PriceBreakDownObject[];

export type PasswordPolicies = {
  minimumLength: number;
  minimumNumbers: number;
  minimumAlphabets: number;
};

export type CartItemConfiguration = {
  avail_1: string;
  avail_2: string;
  avail_3: string;
  avail_4: string;
  avail_5: string;
  plant_1: string;
  plant_2: string;
  plant_3: string;
  plant_4: string;
  plant_5: string;
  poOrJobName?: string;
  shipping_method_1: string;
  shipping_method_2: string;
  shipping_method_3: string;
  shipping_method_4: string;
  shipping_method_5: string;
  will_call_avail: string;
  will_call_plant: string;
  hashvalue: string;
  selectedOption: string;
  backorder_all: string;
};

export type CartConfiguration = {
  po_job: null;
  jobName: string | null;
  coupon: string | null;
  po: string | null;
  sold_to: null;
  ship_to: null;
  user_email: null;
  is_overridden: null;
  overridden_email: null;
  osr: null;
  "first-name": null;
  delivering_plant: null;
  avail_payment_options: null;
  attnName: null;
  pickDate: null;
  driverNote: null;
  orderEmail: null;
  completeDelivery: null;
  paymentToken: null;
  cardName: null;
  cardType: null;
  expireDate: null;
  paymentMethod: null;
  isAPrimaryShippingAddress: null;
  shippingAddressId: null;
};
