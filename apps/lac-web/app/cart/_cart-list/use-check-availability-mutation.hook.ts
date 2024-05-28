import { checkAvailability } from "@/_lib/apis/shared";
import type { AvailabilityParameters, Token } from "@/_lib/types";
import { useMutation } from "@tanstack/react-query";

const useCheckAvailabilityMutation = (token: Token) => {
  return useMutation({
    mutationFn: async ({ productId, qty, plant }: AvailabilityParameters) => {
      return await checkAvailability(token, { productId, qty, plant });
    },
  });
};

export default useCheckAvailabilityMutation;
