import { z } from "zod";

export const laminateAddToCartFormSchema = z.object({
  quantity: z.array(z.string()),
});

export type LaminateAddToCartFormSchema = z.infer<
  typeof laminateAddToCartFormSchema
>;

export const laminateSearchFormSchema = z.object({
  search: z.string(),
});

export type LaminateSearchFormSchema = z.infer<typeof laminateSearchFormSchema>;
