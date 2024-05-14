import { ProductsGridHeader } from "@/_components/products-grid";

type ProductsListHeaderProps = {
  total: string;
};

const ProductsListHeader = async ({ total }: ProductsListHeaderProps) => {
  const totalPages = Math.ceil(parseInt(total) / 24);
  const totalCount = parseInt(total);

  return <ProductsGridHeader totalCount={totalCount} totalPages={totalPages} />;
};

export default ProductsListHeader;
