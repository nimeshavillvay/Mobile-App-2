"use client";

import { ProductsGridFilters } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "./use-suspense-laminate-filters.hook";

type ProductsListFiltersProps = {
  readonly token: string;
};

const ProductsListFilters = ({ token }: ProductsListFiltersProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });

  return <ProductsGridFilters filters={categoryFiltersQuery.data} />;
};

export default ProductsListFilters;
