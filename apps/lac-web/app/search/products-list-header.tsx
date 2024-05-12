import { ProductsGridHeader } from "@/_components/products-grid";
import { getSearchResults } from "./apis";

type ProductsListHeaderProps = {
  token: string;
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
  const total = searchResults.summary.total;
  const totalPages = Math.ceil(searchResults?.summary?.total / 24);
  return <ProductsGridHeader totalCount={total} totalPages={totalPages} />;
};

export default ProductsListHeader;
