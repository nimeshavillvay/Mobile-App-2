import { api } from "@/_lib/api";
import { checkAvailability } from "@/_lib/apis/shared";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BACKORDER_DISABLED, BACKORDER_ENABLED } from "../constants";

const useAddMultipleToCartMutation = (token: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (
      products: {
        productId: number | undefined;
        quantity: number | null | undefined;
        poOrJobName?: string;
      }[],
    ) => {
      /**
       * These configuration values may be wrong due to we are not sending availability check call here. 
         Availability check endpoint is not accepting multiple product details. In that case
         we have to send availability check for each item. 
         However, once items are added to the cart and page re-loads, 
         it will send an API call to check availability and set the correct configuration details.
       */
      const configuration = {
        poOrJobName: "",
        will_call_avail: "",
        will_call_plant: "",
        selectedOption: "",
        backorder_all: "",
        hashvalue: "",
        avail_2: "",
        plant_2: "",
        shipping_method_2: "",
        avail_1: "",
        plant_1: "",
        shipping_method_1: "",
        avail_3: "",
        plant_3: "",
        shipping_method_3: "",
        avail_4: "",
        plant_4: "",
        shipping_method_4: "",
        avail_5: "",
        plant_5: "",
        shipping_method_5: "",
        backorder_quantity: "",
        backorder_date: "",
      };

      const productsInfo = products.map((product) => {
        return {
          productid: product.productId,
          quantity: product.quantity,
          configuration: {
            ...configuration,
            poOrJobName: product.poOrJobName,
          },
        };
      });

      const checkAndConfigureAvailability = async () => {
        const productMap = new Map();
        // This is so that we remove duplicate products since when we send in cart post goes as 2 lines with 2 different hashes and then when
        //we receive from get we only get new updated has and that doesn't match the hash we have so thus default is not set
        productsInfo.forEach((product) => {
          const canBeAddedToCart =
            product.productid !== undefined &&
            product.quantity !== undefined &&
            product.quantity !== null;
          if (canBeAddedToCart) {
            if (productMap.has(product.productid)) {
              productMap.get(product.productid).quantity += product.quantity;
            } else {
              productMap.set(product.productid, { ...product });
            }
          }
        });

        const uniqueProducts = Array.from(productMap.values());

        // Create availability promises only for unique products
        const availabilityPromises = uniqueProducts.map((product) => {
          return checkAvailability(token, {
            productId: product.productid,
            qty: product.quantity,
          }).then((availability) => ({ product, availability })); // Resolve each promise with both product and availability
        });

        const availabilityResults = await Promise.all(availabilityPromises);

        // Process each resolved value
        availabilityResults.forEach(({ product, availability }) => {
          if (availability.options && availability.options.length > 0) {
            const selectedOption = availability.options[0];
            if (selectedOption) {
              // Update product configuration based on the selected availability option
              product.configuration.backorder_all =
                selectedOption.type === "backOrderAll" &&
                selectedOption.backOrder
                  ? BACKORDER_ENABLED
                  : BACKORDER_DISABLED;
              product.configuration.hashvalue = selectedOption.hash;
              product.configuration.backorder_quantity =
                selectedOption.plants?.[0]?.backOrderQuantity?.toString() ??
                "0";
              product.configuration.backorder_date =
                selectedOption.plants?.[0]?.backOrderDate?.toString() ?? "";

              // Update configuration details for up to 5 plants
              if (product.configuration) {
                const addedIndexes = [];
                for (let i = 0; i < 5; i++) {
                  if (selectedOption.plants[i]) {
                    const selectedPlant = selectedOption.plants[i];
                    if (selectedPlant) {
                      const quantity = selectedPlant.quantity ?? "";
                      const index = i + 1; // Assuming index starts from 1 to 5
                      addedIndexes.push(index);

                      product.configuration[`avail_${index}`] =
                        quantity?.toString() ?? "";
                      product.configuration[`plant_${index}`] =
                        selectedPlant.plant ?? "";
                      product.configuration[`shipping_method_${index}`] =
                        selectedPlant.shippingMethods[0]?.code ?? "";
                    }
                  }
                }
              }
            }
          }
        });

        return uniqueProducts;
      };

      const response = await api
        .post("rest/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          json: {
            "configurable-items": await checkAndConfigureAvailability(),
          },
        })
        .json<
          {
            car_item_id: boolean | number;
            error?: string;
            productid: number;
          }[]
        >();

      // Return transformed data
      return response.map((item) => ({
        cartItemId: item.car_item_id,
        productId: item.productid,
        error: item.error,
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: () => {
      // Clear the selected product ID
      toast({
        variant: "destructive",
        title: "Failed to add item cart",
      });
    },
    onSuccess: async (data) => {
      if (data?.[0]?.error && data?.[0]?.error !== "") {
        toast({
          variant: "destructive",
          title: data?.[0]?.error,
        });
      } else {
        toast({
          variant: "default",
          title: "Items added to cart successfully!",
        });
      }
    },
  });
};

export default useAddMultipleToCartMutation;
