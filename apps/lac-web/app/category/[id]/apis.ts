import { api } from "@/_lib/api";
import { notFound } from "next/navigation";
import "server-only";

export const getCategory = async (id: string) => {
  const response = await api
    .get(`pim/webservice/rest/productlandingcategory/${id}`, {
      next: { revalidate: 3600 },
    })
    .json<
      | {
          main: {
            catId: number;
            type: string;
            catTitle: string;
            slug: string;
            description: null;
            cat_top_images: unknown[];
            subCatgores: unknown[];
          };
        }
      | []
    >();

  // If the category is not found, an empty array is returned
  if (Array.isArray(response)) {
    return notFound();
  }

  return response;
};
