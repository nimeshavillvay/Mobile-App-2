import { useSuspenseQuery } from "@tanstack/react-query";
import { getShippingMethods } from "~/apis/base/cart/get-shipping-methods";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseShippingMethods = (config: AuthenticatedApiConfig) => {
  return useSuspenseQuery({
    queryKey: ["cart", "shipping-methods", config],
    queryFn: () => getShippingMethods(config),
  });
};

export default useSuspenseShippingMethods;
