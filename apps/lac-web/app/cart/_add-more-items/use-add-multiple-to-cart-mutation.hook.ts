import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import { api } from "@/_lib/api";
import { checkAvailability } from "@/_lib/apis/shared";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddMultipleToCartMutation = (token: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { setOpen, setProductId } = useAddToCartDialog(
    (state) => state.actions,
  );

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
        hashvalue: "4b68ac004b78e1425f6a0abb9a29a891",
        avail_2: "1",
        plant_2: "L009",
        shipping_method_2: "0",
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
      };

      let productsInfo = products.map((product) => {
        return {
          productid: product.productId,
          quantity: product.quantity,
          configuration: {
            ...configuration,
            poOrJobName: product.poOrJobName,
          },
        };
      });

      const response = await api
        .post("rest/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          json: {
            "configurable-items": productsInfo,
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
      // setProductId(productId);
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
        toast({
          variant: "default",
          title: "Items added to cart successfully!",
        });
      }
    },
  });
};

export default useAddMultipleToCartMutation;
