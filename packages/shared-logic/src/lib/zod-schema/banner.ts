import { z } from "zod";

export const bannerSchema = z.object({
  "banner-id": z.string(),
  priority: z.string(),
  banners: z.array(
    z.object({
      id: z.string(),
      slot: z.string(),
      class: z.string(),
      "data-descr": z.string(),
      active: z.number(),
      alt_tag: z.string(),
      priority: z.string(),
      html_content: z.string(),
      pdf_file_name: z.string(),
      pdf_file_path: z.string(),
      use_custom_link: z.number(),
      custom_url: z.string(),
      file_name: z.string(),
      file_path: z.string(),
      mobile_file_name: z.string(),
      mobile_file_path: z.string().nullable(),
    }),
  ),
});
export type Banner = z.infer<typeof bannerSchema>;
export const bannersResponseSchema = z.object({
  B: z.array(bannerSchema),
  H: z.array(bannerSchema).optional(),
  T: z.array(bannerSchema),
});
