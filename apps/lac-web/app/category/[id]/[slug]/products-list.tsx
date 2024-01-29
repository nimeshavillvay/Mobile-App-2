"use client";

import { getMediaUrl } from "@/_utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PAGE_SIZES, SORTING_TYPES } from "./constants";
import ProductsListSelectors from "./products-list-selectors";
import useSuspenseProductList from "./use-suspense-product-list.hook";

const QUERY_KEYS = {
  PAGE: "page",
  PAGE_SIZE: "page-size",
  SORT: "sort",
} as const;

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

  const productsListQuery = useSuspenseProductList(id, {
    page,
    pageSize,
    sort: sorting,
  });

  const searchParamChange = (
    key: (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS],
    value: string,
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);

    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const onSortingChange = (value: string) => {
    searchParamChange(QUERY_KEYS.SORT, value);
  };

  const onPerPageChange = (value: string) => {
    searchParamChange(QUERY_KEYS.PAGE_SIZE, value);
  };

  const onPageNoChange = (values: number) => {
    searchParamChange(QUERY_KEYS.PAGE, values.toString());
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
        onPageNoChange={onPageNoChange}
      />

      {productsListQuery.data.group_list.map((product, index) => (
        <div
          key={product.groupId}
          className="flex flex-col items-center text-center"
        >
          <Link
            href={`/product-item/${product.groupId}`}
            className="group block"
          >
            <Image
              src={getMediaUrl(product.group_img)}
              alt={`A picture of ${product.item_group_name}`}
              width={171}
              height={171}
              priority={index < 4}
            />

            <div
              className="group-hover:text-brand-primary"
              dangerouslySetInnerHTML={{ __html: product.brandName }}
            />

            <div>{product.item_group_name}</div>
          </Link>

          {!!product.itemSkuList[0] && (
            <div>( {product.itemSkuList[0].txt_wurth_lac_item} )</div>
          )}

          <div>
            {product.variationsCount > 1
              ? `${product.variationsCount} variations`
              : "1 variation"}
          </div>

          <Link
            href={`/product-item/${product.groupId}`}
            className="bg-brand-primary rounded p-2 uppercase text-white"
          >
            View item
          </Link>
        </div>
      ))}
    </>
  );
};

export default ProductsList;
