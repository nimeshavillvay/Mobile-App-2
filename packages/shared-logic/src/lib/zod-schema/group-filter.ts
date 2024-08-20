import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string().or(z.null()),
  selected: z.boolean(),
  productid: z.number().or(z.boolean()).or(z.null()).optional(),
  slug: z.string().or(z.null()).optional(),
});

export const groupFilterSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.enum(["text", "icon"]),
  values: z.array(productVariantSchema),
});
