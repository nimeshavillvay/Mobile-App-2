import type {
  Address,
  ApiBillingAddress,
  ApiRequestPayload,
  SAPErrorResponse,
  SuccessResponse,
  UnableToRegisterResponse,
  VerifyAddressResponse,
} from "@/(auth)/register/_components/types";
import { api } from "@/_lib/api";
import { isErrorResponse } from "@/_lib/utils";
import { useToast } from "@repo/web-ui/components/base/molecules/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const isVerifyAddressResponse = (
  data: unknown,
): data is VerifyAddressResponse => {
  return (
    (typeof data === "object" &&
      (data as VerifyAddressResponse).check_type === "ADDRESS") ||
    (data as VerifyAddressResponse).check_type === "SAP"
  );
};

const isSAPErrorResponse = (error: unknown): error is SAPErrorResponse => {
  return (
    typeof error === "object" &&
    typeof (error as SAPErrorResponse)?.check_type === "string" &&
    (error as SAPErrorResponse)?.check_type === "SAP" &&
    (typeof (error as SAPErrorResponse)?.message === "string" ||
      typeof (error as SAPErrorResponse)?.message === "object")
  );
};

function mapRequestPayload(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  type: string;
  company?: string;
  industry?: string;
  employees?: number;
  federalTaxId?: string;
  isExemptFromTax?: boolean;
  username: string;
  billingAddress: Address;
  shippingAddress: Address;
  skipAddressCheck?: boolean;
}): ApiRequestPayload {
  return {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    password: payload.password,
    accountType: payload.type,
    company: payload.company,
    industry: payload.industry,
    employees: payload.employees?.toString() ?? "0",
    federalTaxId: payload.federalTaxId,
    isExemptFromTax: payload.isExemptFromTax,
    userName: payload.username,
    "billing-address": {
      "country-name": payload.billingAddress.country,
      county: payload.billingAddress.county,
      locality: payload.billingAddress.city,
      region: payload.billingAddress.state,
      "street-address": payload.billingAddress.address,
      "street-address-two": payload.billingAddress.addressTwo,
      "postal-code": payload.billingAddress.postalCode,
      zip4: payload.billingAddress.zipCode,
      skip_address_check: payload.skipAddressCheck ?? false,
      "phone-number": payload.phoneNumber,
    } as ApiBillingAddress,
    "shipping-address": {
      "country-name": payload.shippingAddress.country,
      county: payload.shippingAddress.county,
      locality: payload.shippingAddress.city,
      region: payload.shippingAddress.state,
      "street-address": payload.shippingAddress.address,
      "street-address-two": payload.shippingAddress.addressTwo,
      "postal-code": payload.shippingAddress.postalCode,
      zip4: payload.shippingAddress.zipCode,
      skip_address_check: payload.skipAddressCheck ?? false,
      "phone-number": payload.phoneNumber,
    } as ApiBillingAddress,
  };
}

const useRegisterNewUserMutation = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const showGenericErrorMessage = () => {
    toast({
      variant: "destructive",
      title: "Registration failed",
      description:
        "Failed to validate your shipping address. Please correct your entry.",
    });
  };

  return useMutation({
    mutationFn: async (payload: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phoneNumber: string;
      type: string;
      company?: string;
      industry?: string;
      employees?: number;
      federalTaxId?: string;
      billingAddress: Address;
      shippingAddress: Address;
      skipAddressCheck?: boolean;
      isExemptFromTax?: boolean;
      username: string;
    }) => {
      const mappedPayload = mapRequestPayload(payload);

      const response = await api
        .post("rest/register/new", {
          json: mappedPayload,
        })
        .json<
          SuccessResponse | UnableToRegisterResponse | VerifyAddressResponse
        >();

      return response;
    },
    onError: async (error) => {
      if (error?.response?.status === 400) {
        const errorResponse = await error.response.json();

        if (isErrorResponse(errorResponse)) {
          showGenericErrorMessage();
        } else if (isSAPErrorResponse(errorResponse)) {
          if (typeof errorResponse.message === "string") {
            toast({
              variant: "destructive",
              title: "Registration failed",
              description: errorResponse.message,
            });
          } else {
            showGenericErrorMessage();
          }
        }
      }
    },
    onSuccess: (response) => {
      if (!isVerifyAddressResponse(response)) {
        // Revalidate the queries only after the user has successfully registered
        queryClient.invalidateQueries();
      }
    },
  });
};

export default useRegisterNewUserMutation;
