"use client";

import { ProductsGridPagination } from "@/_components/products-grid";
import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductsListPaginationProps = {
  readonly token: string;
  readonly categoryId: string;
};

const ProductsListPagination = ({
  token,
  categoryId,
}: ProductsListPaginationProps) => {
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

  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
