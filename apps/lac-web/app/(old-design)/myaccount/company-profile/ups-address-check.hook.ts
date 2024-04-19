import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BillingAddress } from "./types";

const transformAddress = (address: any): BillingAddress => ({
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
        .json(),

    select: (billingAddress: any) => transformAddress(billingAddress),
  });
};

export default useSuspenseBillingAddressList;
