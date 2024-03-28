import { api } from "@/old/_lib/api";
import { DEFAULT_REVALIDATE } from "@/old/_lib/constants";
import { notFound } from "next/navigation";
import "server-only";

export const getCategory = async (id: string, slug: string) => {
  const response = await api
    .get(`pim/webservice/rest/productlandingcategory/${id}`, {
      next: { revalidate: DEFAULT_REVALIDATE },
    })
    .json<
      | {
          main: {
            catId: number;
            type: string;
            catTitle: string;
            slug: string;
            description: string | null;
            cat_top_images: unknown[];
            subCatgores: {
              SubCatId: number;
              SubCatTitle: string;
              slug: string;
              Image: string;
            }[];
          };
        }
      | []
    >();

  // Redirect to not found for the following
  // 1. If the category is not found (an empty array is returned)
  // 2. Slug does not match
  if (Array.isArray(response) || response.main.slug !== slug) {
    return notFound();
  }

  return response;
};
