"use client";

import { ProductsGridHeader } from "@/_components/products-grid";
import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductsListHeaderProps = {
  token: string;
  categoryId: string;
};

const ProductsListHeader = ({ token, categoryId }: ProductsListHeaderProps) => {
  const filtersQuery = useSuspenseFilters(token, {
    type: "Categories",
    id: categoryId,
    membershipId: 0,
  });
  const searchQuery = useSuspenseSearchProductList(
    token,
    categoryId,
    filtersQuery.data,
  );

  const totalPages = Math.ceil(searchQuery.data.pagination.totalCount / 20);

  return (
    <ProductsGridHeader
      totalCount={searchQuery.data.pagination.totalCount}
      totalPages={totalPages}
    />
  );
};

export default ProductsListHeader;
