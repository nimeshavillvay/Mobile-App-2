import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Address } from "./types";

type AddressResponse = {
  "xc-addressid": string;
  "country-name": string;
  county: string;
  locality: string;
  organization: string;
  "phone-number": string;
  region: string;
  "street-address": string;
  "postal-code": string;
  zip4: string;
  soldto: string;
};

const transformAddress = (address: AddressResponse): Address => ({
  xcAddressId: address["xc-addressid"],
  countryName: address["country-name"],
  county: address["county"],
  locality: address["locality"],
  organization: address["organization"],
  phoneNumber: address["phone-number"],
  region: address["region"],
  streetAddress: address["street-address"],
  postalCode: address["postal-code"],
  zip4: address["zip4"],
  soldTo: address["soldto"],
});

const useSuspenseBillingAddressList = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["my-account", "billing-addresses", token],
    queryFn: () =>
      api
        .get("rest/my-account/billing-address", {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .json<AddressResponse>(),

    select: (billingAddress: AddressResponse) =>
      transformAddress(billingAddress),
  });
};

export default useSuspenseBillingAddressList;
