import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShippingAddress } from "./types";

const transformAddress = (address: any): ShippingAddress => ({
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
            "Content-Type": "application/json",
          },
        })
        .json(),

    select: (addresses: any) => {
      const mappedAddresses = addresses.map(transformAddress);
      return mappedAddresses;
    },
  });
};

export default useSuspenseShippingAddressList;
