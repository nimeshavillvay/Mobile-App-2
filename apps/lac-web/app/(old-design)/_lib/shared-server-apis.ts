import "server-only";
import { api } from "./api";
import { DEFAULT_REVALIDATE } from "./constants";
import type { Role } from "./types";

export const getBreadcrumbs = async (
  id: string,
  type: "product" | "category",
) => {
  return await api
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

export const getJobRoles = async () => {
  return await api
    .get("am/registration/get-roles", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{ roles: Role[] }>();
};