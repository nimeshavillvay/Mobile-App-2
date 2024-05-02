import {
  ProductsGrid,
  ProductsGridFilters,
  ProductsGridHeader,
  ProductsGridList,
  ProductsGridPagination,
} from "@/_components/products-grid";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";

import { cookies } from "next/headers";

type ProductsListProps = {
  categoryId: string;
};

const ProductsList = ({ categoryId }: ProductsListProps) => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!tokenCookie) {
    return null;
  }

  return (
    <ProductsGrid>
      <ProductsGridHeader token={tokenCookie.value} categoryId={categoryId} />

      {/* Mobile products list */}
      <ProductsGridList
        type="mobile"
        token={tokenCookie.value}
        categoryId={categoryId}
      />

      {/* Desktop products grid */}
      <div className="container hidden flex-row items-start gap-10 md:flex">
        <ProductsGridFilters
          token={tokenCookie.value}
          categoryId={categoryId}
        />

        <ProductsGridList
          type="desktop"
          token={tokenCookie.value}
          categoryId={categoryId}
        />
      </div>

      <ProductsGridPagination
        token={tokenCookie.value}
        categoryId={categoryId}
      />
    </ProductsGrid>
  );
};

export default ProductsList;
