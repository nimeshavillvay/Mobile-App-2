import { api } from "@/_lib/api";
import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressFormData } from "./types";

const useUpdateShippingAddressMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (shippingAddressFormData: AddressFormData) =>
      api
        .put("rest/my-account/shipping-address", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: shippingAddressFormData.default
            ? {
                "ship-to": shippingAddressFormData.shipTo,
                default: true,
              }
            : {
                "ship-to": shippingAddressFormData.shipTo,
                region: shippingAddressFormData.state,
                locality: shippingAddressFormData.city,
                organization: shippingAddressFormData.company,
                "postal-code": shippingAddressFormData.zipCode,
                "phone-number": shippingAddressFormData.phoneNumber,
                "street-address": shippingAddressFormData.addressLineOne,
                default: shippingAddressFormData.default,
              },
        })
        .json<unknown>(),
    onMutate: () => {
      toast({ description: "Updating shipping address" });
    },
    onSuccess: () => {
      toast({
        description: "Shipping address updated",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update the shipping address",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shipping-addresses"],
      });
    },
  });
};

export default useUpdateShippingAddressMutation;
