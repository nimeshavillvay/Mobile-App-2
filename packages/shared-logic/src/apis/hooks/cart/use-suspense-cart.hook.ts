import { useSuspenseQuery } from "@tanstack/react-query";
import { getSimulationCheckout } from "~/apis/base/cart/get-cart";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseCart = (config: AuthenticatedApiConfig) => {
  return useSuspenseQuery({
    queryKey: ["cart", config],
    queryFn: () => getSimulationCheckout(config),
  });
};

export default useSuspenseCart;
