import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseCheckAvailability = ({
  productId,
  qty,
  plant,
}: {
  productId: number;
  qty: number;
  plant?: string;
}) => {
  return useSuspenseQuery({
    queryKey: [
      "user",
      "product",
      "availability",
      {
        productId,
        qty,
        plant,
      },
    ],
    queryFn: () =>
      api
        .post("rest/availability-check", {
          json: {
            productids: [
              {
                productid: productId,
                qty,
                plant,
              },
            ],
          },
          cache: "no-store",
        })
        .json<
          [
            {
              options: {
                index: string;
                backOrder: string;
                plant_1: string;
                quantity_1?: string;
                backOrderQuantity_1?: string;
                shippingMethods_1: string;
                type: string;
                backOrderDate_1?: Date;
                hash: string;
              }[];
              price: number;
              sku: string;
              productid: number;
              status: null | string;
              willcallanywhere: {
                status?: string;
                willCallPlant?: string;
                willCallQuantity?: string;
                hash?: string;
                backOrder?: string;
                index?: string;
                plant_1?: string;
                quantity_1?: string;
                shippingMethods_1?: string;
                type?: string;
                willCallBackOrder?: Date;
              };
              xplant: string;
            },
          ]
        >(),
    select: (data) => {
      return data[0];
    },
  });
};

export default useSuspenseCheckAvailability;
