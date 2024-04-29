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

type GroupList = {
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

      txt_uom_label: string;

      txt_box_qt: string;
      txt_min_order_amount: string;
      txt_order_qty_increments: string;
      txt_weight_value: string;
      txt_prop65_message_01: string;
      txt_prop65_message_02: null;
      txt_prop65_message_03: null;

      list_price: string;
      on_sale: string;
      is_directly_shipped_from_vendor: boolean;
    }[];
    variationsCount: number;
  }[];
  pagination: [
    {
      db_count: number;
      offset: number;
      perPage: number;
    },
  ];
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
        .json<GroupList>(),
    select: (data) => {
      const { group_list, pagination } = data;

      const mappedGroups = group_list.map(
        ({
          groupid,
          type,
          item_group_name,
          slug,
          brandName,
          brandid,
          group_img,
          compliance_flags,
          fclassid,
          itemSkuList,
          variationsCount,
        }) => ({
          groupId: groupid,
          type: type,
          productGroupName: item_group_name,
          slug: slug,
          brandName: brandName,
          brandId: Number(brandid),
          groupImage: group_img,
          complianceFlags: compliance_flags,
          fClassId: fclassid,
          productSkuList: itemSkuList.map((item) => ({
            productId: item.productid,
            isExcludedProduct: item.is_product_exclude,
            productSku: item.txt_wurth_lac_item,
            productName: item.item_name,
            image: item.img,
            slug: item.slug,
            isFavourite: item.is_favourite,
            isComparison: item.is_comparison,
            skuAttribute: item["SKU-attribute"],
            isHazardous: item.txt_hazardous === "Y",
            productIdOnSap: item.txt_sap,
            mfrPartNo: item.txt_mfn,
            productSummary: item.txt_description_name,
            productDescription: item.txt_sub_description,
            productBrandId: item.sel_assigned_brand,
            unitOfMeasure: item.txt_uom_label,
            boxQuantity: Number(item.txt_box_qt) || 1,
            minimumOrderQuantity: Number(item.txt_min_order_amount) || 1,
            quantityByIncrements: Number(item.txt_order_qty_increments) || 1,
            weight: Number(item.txt_weight_value),
            prop65MessageOne: item.txt_prop65_message_01,
            prop65MessageTwo: item.txt_prop65_message_02,
            prop65MessageThree: item.txt_prop65_message_03,
            listPrice: Number(item.list_price),
            isSaleItem: item.on_sale === "Y",
            isDirectlyShippedFromVendor: item.is_directly_shipped_from_vendor,
          })),
          variationsCount: Number(variationsCount),
        }),
      );

      const firstPagination = pagination[0] || {
        db_count: 0,
        offset: 0,
        perPage: 0,
      };

      const mappedPagination = {
        totalCount: firstPagination.db_count,
        offset: firstPagination.offset,
        perPage: firstPagination.perPage,
      };

      return { groupList: mappedGroups, pagination: mappedPagination };
    },
  });
};

export default useSuspenseSearch;
