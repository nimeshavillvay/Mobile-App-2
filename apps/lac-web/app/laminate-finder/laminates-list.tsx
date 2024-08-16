import {
  ProductsGrid,
  ProductsGridDesktopContainer,
  ProductsGridFiltersSkeleton,
  ProductsGridHeaderSkeleton,
  ProductsGridPaginationSkeleton,
} from "@/_components/products-grid";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { Suspense } from "react";
import LaminatesListDesktopFiltersHeader from "./laminates-list-desktop-filters-header";
import ProductsListFilters from "./laminates-list-filters";
import ProductsListGrid from "./laminates-list-grid";
import ProductsListHeader from "./laminates-list-header";
import ProductsListPagination from "./laminates-list-pagination";

const LaminatesList = () => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!tokenCookie) {
    return null;
  }

  return (
    <ProductsGrid>
      <Suspense fallback={<ProductsGridHeaderSkeleton />}>
        <ProductsListHeader token={tokenCookie.value} />
      </Suspense>

      <Suspense>
        <LaminatesListDesktopFiltersHeader token={tokenCookie.value} />
      </Suspense>

      <ProductsGridDesktopContainer>
        <div className="w-full pr-4 md:w-1/5 lg:w-1/6">
          <h2 className="mb-4 text-xl font-semibold">Filters</h2>
          <Suspense fallback={<ProductsGridFiltersSkeleton />}>
            <ProductsListFilters token={tokenCookie.value} />
          </Suspense>
        </div>

        <div className="flex-1">
          <ProductsListGrid token={tokenCookie.value} />
        </div>
      </ProductsGridDesktopContainer>

      <Suspense fallback={<ProductsGridPaginationSkeleton />}>
        <ProductsListPagination token={tokenCookie.value} />
      </Suspense>
    </ProductsGrid>
  );
};

export default LaminatesList;
