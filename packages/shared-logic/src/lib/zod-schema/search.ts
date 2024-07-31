import { z } from "zod";

export const searchSchema = z.object({
  summary: z.object({
    total: z.number(),
    page_size: z.number(),
    page_no: z.number(),
    plp: z.boolean(),
    searchParams: z.string().optional(),
  }),
  results: z.object({
    brandName: z.string(),
    id: z.string(),
    lastUpdatedDate: z.string().nullable(),
    MFRPartNo: z.string(),
    sellingBookSequenceNo: z.string(),
    UPCCode: z.string(),
    alias: z.string(),
    materialNumber: z.string(),
    productTitle: z.string(),
    Status: z.string(),
    productStatus: z.string(),
    createDate: z.string(),
    keywords: z.string(),
    minimumOrderQuantity: z.string(),
    orderQuantityByIncrements: z.string(),
    categoryPath: z.string(),
    categoryName: z.string(),
    attributes: z.array(z.string()).nullable(),
    itemImage: z.string(),
    slug: z.string(),
    uom: z.string().optional(),
    groupId: z.string().optional(),
    categoryId: z.string().optional(),
    categorySlug: z.string().optional(),
    brandId: z.string().optional(),
    brandSlug: z.string().optional(),
  }),
});