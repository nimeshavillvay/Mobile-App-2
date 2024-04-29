import "server-only";
import { api } from "../api";
import { DEFAULT_REVALIDATE } from "../constants";
import type { PasswordPolicies } from "../types";

export const getBreadcrumbs = async (
  id: string,
  type: "product" | "category",
) => {
  // TODO Remove try/catch block and placeholder data when real API is ready
  try {
    const response = await api
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

    return response.map((item) => ({
      id: Number(item.oo_id),
      categoryName: item.cat_name,
      slug: item.slug,
    }));
  } catch {
    return [
      {
        id: "113",
        categoryName: "Woodworking and Shop Supplies",
        slug: "woodworking-and-shop-supplies",
      },
      {
        id: "183",
        categoryName: "Drawer Slides & Systems",
        slug: "drawer-slides-and-systems",
      },
      {
        id: "184",
        categoryName: "Drawer Slides",
        slug: "drawer-slides-c-696",
      },
      {
        id: "185",
        categoryName: "Ball Bearing Slides",
        slug: "ball-bearing-slides",
      },
    ];
  }
};

type Banner = {
  "banner-id": string;
  priority: string;
  banners: {
    id: string;
    slot: string;
    class: string;
    "data-descr": string;
    active: number;
    alt_tag: string;
    priority: string;
    html_content: string;
    pdf_file_name: string;
    pdf_file_path: string;
    use_custom_link: number;
    custom_url: string;
    file_name: string;
    file_path: null | string;
    mobile_file_name: string;
    mobile_file_path: null | string;
  }[];
};
export const getBanners = async (categoryId: string) => {
  return await api
    .get("rest/banners", {
      searchParams: {
        categoryid: categoryId,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      B: Banner[];
      T: Banner[];
    }>();
};

export const getFeaturedProducts = async () => {
  return await api
    .get("rest/getfeatureproducts", {
      next: { revalidate: DEFAULT_REVALIDATE },
    })
    .json<{
      bestsellers: unknown[];
      featured: unknown[];
      new: unknown[];
      on_sale: {
        productTitle: string;
        txt_description_name: string;
        txt_mfn: string;
        txt_hazardous: "Y" | "N";
        txt_web_direct: "Y" | "N";
        txt_special_shipping: string;
        groupId: number | string;
        productId: string;
        group_img: string;
        product_img: string;
        sku: string;
        txt_uom: "Pair" | "Each";
        txt_uom_label: "Pair" | "Each";
        is_sale: boolean;
        is_new: boolean;
        min_order_amount: string;
        order_qty_increments: string;
        brandId: string;
        brandName: string;
        categoryId: string;
        categoryName: string;
        subCategoryId: string;
        subCategoryName: string;
      }[];
      quick_ship: unknown[];
    }>();
};

export const getJobRoles = async () => {
  return await api
    .get("rest/get-roles", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<{
      roles: {
        code: string;
        description: string;
      }[];
    }>();
};

export const getPasswordPolicies = async (): Promise<PasswordPolicies> => {
  const response = await api
    .get("rest/passwordpolicy", {
      next: { revalidate: DEFAULT_REVALIDATE },
    })
    .json<{
      success: boolean;
      message: string;
      error_code: number;
      data: {
        passwordPolicies: {
          code: string;
          value: string;
          desc: string;
        }[];
      };
    }>();

  const minimumLength =
    response.data.passwordPolicies.find(
      (policy) => policy.code === "MIN_CHAR_LEN",
    )?.value ?? "1";
  const minimumNumbers =
    response.data.passwordPolicies.find(
      (policy) => policy.code === "MIN_NUMBER",
    )?.value ?? "1";
  const minimumAlphabets =
    response.data.passwordPolicies.find(
      (policy) => policy.code === "MIN_CHAR_Cha_LEN",
    )?.value ?? "1";

  return {
    minimumLength: !isNaN(parseInt(minimumLength))
      ? parseInt(minimumLength)
      : 1,
    minimumNumbers: !isNaN(parseInt(minimumNumbers))
      ? parseInt(minimumNumbers)
      : 0,
    minimumAlphabets: !isNaN(parseInt(minimumAlphabets))
      ? parseInt(minimumNumbers)
      : 0,
  };
};
