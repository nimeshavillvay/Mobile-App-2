import "server-only";
import { api } from "./api";
import { DEFAULT_REVALIDATE } from "./constants";

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
