import "server-only";
import { api } from "../api";
import { DEFAULT_REVALIDATE } from "../constants";

export const getBreadcrumbs = async (
  id: string,
  type: "product" | "category",
) => {
  // TODO Remove try/catch block and placeholder data when real API is ready
  try {
    return await api
      .get("rest/breadcrumbs", {
        searchParams: new URLSearchParams({
          [type === "product" ? "productId" : "catId"]: id,
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
  } catch {
    return [
      {
        oo_id: "113",
        cat_name: "Woodworking and Shop Supplies",
        slug: "woodworking-and-shop-supplies",
      },
      {
        oo_id: "183",
        cat_name: "Drawer Slides & Systems",
        slug: "drawer-slides-and-systems",
      },
      {
        oo_id: "184",
        cat_name: "Drawer Slides",
        slug: "drawer-slides-c-696",
      },
      {
        oo_id: "185",
        cat_name: "Ball Bearing Slides",
        slug: "ball-bearing-slides",
      },
    ];
  }
};
