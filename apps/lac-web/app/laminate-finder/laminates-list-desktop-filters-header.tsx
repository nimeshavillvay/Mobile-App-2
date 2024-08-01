"use client";

import { ProductsGridDesktopFiltersHeader } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "./use-suspense-laminate-filters.hook";

type ProductsListDesktopFiltersHeaderProps = {
  readonly token: string;
};

const ProductsListDesktopFiltersHeader = ({
  token,
}: ProductsListDesktopFiltersHeaderProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });

  return (
    <ProductsGridDesktopFiltersHeader filters={categoryFiltersQuery.data} />
  );
};

export default ProductsListDesktopFiltersHeader;
