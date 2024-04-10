import { api } from "@/old/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

type PriceBreakDowns = {
  price_1: string;
  price_2: string;
  price_3: string;
  price_4: string;
  qty_1: number;
  qty_2: number;
  qty_3: number;
  qty_4: number;
};

type ItemPrice = {
  productid: number;
  price: string;
  price_unit: string;
  extended: string;
  coupon: string | null;
  price_breakdowns: PriceBreakDowns;
};

type ItemsPriceResult = {
  error: null; //TODO need to clarify how errors send
  items: ItemPrice[];
};

// TODO: Need to remove usePriceCheck hook and replace it with useSuspensePriceCheck
const useSuspensePriceCheck = (
  token: string,
  sku: string,
  quantity: number,
) => {
  return useSuspenseQuery({
    queryKey: ["user", "price-check", token, sku, quantity],
    queryFn: () =>
      api
        .post("pim/webservice/ecommerce/price-check", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          json: { skuqty: [{ sku, quantity }] },
        })
        .json<ItemsPriceResult>(),
    select: (data) => {
      const { items, error } = data;
      console.log("items", items);
      const mappedItems = items.map(
        ({
          productid,
          price,
          price_unit,
          extended,
          coupon,
          price_breakdowns,
        }) => ({
          productId: productid,
          price: Number(price),
          priceUnit: price_unit,
          extendedPrice: Number(extended),
          couponCode: coupon,
          priceBreakDowns: {
            price1: Number(price_breakdowns?.price_1),
            price2: Number(price_breakdowns?.price_2),
            price3: Number(price_breakdowns?.price_3),
            price4: Number(price_breakdowns?.price_4),
            quantity1: price_breakdowns?.qty_1 ?? 0,
            quantity2: price_breakdowns?.qty_2 ?? 0,
            quantity3: price_breakdowns?.qty_3 ?? 0,
            quantity4: price_breakdowns?.qty_4 ?? 0,
          },
        }),
      );

      return { error, productPrices: mappedItems };
    },
    staleTime: 60000,
  });
};

export default useSuspensePriceCheck;
