import { api } from "@/old/_lib/api";
import type { Product } from "@/old/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseCart = (accountToken: string) => {
  return useSuspenseQuery({
    queryKey: ["cart", accountToken],
    queryFn: () =>
      api
        .get("pim/webservice/ecommerce/cart", {
          headers: {
            authorization: `Bearer ${accountToken}`,
          },
        })
        .json<{
          cartItems: Product[];
          configuration: {
            sold_to: string;
            ship_to: string;
            po_job: string;
            user_email: string;
            is_overridden: boolean;
            overridden_email: string;
            osr: string;
            "first-name": string;
            delivering_plant: string;
            avail_payment_options: string;
            po: string;
            coupon: null;
            jobName: string;
            attnName: string;
            pickDate: string;
            driverNote: null;
            orderEmail: null;
            completeDelivery: null;
            paymentToken: string;
            cardName: string;
            cardType: string;
            expireDate: string;
            paymentMethod: string;
            isAPrimaryShippingAddress: string;
            shippingAddressId: string;
          };
          "total-quantity": number;
        }>(),
  });
};

export default useSuspenseCart;
