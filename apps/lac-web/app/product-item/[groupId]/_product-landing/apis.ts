import { api } from "@/_lib/api";
import "server-only";
import type { Attribute, Variant } from "./type";

export const getVariants = async (groupId: string, sku?: string) => {
  return await api
    .get(`pim/webservice/rest/landingvariant/${groupId}`, {
      searchParams: sku ? new URLSearchParams({ sku }) : undefined,
      next: {
        revalidate: 3600,
      },
    })
    .json<{
      AvailableAttributes: Attribute[];
      items: Variant[];
    }>();
};
