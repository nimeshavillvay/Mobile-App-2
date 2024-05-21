import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import { api } from "@/_lib/api";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkAvailability } from "../product/use-suspense-check-availability.hook";

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

        configuration.backorder_all = selectedOption.backOrder ? "C" : "";
        configuration.hashvalue = selectedOption.hash;

        // Add the plants
        for (let i = 1; i <= 5; i++) {
          if (selectedOption.plants[i.toString()]) {
            const selectedPlant = selectedOption.plants[i.toString()];

            if (selectedPlant) {
              const quantity = selectedOption.backOrder
                ? selectedPlant.backOrderQuantity
                : selectedPlant.quantity;

              configuration[`avail_${i}`] = quantity?.toString() ?? "";
              configuration[`plant_${i}`] = selectedPlant.plant ?? "";
              configuration[`shipping_method_${i}`] =
                selectedPlant.shippingMethods?.find(
                  // TODO Temporary fix
                  // Exclude the same day shipping option
                  (method) => method.code !== "0",
                )?.code ?? "";
            }
          } else {
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
