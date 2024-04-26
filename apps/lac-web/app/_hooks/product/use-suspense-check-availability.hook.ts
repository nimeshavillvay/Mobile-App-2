import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

type PlantInfo = {
  plant_1?: string;
  plant_2?: string;
  plant_3?: string;
  plant_4?: string;
  plant_5?: string;
};

type QtyInfo = {
  quantity_1?: number;
  quantity_2?: number;
  quantity_3?: number;
  quantity_4?: number;
  quantity_5?: number;
};

type ShippingMethodInfo = {
  shippingMethods_1?: string;
  shippingMethods_2?: string;
  shippingMethods_3?: string;
  shippingMethods_4?: string;
  shippingMethods_5?: string;
};

type AvailableOptions = {
  index: string;
  backOrder: boolean;
  backOrderQuantity_1?: number;
  backOrderDate_1?: string;
  type: string;
  hash: string;
};

type Options = AvailableOptions & PlantInfo & QtyInfo & ShippingMethodInfo;

type CheckAvailability = {
  options: Options[];
  price: number;
  productid: number;
  status: null | string;
};

const getPlantAvailability = (option: Options) => {
  const plantAvailable: {
    plant: string | null;
    quantity: number;
    shippingMethods: string | null;
  }[] = [];

  for (let i = 1; i < 6; i++) {
    const plantKey = `plant_${i}` as keyof PlantInfo;
    const quantityKey = `quantity_${i}` as keyof QtyInfo;
    const shippingMethodKey =
      `shippingMethods_${i}` as keyof ShippingMethodInfo;

    if (option[plantKey]) {
      plantAvailable.push({
        plant: option[plantKey] ?? null,
        quantity: option[quantityKey] ?? 0,
        shippingMethods: option[shippingMethodKey] ?? null,
      });
    }
  }

  return plantAvailable;
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
        .json<CheckAvailability>(),
    select: (data) => {
      return {
        productId: data.productid,
        status: data.status,
        options: data.options.map((item) => ({
          index: item.index,
          isBackOrder: item.backOrder,
          type: item.type,
          hash: item.hash,
          backOrderQuantity: Number(item.backOrderQuantity_1) || 0,
          availability: getPlantAvailability(item),
        })),
      };
    },
  });
};

export default useSuspenseCheckAvailability;
