import { ProductsGridPagination } from "@/_components/products-grid";
import { cookies } from "next/headers";
import { getSearchResults } from "./apis";
import { TOTAL_COOKIE } from "./constants";

type ProductsListPaginationProps = {
  term: string;
  pageNo: string;
};

const ProductsListPagination = async ({
  term,
  pageNo,
}: ProductsListPaginationProps) => {
  const searchResults = await getSearchResults({
    query: term,
    pageNo,
  });
  const cookiesStore = cookies();
  const searchParamsCookie = cookiesStore.get(TOTAL_COOKIE);
  let totalPages = 1;

  if (
    searchResults?.summary?.total != 0 &&
    Array.isArray(searchResults.results) &&
    searchResults.results.length !== 0
  ) {
    totalPages = Math.ceil(searchResults.summary.total / 24);
  } else if (
    searchParamsCookie?.value &&
    Array.isArray(searchResults.results) &&
    searchResults.results.length !== 0
  ) {
    totalPages = Math.ceil(parseInt(searchParamsCookie.value) / 24);
  }

  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
