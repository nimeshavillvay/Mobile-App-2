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
    mutationFn: async ({ poOrJobName = "" }: { poOrJobName?: string }) => {
      const configuration: { [key: string]: string } = {
        poOrJobName,
        will_call_avail: "",
        will_call_plant: "",
        selectedOption: "",
        backorder_all: "C",
      };

      if (checkAvailabilityQuery.data.options[0]) {
        const selectedOption = checkAvailabilityQuery.data.options[0];

        configuration.hashvalue = selectedOption.hash;

        // Add 1st plant
        configuration["avail_1"] =
          selectedOption.plants["1"]?.quantity?.toString() ?? "";
        configuration["plant_1"] = selectedOption.plants["1"]?.plant ?? "";
        // Add just the 1st shipping method
        configuration["shipping_method_1"] =
          selectedOption.plants["1"]?.shippingMethods?.split(",")[0] ?? "";
        // Add other plants
        for (let i = 2; i <= 5; i++) {
          configuration[`avail_${i}`] = "";
          configuration[`plant_${i}`] = "";
          configuration[`shipping_method_${i}`] = "";
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
      setOpen("confirmation");
    },
  });
};

export default useAddToCartMutation;
