import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { api } from "@/old/_lib/api";
import { notFound } from "next/navigation";
import "server-only";
import type { Product } from "./types";

export const getProduct = async (groupId: string, sku?: string) => {
  const response = await api
    .get(`pim/webservice/rest/landinginfo/${groupId}`, {
      searchParams: sku
        ? new URLSearchParams({
            sku,
          })
        : undefined,
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<Product | []>();

  // If the product is not found, an empty array is returned
  if (Array.isArray(response)) {
    return notFound();
  }

  return response;
};
