import { useSuspenseQuery } from "@tanstack/react-query";
import "client-only";
import { getWillCallPlant } from "~/apis/base/account/get-will-call-plant";
import type { AuthenticatedApiConfig } from "~/lib/types";

const useSuspenseWillCallPlant = (config: AuthenticatedApiConfig) => {
  return useSuspenseQuery({
    queryKey: ["user", "will-call-plant", config],
    queryFn: () => getWillCallPlant(config),
  });
};

export default useSuspenseWillCallPlant;
