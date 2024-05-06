import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import { api } from "@/_lib/api";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSuspenseCheckAvailability from "../product/use-suspense-check-availability.hook";

const useAddToCartMutation = (
  token: string,
  { productId, quantity }: { productId: number; quantity: number },
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { setOpen, setProductId } = useAddToCartDialog(
    (state) => state.actions,
  );

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId,
    qty: quantity,
  });

  return useMutation({
    mutationFn: async () => {
      const configuration: { [key: string]: string } = {
        poOrJobName: "",
        will_call_avail: "",
        will_call_plant: "",
        selectedOption: "",
        backorder_all: "C",
      };

      if (checkAvailabilityQuery.data.options[0]) {
        configuration.hashvalue = checkAvailabilityQuery.data.options[0].hash;

        // Added items from availability check
        checkAvailabilityQuery.data.options[0].availability.forEach(
          (option, index) => {
            configuration[`avail_${index + 1}`] = option.quantity.toString();
            configuration[`plant_${index + 1}`] = option.plant ?? "";
          },
        );

        // Fill the rest with empty values
        for (
          let i = checkAvailabilityQuery.data.options[0].availability.length;
          i < 5;
          i++
        ) {
          configuration[`avail_${i + 1}`] = "";
          configuration[`plant_${i + 1}`] = "";
        }

        // Shipping methods
        const shippingMethods =
          checkAvailabilityQuery.data.options[0].availability[0]?.shippingMethods?.split(
            ",",
          ) ?? [];
        shippingMethods.forEach((method, index) => {
          configuration[`shipping_method_${index + 1}`] = method;
        });
        for (let i = shippingMethods.length; i < 5; i++) {
          configuration[`shipping_method_${i + 1}`] = "";
        }
      }

      return api.post("rest/cart", {
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
      });
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
    onSuccess: () => {
      // Open the dialog
      setOpen(true);
    },
  });
};

export default useAddToCartMutation;
