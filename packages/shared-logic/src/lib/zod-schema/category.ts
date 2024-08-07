import { z } from "zod";

export const featuredCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  shortcode: z.string(),
  item_count: z.string(),
  direct_item_count: z.string(),
  img: z.union([z.string(), z.null()]),
});
export type FeaturedCategory = z.infer<typeof featuredCategorySchema>;
