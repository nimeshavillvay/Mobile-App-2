// TODO: To be removed after migration
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import "server-only";
import { api } from "./api";

export const getBreadcrumbs = async (
  id: string,
  type: "product" | "category",
) => {
  const response = await api
    .get("pim/webservice/rest/breadcrumbs", {
      searchParams: new URLSearchParams({
        [type === "product" ? "group_id" : "catId"]: id,
      }),
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<
      {
        oo_id: number;
        cat_name: string;
        slug: string;
      }[]
    >();

  return response.map((item) => ({
    id: Number(item.oo_id),
    categoryName: item.cat_name,
    slug: item.slug,
  }));
};

export const getSitemapData = async () => {
  return await api
    .get("pim/webservice/rest/sitemap", {
      cache: "no-store",
    })
    .json<{
      siteMapProducts: {
        sku: string;
        groupId: string;
      }[];
      siteMapCategories: {
        parentCatName: null | string;
        subCatName: string;
        catId: number;
      }[];
    }>();
};
