"use client";

import { ProductsGridHeader } from "@/_components/products-grid";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductsListHeaderProps = {
  token: string;
  term: string;
  pageNo: string;
};

const ProductsListHeader = ({ term, pageNo }: ProductsListHeaderProps) => {
  const searchQuery = useSuspenseSearchProductList(term, pageNo);

  let totalPages: number;
  let total: number;
  if (localStorage.getItem("total") == "0") {
    return null;
  }
  if (searchQuery.data?.summary?.total != 0) {
    total = searchQuery.data?.summary?.total;
    totalPages = Math.ceil(searchQuery.data?.summary?.total / 24);
  } else {
    total = parseInt(localStorage.getItem("total") || "0");
    totalPages = Math.ceil(total / 24);
  }
  return (
    <ProductsGridHeader
      filters={[]}
      totalCount={total}
      totalPages={totalPages}
    />
  );
};

export default ProductsListHeader;
