import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseProductList = (catId: string) => {
  return useSuspenseQuery({
    queryKey: ["category", catId, "products"],
    queryFn: () =>
      api
        .get(`pim/webservice/rest/productlandinggrouplist/${catId}`, {
          searchParams: new URLSearchParams({
            perpage: "20",
          }),
        })
        .json<{
          group_list: {
            groupId: number;
            item_group_name: string;
            slug: string;
            brandName: string;
            group_img: string;
            itemSkuList: {
              is_product_exclude: boolean;
              txt_wurth_lac_item: string;
              item_name: string;
              img: string;
              is_favourite: null;
              "SKU-attribute": string;
            }[];
            variationsCount: number;
          }[];
          pagination: [
            {
              db_count: number;
              offset: number;
              perPage: string;
            },
          ];
        }>(),
  });
};

export default useSuspenseProductList;
