export type ProductPrice = {
  coupon?: null | string;
  currency?: string;
  extended?: number;
  listPrice?: number;
  price: number;
  priceBreakdowns?: PriceBreakdown[];
  priceUnit?: string;
  productid?: string;
  uomPrice?: number;
  uomPriceUnit?: string;
};

/**
 * PriceBreakdown
 */
export type PriceBreakdown = {
  price?: number;
  quantity?: number;
};
