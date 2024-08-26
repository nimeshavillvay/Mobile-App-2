import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartConfiguration } from "~/apis/base/cart/update-cart-configuration";
import type { AuthenticatedApiConfig } from "~/lib/types";
import { type Cart } from "~/lib/zod-schema/cart";

const useUpdateCartConfigurationMutation = (config: AuthenticatedApiConfig) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      configuration: Parameters<typeof updateCartConfiguration>[1],
    ) => updateCartConfiguration(config, configuration),
    onMutate: async (fields) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["cart", config] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(["cart", config]);

      // Optimistically update to the new value
      queryClient.setQueryData(["cart", config], (old: unknown) => {
        // We can't use `structuredClone` here because it wasn't supported in
        // React Native as of implementing this hook
        const newCart = JSON.parse(JSON.stringify(old));

        if (isCart(newCart)) {
          newCart.configuration = {
            ...newCart.configuration,
            ...fields,
          };
        }

        return newCart;
      });

      // Return a context object with the snapshotted value
      return {
        previousCart,
      };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_error, _fields, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", config], context.previousCart);
      }

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useUpdateCartConfigurationMutation;

const isCart = (data: unknown): data is Cart => {
  return (
    typeof data === "object" &&
    (data as Cart).cartItems !== undefined &&
    Array.isArray((data as Cart).cartItems) &&
    typeof (data as Cart).configuration === "object" &&
    typeof (data as Cart)["total-quantity"] === "number"
  );
};
