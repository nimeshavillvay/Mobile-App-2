"use client";

import { ProductsGridDesktopFiltersHeader } from "@/_components/products-grid";
import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";

type ProductsListDesktopFiltersHeaderProps = {
  token: string;
  categoryId: string;
};

const ProductsListDesktopFiltersHeader = ({
  token,
  categoryId,
}: ProductsListDesktopFiltersHeaderProps) => {
  const filtersQuery = useSuspenseFilters(token, {
    type: "Categories",
    id: categoryId,
    membershipId: 0,
  });

  return <ProductsGridDesktopFiltersHeader filters={filtersQuery.data} />;
};

export default ProductsListDesktopFiltersHeader;
