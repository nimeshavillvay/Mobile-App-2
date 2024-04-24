import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseSimulatedCheckout = () => {
  return useSuspenseQuery({
    queryKey: ["cart", "simulated-checkout"],
    queryFn: async () => {
      return await api
        .get("rest/simulation-checkout", {
          cache: "no-cache",
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
            shippingAddressId: number;
            paymentToken: string;
          };
          productslist: {
            extendedprice: number;
            price: number;
            priceunit: string;
            sku: string;
            productid?: number;
            cartid?: number;
            coupon: null;
            quantity: number;
            overrideprice: string;
            originalprice: number | null;
          }[];
        }>();
    },
  });
};

export default useSuspenseSimulatedCheckout;
