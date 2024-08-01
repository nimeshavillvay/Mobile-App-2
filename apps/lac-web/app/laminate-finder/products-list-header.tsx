"use client";

import { ProductsGridHeader } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "./use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "./use-suspense-search-laminate-list.hook";

type ProductsListHeaderProps = {
  readonly token: string;
};

const ProductsListHeader = ({ token }: ProductsListHeaderProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });
  const searchQuery = useSuspenseSearchLaminateList(
    token,
    categoryFiltersQuery.data,
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
