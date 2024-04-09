import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

type useSuspenseSearchArgs = {
  /**
   * Group items together such as multiple variations of the same product
   */
  groupResults?: boolean;
  /**
   * The page number to fetch (starts from 1)
   */
  page: number;
};

const useSuspenseSearch = ({
  groupResults = false,
  page,
}: useSuspenseSearchArgs) => {
  return useSuspenseQuery({
    queryKey: [
      "search",
      {
        groupResults,
        page,
      },
    ],
    queryFn: () =>
      api
        .post("rest/search", {
          searchParams: {
            substring: "se901",
            sort: "search_rank",
            sort_direction: "asc",
            page,
            perpage: 20,
            groupResults,
          },
          cache: "no-store",
        })
        .json<{
          group_list: {
            groupid: string;
            type: string;
            item_group_name: string;
            slug: string;
            brandName: string;
            brandid: string;
            group_img: string;
            compliance_flags: string;
            fclassid: null;
            txt_meta_title: string;
            itemSkuList: {
              productid: string;
              is_product_exclude: boolean;
              txt_wurth_lac_item: string;
              item_name: string;
              img: string;
              slug: string;
              is_favourite: null;
              is_comparison: null;
              "SKU-attribute": string;
              txt_hazardous: string;
              txt_sap: string;
              txt_mfn: string;
              txt_description_name: string;
              txt_sub_description: string;
              sel_assigned_brand: string;
              txt_uom: string;
              txt_uom_label: string;
              txt_uom_value: null;
              txt_rounding: null;
              txt_box_qt: string;
              txt_min_order_amount: string;
              txt_order_qty_increments: string;
              txt_weight_value: string;
              txt_wight: string;
              txt_weight_label: string;
              date: Date;
              txt_chemical_carncengen: null;
              txt_chemical_reproduction: null;
              txt_contains_wood: null;
              txt_prop65_message_01: string;
              txt_prop65_message_02: null;
              txt_prop65_message_03: null;
              txt_meta_title: string;
              txt_upc1: string;
              txt_seo_meta_description: string;
              txt_keywords: string;
              list_price: string;
              on_sale: string;
            }[];
            variationsCount: number;
          }[];
          pagination: [
            {
              db_count: string;
              offset: number;
              perPage: number;
            },
          ];
        }>(),
  });
};

export default useSuspenseSearch;
