import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

type AvailableOptions = {
  index: string;
  backOrder: string;
  plant_1?: string;
  quantity_1?: string;
  shippingMethods_1?: string;
  plant_2?: string;
  quantity_2?: string;
  shippingMethods_2?: string;
  plant_3?: string;
  quantity_3?: string;
  shippingMethods_3?: string;
  plant_4?: string;
  quantity_4?: string;
  shippingMethods_4?: string;
  plant_5?: string;
  quantity_5?: string;
  shippingMethods_5?: string;
  backOrderQuantity_1?: string;
  backOrderDate_1?: string;
  type: string;
  hash: string;
};

type CheckAvailability = {
  options: AvailableOptions[];
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
    backOrderQuantity_1?: string;
    backOrderDate_1?: Date;
  };
  xplant: string;
};

const getPlantAvailability = (option: AvailableOptions) => {
  for (let i = 1; i < 6; i++) {
    const plantAvailable: {
      plant: string | null;
      quantity: number;
      shippingMethods: string | null;
    }[] = [];
    const plantKey = `plant_${i}` as keyof AvailableOptions;
    const quantityKey = `quantity_${i}` as keyof AvailableOptions;
    const shippingMethodKey = `shippingMethods_${i}` as keyof AvailableOptions;

    if (option[plantKey]) {
      plantAvailable.push({
        plant: option[plantKey] ?? null,
        quantity: Number(option[quantityKey]) ?? 0,
        shippingMethods: option[shippingMethodKey] ?? null,
      });
    }
    return plantAvailable;
  }
};

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
        .json<[CheckAvailability]>(),
    select: (data) => {
      return data.map(
        ({
          options,
          price,
          sku,
          productid,
          status,
          willcallanywhere,
          xplant,
        }) => ({
          options: options.map((item) => ({
            index: item.index,
            isBackOrder: item.backOrder == "T",
            type: item.type,
            hash: item.hash,
            backOrderQuantity: Number(item.backOrderQuantity_1) ?? 0,
            backOrderDate: item.backOrderDate_1 ?? null,
            availability: getPlantAvailability(item),
          })),
          price,
          productSku: sku,
          productId: productid,
          status,
          transferPlant: xplant,
          willCallAnywhere: willcallanywhere.hash
            ? {
                status: willcallanywhere.status,
                willCallPlant: willcallanywhere.willCallPlant,
                willCallQuantity: Number(willcallanywhere.willCallQuantity),
                hash: willcallanywhere.hash,
                isBackOrder: willcallanywhere.backOrder == "T",
                index: willcallanywhere.index ?? null,
                plant: willcallanywhere.plant_1 ?? null,
                quantity: Number(willcallanywhere.quantity_1) ?? 0,
                shippingMethods: willcallanywhere.shippingMethods_1 ?? null,
                backOrderQuantity:
                  Number(willcallanywhere.backOrderQuantity_1) ?? 0,
                backOrderDate: willcallanywhere.backOrderDate_1 ?? null,
              }
            : {},
        }),
      );
    },
  });
};

export default useSuspenseCheckAvailability;
