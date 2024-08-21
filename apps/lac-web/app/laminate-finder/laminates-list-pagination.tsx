"use client";

import { ProductsGridPagination } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "@/_hooks/laminate/use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "@/_hooks/laminate/use-suspense-search-laminate-list.hook";

type ProductsListPaginationProps = {
  readonly token: string;
};

const ProductsListPagination = ({ token }: ProductsListPaginationProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });
  const searchQuery = useSuspenseSearchLaminateList(
    token,
    categoryFiltersQuery.data,
  );

  if (searchQuery.data.pagination.totalCount === 0) {
    return null;
  }

  const totalPages = Math.ceil(searchQuery.data.pagination.totalCount / 20);

  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
