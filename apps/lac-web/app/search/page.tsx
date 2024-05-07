import {
  ProductsGrid,
  ProductsGridDesktopContainer,
  ProductsGridHeaderSkeleton,
  ProductsGridListSkeleton,
} from "@/_components/products-grid";
import RelatedSearches from "@/_components/related-searches";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import ProductsList from "./products-list";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  return (
    <>
      <Breadcrumb className="container my-3 hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <Fragment>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="">Search Results</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        </BreadcrumbList>
      </Breadcrumb>

      <Suspense
        fallback={
          <ProductsGrid>
            <ProductsGridHeaderSkeleton />

            <ProductsGridListSkeleton type="mobile" />

            <ProductsGridDesktopContainer>
              <ProductsGridListSkeleton type="desktop" />
            </ProductsGridDesktopContainer>
          </ProductsGrid>
        }
      >
        <ProductsList SearchTerm={searchParams.query} />
      </Suspense>
      <RelatedSearches />
    </>
  );
};

export default SearchPage;
