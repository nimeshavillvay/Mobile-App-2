import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseSimulationCheckout = () => {
  return useSuspenseQuery({
    queryKey: ["cart", "simulation-checkout"],
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
            coupon: string | null;
            quantity: number;
            overrideprice: string;
            originalprice: number | null;
          }[];
        }>();
    },
    select: (data) => {
      return {
        net: Number(data.net),
        shippingCost: Number(data.shippingcost),
        tax: Number(data.tax),
        total: Number(data.total),
        totalQuantity: Number(data["total-quantity"]),
        cartItemsCount: Number(data.cartItemsCount),
        delivery: data.delivery
          ? {
              home: Number(data.delivery.home),
              multi: Number(data.delivery.multi),
              truck: data.delivery.truck,
            }
          : undefined,
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
          shippingAddressId: Number(data.configuration.shippingAddressId),
          paymentToken: data.configuration.paymentToken,
        },
        productslist: data.productslist.map((item) => ({
          extendedPrice: Number(item.extendedprice),
          price: Number(item.price),
          productSku: item.sku,
          productId: Number(item.productid),
          cartId: Number(item.cartid),
          coupon: item.coupon,
          quantity: Number(item.quantity),
          overridePrice: Number(item.overrideprice),
          originalPrice:
            item.originalprice != null ? Number(item.originalprice) : null,
        })),
      };
    },
  });
};

export default useSuspenseSimulationCheckout;
