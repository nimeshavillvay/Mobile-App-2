import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";
import {
  permissionSchema,
  statusSchema,
  type Permission,
} from "~/lib/zod-schema/misc";

const contactSchema = z.object({
  id: z.string(),
  status: statusSchema,
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  role: z.string(),
  role_description: z.string(),
  permission: permissionSchema,
  sold_to_status: statusSchema,
});
const manageContactSchema = z.object({
  manage_contact: z.object({
    your_profile: contactSchema,
    contact_list: z.array(contactSchema),
  }),
});

export type MappedContact = {
  id: number;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  roleDescription: string;
  permission: Permission;
  soldToAccountStatus: string;
};

const mapContact = (contact: z.infer<typeof contactSchema>) => ({
  id: Number(contact.id),
  status: contact.status,
  firstName: contact.first_name,
  lastName: contact.last_name,
  email: contact.email,
  role: contact.role,
  roleDescription: contact.role_description,
  permission: contact.permission,
  soldToAccountStatus: contact.sold_to_status,
});

export const getUser = async ({
  baseUrl,
  apiKey,
  token,
}: AuthenticatedApiConfig) => {
  const response = await api
    .get("rest/my-account/users", {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "X-AUTH-TOKEN": apiKey,
      },
      cache: "no-store",
    })
    .json();

  const parsedResponse = await manageContactSchema.parseAsync(response);

  return {
    manageContact: {
      yourProfile: mapContact(parsedResponse.manage_contact.your_profile),
      contactList: parsedResponse.manage_contact.contact_list.map(mapContact),
    },
  };
};
