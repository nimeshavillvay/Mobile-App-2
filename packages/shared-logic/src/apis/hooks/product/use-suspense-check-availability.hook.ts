import { useSuspenseQuery } from "@tanstack/react-query";
import {
  checkAvailability,
  type CheckAvailabilityParams,
} from "~/apis/base/product/check-availability";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseCheckAvailability = (
  config: AuthenticatedApiConfig,
  productDetails: CheckAvailabilityParams,
) => {
  return useSuspenseQuery({
    queryKey: ["product", "availability", productDetails, config],
    queryFn: () => checkAvailability(config, productDetails),
  });
};

export default useSuspenseCheckAvailability;
