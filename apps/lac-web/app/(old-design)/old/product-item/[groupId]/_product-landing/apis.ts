import { api } from "@/old/_lib/api";
import { DEFAULT_REVALIDATE } from "@/old/_lib/constants";
import "server-only";
import type { Attribute, Variant } from "./types";

export const getVariants = async (groupId: string, sku?: string) => {
  return await api
    .get(`pim/webservice/rest/landingvariant/${groupId}`, {
      searchParams: sku ? new URLSearchParams({ sku }) : undefined,
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      AvailableAttributes: Attribute[];
      items: Variant[];
    }>();
};
