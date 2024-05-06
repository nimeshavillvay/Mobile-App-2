import { api } from "@/_lib/api";
import { useToast } from "@/old/_components/ui/use-toast";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressCheckSuggestions, AddressFormData } from "./types";

const useUpdateBillingAddressMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (billingAddressFormData: AddressFormData) =>
      api
        .put("rest/my-account/billing-address", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: {
            "country-name": billingAddressFormData.country,
            county: billingAddressFormData.county,
            locality: billingAddressFormData.city,
            organization: billingAddressFormData.company,
            "phone-number": billingAddressFormData.phoneNumber,
            region: billingAddressFormData.state,
            "street-address": billingAddressFormData.addressLineOne,
            "postal-code": billingAddressFormData.zipCode,
            // TODO: i think we should pass zip4, but if we pass zip 4, the UPS check will not take place
            // zip4: billingAddressFormData.zip4,
            ...(billingAddressFormData.skipAddressCheck !== undefined && {
              skip_address_check: billingAddressFormData.skipAddressCheck,
            }),
          },
        })
        .json<AddressCheckSuggestions>(),
    onMutate: () => {
      toast({ description: "Updating billing address" });
    },
    onSuccess: () => {
      toast({
        description: "Billing address updated",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update the billing address",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "billing-addresses"],
      });
    },
  });
};

export default useUpdateBillingAddressMutation;
