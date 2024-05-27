"use client";

import { ProductsGridFilters } from "@/_components/products-grid";
import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";

type ProductsListFiltersProps = {
  readonly token: string;
  readonly categoryId: string;
};

const ProductsListFilters = ({
  token,
  categoryId,
}: ProductsListFiltersProps) => {
  const filtersQuery = useSuspenseFilters(token, {
    type: "Categories",
    id: categoryId,
    membershipId: 0,
  });

  return <ProductsGridFilters filters={filtersQuery.data} />;
};

export default ProductsListFilters;
