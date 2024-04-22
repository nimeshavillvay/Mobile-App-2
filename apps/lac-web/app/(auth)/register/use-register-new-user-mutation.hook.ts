import { api } from "@/_lib/api";
import { useMutation } from "@tanstack/react-query";

type Address = {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  zipCode?: string;
};

const useRegisterNewUserMutation = () => {
  return useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
      type,
      billingAddress,
      shippingAddress,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      type: string;
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
            "billing-address": {
              "street-address": billingAddress.address,
              locality: billingAddress.city,
              region: billingAddress.state,
              "country-name": billingAddress.country,
              "postal-code": billingAddress.postalCode,
              zip4: billingAddress.zipCode ?? "",
            },
            "shipping-address": {
              "street-address": shippingAddress.address,
              locality: shippingAddress.city,
              region: shippingAddress.state,
              "country-name": shippingAddress.country,
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
