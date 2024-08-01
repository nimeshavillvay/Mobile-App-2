"use client";

import { ProductsGridPagination } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "./use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "./use-suspense-search-laminate-list.hook";

type ProductsListPaginationProps = {
  readonly token: string;
  readonly categoryId: string;
};

const ProductsListPagination = ({ token }: ProductsListPaginationProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });
  const searchQuery = useSuspenseSearchLaminateList(
    token,
    categoryFiltersQuery.data,
  );

  const totalPages = Math.ceil(searchQuery.data.pagination.totalCount / 20);

  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
