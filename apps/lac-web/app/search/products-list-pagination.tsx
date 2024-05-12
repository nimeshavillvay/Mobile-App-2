import { ProductsGridPagination } from "@/_components/products-grid";
import { getSearchResults } from "./apis";

type ProductsListPaginationProps = {
  token: string;
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

  const totalPages = Math.ceil(searchResults?.summary?.total / 24);

  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
