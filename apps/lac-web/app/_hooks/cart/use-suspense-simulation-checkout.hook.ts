import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseSimulationCheckout = () => {
  return useSuspenseQuery({
    queryKey: ["cart", "simulation-checkout"],
    queryFn: async () =>
      await api
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
            coupon: string | null;
            quantity: number;
            overrideprice: string;
            originalprice: number | null;
          }[];
        }>(),
    select: (data) => {
      return {
        net: data.net,
        shippingCost: data.shippingcost,
        tax: data.tax,
        total: data.total,
        totalQuantity: data["total-quantity"],
        cartItemsCount: data.cartItemsCount,
        delivery: {
          home: data.delivery.home,
          multi: data.delivery.multi,
          truck: data.delivery.truck,
        },
        configuration: {
          soldTo: data.configuration.sold_to,
          shipTo: data.configuration.ship_to,
          paymentMethod: data.configuration.paymentMethod,
          orderEmail: data.configuration.orderEmail,
          poJob: data.configuration.po_job,
          jobName: data.configuration.jobName,
          po: data.configuration.po,
          userEmail: data.configuration.user_email,
          isOverridden: data.configuration.is_overridden,
          overriddenEmail: data.configuration.overridden_email,
          completeDelivery: data.configuration.completeDelivery,
          pickDate: data.configuration.pickDate,
          coupon: data.configuration.coupon,
          osr: data.configuration.osr,
          attnName: data.configuration.attnName,
          driverNote: data.configuration.driverNote,
          firstName: data.configuration["first-name"],
          deliveringPlant: data.configuration.delivering_plant,
          availablePaymentOptions: data.configuration.avail_payment_options,
          cardName: data.configuration.cardName,
          cardType: data.configuration.cardType,
          expireDate: data.configuration.expireDate,
          shippingAddressId: data.configuration.shippingAddressId,
          paymentToken: data.configuration.paymentToken,
        },
        productslist: data.productslist.map((item) => ({
          extendedPrice: item.extendedprice,
          price: item.price,
          productSku: item.sku,
          productId: item.productid,
          cartId: item.cartid,
          coupon: item.coupon,
          quantity: item.quantity,
          overridePrice: Number(item.overrideprice),
          originalPrice: item.originalprice,
        })),
      };
    },
  });
};

export default useSuspenseSimulationCheckout;
