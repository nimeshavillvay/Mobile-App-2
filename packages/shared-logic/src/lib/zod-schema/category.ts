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

export const productLandingCategorySchema = z.object({
  main: z.object({
    catId: z.string(),
    type: z.string(),
    catTitle: z.string(),
    description: z.string(),
    additional_description: z.string(),
    Image: z.string().nullable(),
    slug: z.string(),
    subCatgores: z.array(
      z.object({
        SubCatId: z.string(),
        SubCatTitle: z.string(),
        slug: z.string(),
        Image: z.string(),
      }),
    ),
  }),
});
export type ProductLandingCategory = z.infer<
  typeof productLandingCategorySchema
>;
