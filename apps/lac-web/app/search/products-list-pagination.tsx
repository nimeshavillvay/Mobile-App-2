"use client";

import { ProductsGridPagination } from "@/_components/products-grid";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductsListPaginationProps = {
  token: string;
  term: string;
};

const ProductsListPagination = ({ term }: ProductsListPaginationProps) => {
  const searchQuery = useSuspenseSearchProductList(term);

  const totalPages = Math.ceil(searchQuery.data?.summary?.total / 20);

  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
