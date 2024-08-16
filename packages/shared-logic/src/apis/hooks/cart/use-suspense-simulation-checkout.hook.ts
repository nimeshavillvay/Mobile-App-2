import { useSuspenseQuery } from "@tanstack/react-query";
import { getSimulationCheckout } from "~/apis/base/cart/get-simulation-checkout";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseSimulationCheckout = (config: AuthenticatedApiConfig) => {
  return useSuspenseQuery({
    queryKey: ["cart", "simulation-checkout", config],
    queryFn: () => getSimulationCheckout(config),
  });
};

export default useSuspenseSimulationCheckout;
