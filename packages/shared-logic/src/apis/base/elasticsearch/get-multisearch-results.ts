import { z } from "zod";
import { api } from "~/lib/api";
import type { SearchApiConfig } from "~/lib/types";

const productResultSchema = z.object({
  brandName: z.string().optional(),
  id: z.number(),
  lastUpdatedDate: z.number().optional(),
  MFRPartNo: z.string(),
  sellingBookSequenceNo: z.number(),
  UPCCode: z.string(),
  alias: z.string(),
  materialNumber: z.string(),
  productTitle: z.string(),
  status: z.string().optional(),
  productStatus: z.string(),
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

const categoryResultSchema = z.object({
  id: z.number(),
  categoryName: z.string(),
  categoryPath: z.string(),
  slug: z.string(),
  lastUpdatedDate: z.number().optional(),
  parentCategoryList: z.string().optional(),
  subCategoryList: z.string().optional(),
});

const brandResultSchema = z.object({
  id: z.number(),
  brandName: z.string(),
  brandImage: z.string().optional(),
  slug: z.string(),
  lastUpdatedDate: z.number().optional(),
});

export const productDataSchema = z.object({
  summary: z.object({
    total: z.number(),
    plp: z.boolean(),
  }),
  results: z.array(productResultSchema),
});

export const categoryDataSchema = z.object({
  summary: z.object({
    total: z.number(),
  }),
  results: z.array(categoryResultSchema),
});

export const brandDataSchema = z.object({
  summary: z.object({
    total: z.number(),
  }),
  results: z.array(brandResultSchema),
});

const multisearchResultSchema = z.object({
  products: productDataSchema,
  categories: categoryDataSchema,
  brands: brandDataSchema,
});

export const getMultisearchResults = async (
  { baseUrl }: SearchApiConfig,
  query: string,
) => {
  const response = await api
    .get("multisearch", {
      prefixUrl: baseUrl,
      searchParams: new URLSearchParams({
        query,
      }),
      cache: "no-store",
    })
    .json();

  return await multisearchResultSchema.parseAsync(response);
};
