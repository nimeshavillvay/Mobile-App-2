import type { Category } from "@/_lib/types";
import { api } from "./api";

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
        revalidate: 3600,
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

export const getCategories = async () => {
  return await api
    .get("pim/webservice/rest/getcategorylist", { next: { revalidate: 3600 } })
    .json<Category[]>();
};
