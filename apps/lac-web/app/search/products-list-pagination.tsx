"use client";

import { ProductsGridPagination } from "@/_components/products-grid";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductsListPaginationProps = {
  token: string;
  term: string;
  pageNo: string;
};

const ProductsListPagination = ({
  term,
  pageNo,
}: ProductsListPaginationProps) => {
  const searchQuery = useSuspenseSearchProductList(term, pageNo);

  let totalPages: number;
  if (searchQuery.data?.summary?.total != 0) {
    totalPages = Math.ceil(searchQuery.data?.summary?.total / 24);
  } else {
    const total = parseInt(localStorage.getItem("total") || "0");
    totalPages = Math.ceil(total / 24);
  }
  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
