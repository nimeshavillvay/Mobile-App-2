import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";

const shippingAddressSchema = z.object({
  "xc-addressid": z.string(),
  "country-name": z.string(),
  county: z.string(),
  locality: z.string(),
  organization: z.string(),
  "phone-number": z.string(),
  region: z.string(),
  "street-address": z.string(),
  "postal-code": z.string(),
  zip4: z.string(),
  "ship-to": z.string(),
  default: z.boolean(),
  default_shipping: z.union([z.string(), z.boolean()]),
  route_info: z.object({
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    route: z.string().nullable(),
    routeName: z.string(),
  }),
});
const addressResponseSchema = z.array(shippingAddressSchema);

export type ShippingAddress = {
  xcAddressId: string;
  countryName: string;
  county: string;
  locality: string;
  organization: string;
  phoneNumber: string;
  region: string;
  streetAddress: string;
  postalCode: string;
  zip4: string;
  shipTo: string;
  default: boolean;
  defaultShipping: string | boolean;
  routeInfo: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    route: string | null;
    routeName: string;
  };
};

const mapShippingAddressResponse = (
  address: z.infer<typeof shippingAddressSchema>,
) => {
  return {
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
    defaultShipping: address["default_shipping"],
    routeInfo: address.route_info,
  } satisfies ShippingAddress;
};

export const getShippingAddresses = async ({
  baseUrl,
  apiKey,
  token,
}: AuthenticatedApiConfig) => {
  const response = await api
    .get("rest/my-account/shipping-address", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  const parsedResponse = await addressResponseSchema.parseAsync(response);

  return parsedResponse.map(mapShippingAddressResponse);
};
