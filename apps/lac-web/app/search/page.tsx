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
  BreadcrumbPage,
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
              <BreadcrumbPage>Search Results</BreadcrumbPage>
            </BreadcrumbItem>
          </Fragment>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="line-clamp-3 text-balance pl-8 font-title text-4xl font-medium tracking-tight text-wurth-gray-800 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.036rem]">
        Search Results for &quot;{searchParams.query}&quot;
      </h1>
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
