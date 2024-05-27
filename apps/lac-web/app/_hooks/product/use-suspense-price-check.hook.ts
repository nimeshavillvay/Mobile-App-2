import { api } from "@/_lib/api";
import type { PriceBreakDowns } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

type ItemPrice = {
  productid: number;
  price: string;
  price_unit: string;
  extended: string;
  list_price: number;
  coupon: string | null;
  price_breakdowns: PriceBreakDowns;
  uom_price?: number;
  uom_price_unit?: string;
};

type ItemsPriceResult = {
  error: true | null; //TODO need to clarify how errors send
  items: ItemPrice[];
};

const getPriceBreakDowns = (price_breakdowns: PriceBreakDowns) => {
  return price_breakdowns.map(
    (priceObject): { quantity: number; price: number } => {
      return {
        quantity: Number(priceObject.qty_1),
        price: Number(priceObject.price_1),
      };
    },
  );
};

type Product = {
  productId: number;
  qty: number;
};

// TODO: Need to remove usePriceCheck hook and replace it with useSuspensePriceCheck
const useSuspensePriceCheck = (token: string, products: Product[]) => {
  return useSuspenseQuery({
    queryKey: ["user", "price-check", token, products],
    queryFn: () =>
      api
        .post("rest/pricecheck", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          json: {
            products: products.map((product) => ({
              productid: product.productId,
              qty: product.qty,
            })),
          },
          cache: "no-store",
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
          list_price,
          coupon,
          price_breakdowns,
          uom_price,
          uom_price_unit,
        }) => ({
          productId: productid,
          price: Number(price),
          priceUnit: price_unit,
          extendedPrice: Number(extended),
          listPrice: list_price,
          couponCode: coupon,
          priceBreakDowns: getPriceBreakDowns(price_breakdowns),
          uomPrice: uom_price,
          uomPriceUnit: uom_price_unit,
        }),
      );

      return { error, productPrices: mappedItems };
    },
    staleTime: 60000,
  });
};

export default useSuspensePriceCheck;
