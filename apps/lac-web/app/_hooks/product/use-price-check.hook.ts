import { api } from "@/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/_lib/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const usePriceCheck = (sku: string, quantity: number) => {
  const [cookies] = useCookies();

  return useQuery({
    queryKey: ["product", sku, quantity, cookies[ACCOUNT_TOKEN_COOKIE]],
    enabled: !!cookies[ACCOUNT_TOKEN_COOKIE],
    queryFn: () =>
      api
        .post("pim/webservice/ecommerce/price-check", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: { skuqty: [{ sku, quantity }] },
        })
        .json<{
          "list-sku-price": [
            {
              extended: number;
              price: number;
              "price-unit": string;
              pricebreakdowns: {
                price1: number;
                price2: number;
                price3: number;
                price4: number;
                quantity1: number;
                quantity2: number;
                quantity3: number;
                quantity4: number;
              };
              sku: string;
            },
          ];
        }>(),
    placeholderData: keepPreviousData,
  });
};

export default usePriceCheck;
