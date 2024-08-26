import { z } from "zod";
import { api } from "~/lib/api";
import {
  BACKORDER_DISABLED,
  BACKORDER_ENABLED,
  FALSE_STRING,
  NOT_AVAILABLE,
} from "~/lib/constants";
import type { AuthenticatedApiConfig } from "~/lib/types";
import { checkAvailability } from "./check-availability";

const addToCartSchema = z.array(
  z.object({
    car_item_id: z.union([z.boolean(), z.number()]).optional(),
    error: z.string().optional(),
    productid: z.number(),
  }),
);

export const addToCart = async (
  config: AuthenticatedApiConfig,
  {
    productId,
    quantity,
    poOrJobName = "",
  }: { productId: number; quantity: number; poOrJobName?: string },
) => {
  const configuration: { [key: string]: string } = {
    poOrJobName,
    will_call_avail: "",
    will_call_plant: "",
    selectedOption: "",
    will_call_not_in_stock: FALSE_STRING,
  };

  const availability = await checkAvailability(config, {
    productId,
    quantity,
  });

  if (availability.options[0]) {
    const selectedOption = availability.options[0];
    configuration.backorder_all =
      selectedOption.type === "backOrderAll" && selectedOption.backOrder
        ? BACKORDER_ENABLED
        : BACKORDER_DISABLED;
    configuration.hashvalue = selectedOption.hash;
    configuration.backorder_quantity =
      selectedOption.plants?.[0]?.backOrderQuantity?.toString() ?? "0";
    configuration.backorder_date =
      selectedOption.plants?.[0]?.backOrderDate?.toString() ?? "";

    // Keep track of the added plants(indexes)
    const addedIndexes: number[] = [];

    // Add the plants
    for (let i = 0; i < 5; i++) {
      if (selectedOption.plants[i]) {
        const selectedPlant = selectedOption.plants[i];

        if (selectedPlant) {
          const quantity = selectedPlant.quantity ?? "";
          const index = selectedPlant.index;
          addedIndexes.push(index);

          configuration[`avail_${index}`] = quantity?.toString() ?? "";
          configuration[`plant_${index}`] = selectedPlant.plant ?? "";
          configuration[`shipping_method_${index}`] =
            selectedPlant.shippingMethods[0]?.code ?? "";
        }
      }
    }

    // Add the missing plants
    for (let i = 1; i <= 5; i++) {
      if (!addedIndexes.includes(i)) {
        configuration[`avail_${i}`] = "";
        configuration[`plant_${i}`] = "";
        configuration[`shipping_method_${i}`] = "";
      }
    }
  }

  if (availability.status !== NOT_AVAILABLE) {
    const response = await api
      .post("rest/cart", {
        prefixUrl: config.baseUrl,
        headers: {
          "X-AUTH-TOKEN": config.apiKey,
          authorization: `Bearer ${config.token}`,
        },
        json: {
          "configurable-items": [
            {
              productid: productId,
              quantity,
              configuration,
            },
          ],
        },
      })
      .json();

    const parsedResponse = await addToCartSchema.parseAsync(response);

    // Return transformed data
    return parsedResponse.map((item) => ({
      cartItemId: item.car_item_id,
      productId: item.productid,
      error: item.error,
    }));
  }

  return;
};
