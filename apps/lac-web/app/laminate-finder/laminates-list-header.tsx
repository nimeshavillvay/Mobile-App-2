"use client";

import { ProductsGridHeader } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "@/_hooks/laminate/use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "@/_hooks/laminate/use-suspense-search-laminate-list.hook";

type LaminatesListHeaderProps = {
  readonly token: string;
};

const LaminatesListHeader = ({ token }: LaminatesListHeaderProps) => {
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

  return (
    <ProductsGridHeader
      totalCount={searchQuery.data.pagination.totalCount}
      totalPages={totalPages}
    />
  );
};

export default LaminatesListHeader;
