import {
  ProductsGrid,
  ProductsGridDesktopContainer,
  ProductsGridHeaderSkeleton,
  ProductsGridListSkeleton,
  ProductsGridPaginationSkeleton,
} from "@/_components/products-grid";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { Suspense } from "react";
import ProductsListGrid from "./products-list-grid";
import ProductsListHeader from "./products-list-header";
import ProductsListPagination from "./products-list-pagination";

type ProductsListProps = {
  query: string;
  pageNo: string;
};

const ProductsList = ({ query, pageNo }: ProductsListProps) => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!tokenCookie) {
    return null;
  }

  return (
    <ProductsGrid>
      <Suspense fallback={<ProductsGridHeaderSkeleton />}>
        <ProductsListHeader term={query} pageNo={pageNo} />
      </Suspense>

      <Suspense fallback={<ProductsGridListSkeleton type="mobile" />}>
        <ProductsListGrid
          type="mobile"
          token={tokenCookie.value}
          term={query}
          pageNo={pageNo}
        />
      </Suspense>

      <ProductsGridDesktopContainer>
        <Suspense fallback={<ProductsGridListSkeleton type="desktop" />}>
          <ProductsListGrid
            type="desktop"
            token={tokenCookie.value}
            term={query}
            pageNo={pageNo}
          />
        </Suspense>
      </ProductsGridDesktopContainer>

      <Suspense fallback={<ProductsGridPaginationSkeleton />}>
        <ProductsListPagination term={query} pageNo={pageNo} />
      </Suspense>
    </ProductsGrid>
  );
};

export default ProductsList;
