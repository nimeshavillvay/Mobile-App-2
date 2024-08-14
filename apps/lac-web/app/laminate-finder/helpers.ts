import { z } from "zod";

export const laminateAddToCartFormSchema = z.object({
  quantity: z.array(z.string()),
  productId: z.array(z.string()),
  sku: z.array(z.string()),
});

export type LaminateAddToCartFormSchema = z.infer<
  typeof laminateAddToCartFormSchema
>;

export const edgeBandingAddToCartFormSchema = z.object({
  bandQuantity: z.array(z.string()),
});

export type EdgeBandingAddToCartFormSchema = z.infer<
  typeof edgeBandingAddToCartFormSchema
>;

export const laminateSearchFormSchema = z.object({
  search: z.string(),
});

export type LaminateSearchFormSchema = z.infer<typeof laminateSearchFormSchema>;
