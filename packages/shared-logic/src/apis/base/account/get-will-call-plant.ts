import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";

const willCallPlantSchema = z.object({
  plant: z.string(),
  name: z.string(),
  address: z
    .object({
      "country-name": z.string(),
      locality: z.string(),
      "phone-number": z.string(),
      region: z.string(),
      "street-address": z.string(),
      "postal-code": z.string(),
    })
    .optional(),
  operation_hours: z.string().optional(),
  gmap: z.string().optional(),
});

export const getWillCallPlant = async ({
  baseUrl,
  apiKey,
  token,
}: Omit<AuthenticatedApiConfig, "token"> & {
  token?: string;
}) => {
  const response = await api
    .get("rest/my-account/will-call-plant", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  const parsedResponse = await willCallPlantSchema.parseAsync(response);

  return {
    plantCode: parsedResponse.plant,
    plantName: parsedResponse.name,
    address: {
      countryName: parsedResponse.address?.["country-name"],
      locality: parsedResponse.address?.locality,
      phoneNumber: parsedResponse.address?.["phone-number"],
      region: parsedResponse.address?.region,
      streetAddress: parsedResponse.address?.["street-address"],
      postalCode: parsedResponse.address?.["postal-code"],
    },
    operationHours: parsedResponse.operation_hours,
    gmap: parsedResponse.gmap,
  };
};
