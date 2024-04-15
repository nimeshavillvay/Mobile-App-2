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
  error: true | null; //TODO need to clarify how errors send
  items: ItemPrice[];
};

const getPriceBreakDowns = (price_breakdowns: PriceBreakDowns) => {
  return Object.entries(price_breakdowns)
    .filter(([key]) => key.startsWith("price_"))
    .map(([key, value]) => {
      const index = parseInt(key.replace("price_", ""));
      const quantityKey = `qty_${index}` as keyof PriceBreakDowns;
      return {
        quantity: Number(price_breakdowns[quantityKey]),
        price: Number(value),
      };
    });
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
          priceBreakDowns: getPriceBreakDowns(price_breakdowns),
        }),
      );

      return { error, productPrices: mappedItems };
    },
    staleTime: 60000,
  });
};

export default useSuspensePriceCheck;
