import { api } from "@/_lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Address = {
  address: string;
  city: string;
  country: string;
  state: string;
  county: string;
  postalCode: string;
  zipCode?: string;
};

const useRegisterNewUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
      type,
      company = "",
      industry = "",
      employees = 0,
      billingAddress,
      shippingAddress,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      type: string;
      company?: string;
      industry?: string;
      employees?: number;
      billingAddress: Address;
      shippingAddress: Address;
    }) => {
      const response = await api
        .post("rest/register/new", {
          json: {
            firstName,
            lastName,
            email,
            password,
            accountType: type,
            company,
            industry,
            employees: employees.toString(),
            "billing-address": {
              "country-name": billingAddress.country,
              county: billingAddress.county,
              locality: billingAddress.city, // TODO Verify field
              organization: company, // TODO Verify field
              "phone-number": "244234", // TODO Verify field
              region: billingAddress.state,
              "street-address": billingAddress.address,
              "postal-code": billingAddress.postalCode,
              zip4: billingAddress.zipCode ?? "",
            },
            "shipping-address": {
              "country-name": shippingAddress.country,
              county: shippingAddress.county,
              locality: billingAddress.city, // TODO Verify field
              organization: company, // TODO Verify field
              "phone-number": "244234", // TODO Verify field
              region: shippingAddress.state,
              "street-address": shippingAddress.address,
              "postal-code": shippingAddress.postalCode,
              zip4: shippingAddress.zipCode ?? "",
            },
          },
        })
        .json<
          SuccessResponse | UnableToRegisterResponse | VerifyAddressResponse
        >();

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export default useRegisterNewUserMutation;

type SuccessResponse = {
  status_code: "OK";
  type: string;
  id: number;
};
type UnableToRegisterResponse = {
  check_type: string;
  message: string;
  suggestions: unknown[];
};

export type ResponseAddress = {
  "country-name": string;
  county: null;
  locality: string;
  region: string;
  "street-address": string;
  "postal-code": string;
  zip4: string;
};
type VerifyAddressResponse = {
  check_type: "ADDRESS" | "SAP";
  message: string;
  suggestions: {
    "billing-address": ResponseAddress[];
    "shipping-address": ResponseAddress[];
  };
};

export const isVerifyAddressResponse = (
  data: unknown,
): data is VerifyAddressResponse => {
  if (
    typeof data === "object" &&
    ((data as VerifyAddressResponse).check_type === "ADDRESS" ||
      (data as VerifyAddressResponse).check_type === "SAP")
  ) {
    return true;
  }

  return false;
};
