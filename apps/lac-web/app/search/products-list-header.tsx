"use client";

import { ProductsGridHeader } from "@/_components/products-grid";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductsListHeaderProps = {
  token: string;
  term: string;
};

const ProductsListHeader = ({ term }: ProductsListHeaderProps) => {
  const searchQuery = useSuspenseSearchProductList(term);

  const totalPages = Math.ceil(searchQuery.data?.products?.meta?.total / 20);
  return (
    <ProductsGridHeader
      filters={[]}
      totalCount={searchQuery.data?.products?.meta?.total}
      totalPages={totalPages}
    />
  );
};

export default ProductsListHeader;
