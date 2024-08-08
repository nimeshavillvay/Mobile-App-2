import { z } from "zod";
import { api } from "~/lib/api";
import type { AuthenticatedApiConfig } from "~/lib/types";
import { paginationSchema } from "~/lib/zod-schema/misc";

const searchResultSchema = z.object({
  group_list: z.array(
    z.object({
      groupid: z.string(),
      type: z.string(),
      item_group_name: z.string(),
      slug: z.string(),
      brandName: z.string(),
      brandid: z.string(),
      group_img: z.string(),
      compliance_flags: z.string(),
      fclassid: z.string(),
      txt_meta_title: z.string().optional(),
      itemSkuList: z.array(
        z.object({
          productid: z.string(),
          is_product_exclude: z.boolean(),
          txt_wurth_lac_item: z.string(),
          item_name: z.string(),
          img: z.string(),
          slug: z.string(),
          is_favourite: z.boolean(),
          is_comparison: z.boolean(),
          "SKU-attribute": z.string(),
          txt_hazardous: z.string(),
          txt_sap: z.string(),
          txt_mfn: z.string(),
          txt_description_name: z.string().nullable(),
          txt_sub_description: z.string().nullable(),
          sel_assigned_brand: z.string(),
          txt_uom_label: z.string(),
          txt_box_qt: z.string(),
          txt_min_order_amount: z.string(),
          txt_order_qty_increments: z.string(),
          txt_weight_value: z.string(),
          txt_prop65_message_01: z.string().nullable(),
          txt_prop65_message_02: z.string().nullable(),
          txt_prop65_message_03: z.string().nullable(),
          list_price: z.string(),
          on_sale: z.string(),
          is_new: z.string(),
          is_directly_shipped_from_vendor: z.boolean(),
        }),
      ),
      variationsCount: z.number(),
    }),
  ),
  pagination: paginationSchema,
});

export type SearchDetails = {
  categoryId?: string;
  /**
   * Group items together such as multiple variations of the same product
   */
  groupResults?: boolean;
  /**
   * The page number to fetch (starts from 1)
   */
  page: number;
};
export type SelectedFilters = {
  [attributeId: string]: string[];
};

export const getSearch = async (
  { baseUrl, apiKey, token }: AuthenticatedApiConfig,
  { categoryId, groupResults = false, page }: SearchDetails,
  selectedFilters?: SelectedFilters,
) => {
  const searchParams = new URLSearchParams({
    sort_direction: "asc",
    page: page.toString(),
    perpage: "20",
    group_result: groupResults ? "true" : "false",
  });

  if (categoryId) {
    searchParams.set("categoryid", categoryId);
  }

  const body: {
    [attributeId: string]: {
      [valueId: string]: "Y";
    };
  } = {};
  if (selectedFilters) {
    for (const [key, values] of Object.entries(selectedFilters)) {
      values.forEach((value) => {
        body[key] = {
          ...body[key],
          [value]: "Y",
        };
      });
    }
  }

  const response = await api
    .post("rest/search", {
      prefixUrl: baseUrl,
      searchParams,
      headers: {
        "X-AUTH-TOKEN": apiKey,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      json: {
        rf_data: body,
      },
    })
    .json();

  return await searchResultSchema.parseAsync(response);
};
