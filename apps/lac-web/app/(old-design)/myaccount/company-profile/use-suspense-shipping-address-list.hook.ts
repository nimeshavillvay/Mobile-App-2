import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Address } from "./types";

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
  "ship-to": string;
  default: boolean;
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
  shipTo: address["ship-to"],
  default: address["default"],
});

const useSuspenseShippingAddressList = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["my-account", "shipping-addresses", token],
    queryFn: () =>
      api
        .get("rest/my-account/shipping-address", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .json<AddressResponse[]>(),

    select: (addresses: AddressResponse[]) => {
      const mappedAddresses = addresses.map(transformAddress);
      return mappedAddresses;
    },
  });
};

export default useSuspenseShippingAddressList;
