import { z } from "zod";
import { api } from "~/lib/api";
import type { SearchApiConfig } from "~/lib/types";
import { productStatusSchema } from "~/lib/zod-schema/product";

const searchResultSchema = z.object({
  brandName: z.string().optional(),
  id: z.number(),
  lastUpdatedDate: z.number().optional(),
  MFRPartNo: z.string(),
  sellingBookSequenceNo: z.number(),
  UPCCode: z.string(),
  alias: z.string(),
  materialNumber: z.string(),
  productTitle: z.string(),
  Status: z.string().optional(),
  productStatus: productStatusSchema,
  createDate: z.number(),
  keywords: z.string(),
  minimumOrderQuantity: z.string(),
  orderQuantityByIncrements: z.string(),
  categoryPath: z.string(),
  categoryName: z.string(),
  attributes: z.array(z.string()).optional(),
  itemImage: z.string(),
  slug: z.string(),
  uom: z.string().optional(),
  groupId: z.string().optional(),
  categoryId: z.string().optional(),
  categorySlug: z.string().optional(),
  brandId: z.string().optional(),
  brandSlug: z.string().optional(),
  is_new: z.string().optional(),
  on_sale: z.string().optional(),
});

const searchDataSchema = z.object({
  summary: z.object({
    total: z.number(),
    pageSize: z.number(),
    pageNo: z.number(),
    plp: z.boolean(),
    searchParams: z.string().optional(),
  }),
  results: z.array(searchResultSchema).or(searchResultSchema),
});

export const getSearchResults = async (
  { baseUrl }: SearchApiConfig,
  {
    query,
    pageNo = 1,
    searchParams,
  }: { query: string; pageNo?: number; searchParams?: string },
) => {
  const response = await api
    .get("search", {
      prefixUrl: baseUrl,
      searchParams: new URLSearchParams({
        pageNo: pageNo.toString(),
        query,
        isFilterByBrand: "false",
        pageSize: "24",
      }),
      headers: {
        searchParams: searchParams,
      },
      cache: "no-store",
    })
    .json();

  return await searchDataSchema.parseAsync(response);
};
