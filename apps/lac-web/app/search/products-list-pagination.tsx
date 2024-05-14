import { ProductsGridPagination } from "@/_components/products-grid";

type ProductsListPaginationProps = {
  total: string;
};

const ProductsListPagination = async ({
  total,
}: ProductsListPaginationProps) => {
  const totalPages = Math.ceil(parseInt(total) / 24);

  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
