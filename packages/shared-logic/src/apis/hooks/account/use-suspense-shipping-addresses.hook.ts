import { useSuspenseQuery } from "@tanstack/react-query";
import { getShippingAddresses } from "~/apis/base/account/get-shipping-addresses";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseShippingAddresses = (config: AuthenticatedApiConfig) => {
  return useSuspenseQuery({
    queryKey: ["user", "shipping-addresses", config],
    queryFn: () => getShippingAddresses(config),
  });
};

export default useSuspenseShippingAddresses;
