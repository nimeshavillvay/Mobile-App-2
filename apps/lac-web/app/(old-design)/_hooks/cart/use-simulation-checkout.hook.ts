import { api } from "@/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/_lib/constants";
import { useQuery } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useSimulationCheckout = () => {
  const [cookies] = useCookies();

  return useQuery({
    queryKey: ["cart", "simulation-checkout", cookies[ACCOUNT_TOKEN_COOKIE]],
    enabled: !!cookies[ACCOUNT_TOKEN_COOKIE],
    queryFn: () =>
      api
        .get("pim/webservice/ecommerce/simulation-checkout", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
        })
        .json<{
          net: number;
          shippingcost: number;
          tax: number;
          total: number;
          "total-quantity": number;
          cartItemsCount: number;
          delivery: {
            home: number;
            multi: number;
            truck: string;
          };
          configuration: {
            sold_to: string;
            ship_to: string;
            paymentMethod: string;
            orderEmail: string;
            po_job: string;
            jobName: string;
            po: string;
            user_email: string;
            is_overridden: boolean;
            overridden_email: string;
            completeDelivery: string;
            pickDate: string;
            coupon: string;
            osr: string;
            attnName: string;
            driverNote: string;
            "first-name": string;
            delivering_plant: string;
            avail_payment_options: string;
            cardName: string;
            cardType: string;
            expireDate: string;
            shippingAddressId: string;
            paymentToken: string;
          };
          productslist: {
            extendedprice: number;
            price: number;
            priceunit: string;
            sku: string;
            coupon: null;
            quantity: number;
            overrideprice: string;
            originalprice: null;
          }[];
        }>(),
  });
};

export default useSimulationCheckout;
