"use client";

import { ProductsGridHeader } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "../hooks/use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "../hooks/use-suspense-search-laminate-list.hook";

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

  const totalPages = Math.ceil(searchQuery.data.pagination.totalCount / 20);

  return (
    <ProductsGridHeader
      totalCount={searchQuery.data.pagination.totalCount}
      totalPages={totalPages}
    />
  );
};

export default LaminatesListHeader;
