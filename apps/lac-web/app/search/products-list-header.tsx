import { ProductsGridHeader } from "@/_components/products-grid";
import { cookies } from "next/headers";
import { getSearchResults } from "./apis";
import { TOTAL_COOKIE } from "./constants";

type ProductsListHeaderProps = {
  term: string;
  pageNo: string;
};

const ProductsListHeader = async ({
  term,
  pageNo,
}: ProductsListHeaderProps) => {
  const searchResults = await getSearchResults({
    query: term,
    pageNo,
  });
  const cookiesStore = cookies();
  const searchParamsCookie = cookiesStore.get(TOTAL_COOKIE);
  let totalPages = 1;
  let total = 0;
  if (
    searchResults?.summary?.total != 0 &&
    Array.isArray(searchResults.results) &&
    searchResults.results.length !== 0
  ) {
    totalPages = Math.ceil(searchResults.summary.total / 24);
    total = searchResults.summary.total;
  } else if (
    searchParamsCookie?.value &&
    Array.isArray(searchResults.results) &&
    searchResults.results.length !== 0
  ) {
    totalPages = Math.ceil(parseInt(searchParamsCookie.value) / 24);
    total = parseInt(searchParamsCookie.value);
  }

  return <ProductsGridHeader totalCount={total} totalPages={totalPages} />;
};

export default ProductsListHeader;
