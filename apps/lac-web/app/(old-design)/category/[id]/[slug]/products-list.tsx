"use client";

import ProductCardWithSkuSwitcher from "@/old/_components/product-card-with-sku-switcher";
import { FILTERS_QUERY_PREFIX, QUERY_KEYS } from "@/old/_lib/constants";
import { updateSearchParams } from "@/old/_utils/client-helpers";
import { getMediaUrl } from "@/old/_utils/helpers";
import { useSearchParams } from "next/navigation";
import { PAGE_SIZES, SORTING_TYPES } from "./constants";
import ProductsListSelectors from "./products-list-selectors";
import useSuspenseProductList from "./use-suspense-product-list.hook";

type ProductsListProps = {
  id: string;
};

const ProductsList = ({ id }: ProductsListProps) => {
  const searchParams = useSearchParams();
  const page = searchParams.get(QUERY_KEYS.PAGE) ?? "1";
  const pageSize = searchParams.get(QUERY_KEYS.PAGE_SIZE) ?? PAGE_SIZES[0];
  const sorting =
    (searchParams.get(
      QUERY_KEYS.SORT,
    ) as (typeof SORTING_TYPES)[number]["value"]) ?? SORTING_TYPES[0].value;

  const filters: {
    [sectionId: string]: string[];
  } = {};
  for (const key of searchParams.keys()) {
    if (key.startsWith(FILTERS_QUERY_PREFIX)) {
      filters[key.replace(FILTERS_QUERY_PREFIX, "")] = searchParams.getAll(key);
    }
  }

  const productsListQuery = useSuspenseProductList(id, {
    page,
    pageSize,
    sort: sorting,
    filters,
  });

  const searchParamChange = (
    key: (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS],
    value: string,
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);

    updateSearchParams(newSearchParams);
  };

  const onSortingChange = (value: string) => {
    searchParamChange(QUERY_KEYS.SORT, value);
  };

  const onPerPageChange = (value: string) => {
    searchParamChange(QUERY_KEYS.PAGE_SIZE, value);
  };

  return (
    <>
      <ProductsListSelectors
        pageNo={parseInt(page)}
        pageSize={parseInt(pageSize)}
        total={productsListQuery.data.pagination[0].db_count}
        sorting={sorting}
        onSortingChange={onSortingChange}
        onPerPageChange={onPerPageChange}
        searchParams={searchParams}
      />

      {productsListQuery.data.group_list.map((product) => (
        <ProductCardWithSkuSwitcher
          key={product.groupId}
          details={{
            href: `/product-item/${product.groupId}`,
            image: {
              src: getMediaUrl(product.group_img),
              alt: `An image of the group ${product.item_group_name}`,
            },
            brand: product.brandName,
            title: product.item_group_name,
          }}
          variations={product.itemSkuList.map((variation) => ({
            sku: variation.txt_wurth_lac_item,
            image: variation.img,
            name: variation.item_name,
          }))}
        />
      ))}
    </>
  );
};

export default ProductsList;
