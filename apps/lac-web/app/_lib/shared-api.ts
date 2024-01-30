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
    .json<
      {
        id: number;
        name: string;
        slug: string;
        shortcode: string;
        item_count: number;
        img: null | string;
        subcategory: {
          subid: number;
          name: string;
          slug: string;
          shortcode: null;
          item_count: number;
          subsubcategory?: {
            subsubid: number;
            subsubname: string;
            slug: string;
            subsubshortcode: null;
            item_count: number;
          }[];
        }[];
      }[]
    >();
};
