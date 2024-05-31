import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import { api } from "@/_lib/api";
import { checkAvailability } from "@/_lib/apis/shared";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddToCartMutation = (
  token: string,
  { productId }: { productId: number },
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { setOpen, setProductId } = useAddToCartDialog(
    (state) => state.actions,
  );

  return useMutation({
    mutationFn: async ({
      quantity,
      poOrJobName = "",
    }: {
      quantity: number;
      poOrJobName?: string;
    }) => {
      const configuration: { [key: string]: string } = {
        poOrJobName,
        will_call_avail: "",
        will_call_plant: "",
        selectedOption: "",
      };

      const availability = await checkAvailability(token, {
        productId,
        qty: quantity,
      });

      if (availability.options[0]) {
        const selectedOption = availability.options[0];

        configuration.backorder_all = selectedOption.backOrder ? "T" : "";
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

      const response = await api
        .post("rest/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
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
    onMutate: () => {
      // Prefetch the product data for the dialog
      setProductId(productId);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: () => {
      // Clear the selected product ID
      setProductId(undefined);
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
        // Open the dialog
        setOpen("confirmation");
      }
    },
  });
};

export default useAddToCartMutation;
