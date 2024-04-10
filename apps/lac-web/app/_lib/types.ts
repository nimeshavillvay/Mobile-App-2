// TODO: Types used in old design needs remove in future
export type PriceBreakDowns = {
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  quantity1: number;
  quantity2: number;
  quantity3: number;
  quantity4: number;
};

export type SKUPrice = {
  extended: number;
  price: number;
  "price-unit": string;
  pricebreakdowns: PriceBreakDowns;
  sku: string;
};

export type ItemPricesResult = {
  "list-sku-price": SKUPrice[];
};

// Shared types for new design
export type Filter = {
  id: string;
  title: string;
  values: {
    id: string;
    value: string;
    active: boolean;
  }[];
};
