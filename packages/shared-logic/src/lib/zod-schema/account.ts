import { z } from "zod";

export const addressSchema = z.object({
  "address-id": z.string(),
  "xc-addressid": z.string(),
  name: z.string(),
  "street-address": z.string(),
  locality: z.string(),
  region: z.string(),
  "postal-code": z.string(),
  county: z.string(),
  "country-name": z.string(),
  plant: z.string().nullable().optional(),
  route_info: z
    .object({
      route: z.string().nullable(),
      routeName: z.string(),
      monday: z.boolean(),
      tuesday: z.boolean(),
      wednesday: z.boolean(),
      thursday: z.boolean(),
      friday: z.boolean(),
    })
    .optional(),
  "phone-no": z.string().optional(),
});

export const accountListSchema = z.object({
  accounts: z.array(
    z.object({
      isAssociate: z.boolean(),
      name: z.string(),
      "account-no": z.string(),
      addresses: z.array(addressSchema),
      "billing-address": addressSchema,
    }),
  ),
  "given-name": z.string(),
  "family-name": z.string(),
  isOsr: z.boolean(),
  membershipid: z.number(),
  account_id: z.string(),
  accountType: z.string(),
  sales_rep: z.union([
    z.object({
      fullname: z.string(),
      img: z.string(),
      message: z.string(),
      phone: z.string(),
      title: z.string(),
      email: z.string(),
    }),
    z.array(z.unknown()).length(0),
    z.object({}),
  ]),
});
