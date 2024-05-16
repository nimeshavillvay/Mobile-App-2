import {
  ProductsGrid,
  ProductsGridDesktopContainer,
  ProductsGridHeaderSkeleton,
  ProductsGridListSkeleton,
} from "@/_components/products-grid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment, Suspense } from "react";
import { getSearchResults } from "./apis";
import { TOTAL_COOKIE } from "./constants";
import NoResultsNotice from "./no-results-notice";
import ProductsList from "./products-list";
import ResultCacher from "./result-cacher";

export const metadata: Metadata = {
  title: "Search",
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const query = searchParams.query?.toString() ?? "";
  const pageNo = searchParams.page?.toString() ?? "1";

  const searchResults = await getSearchResults({
    query,
    pageNo,
  });

  const cookiesStore = cookies();

  const total =
    searchResults.summary.total === 0
      ? parseInt(cookiesStore.get(TOTAL_COOKIE)?.value ?? "0")
      : searchResults.summary.total;

  if (searchResults.summary.plp && !Array.isArray(searchResults.results)) {
    return redirect(
      `/product/${searchResults.results.id}/${searchResults.results.slug}`,
    );
  }

  return (
    <>
      <ResultCacher
        total={searchResults.summary.total}
        searchParams={searchResults.summary.searchParams}
      />

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

      {searchResults.summary.total == 0 &&
        Array.isArray(searchResults.results) &&
        searchResults.results.length == 0 && <NoResultsNotice />}

      {total !== 0 &&
        Array.isArray(searchResults.results) &&
        searchResults.results.length !== 0 && (
          <>
            <h1 className="line-clamp-3 text-balance pl-8 font-title text-4xl font-medium tracking-tight text-wurth-gray-800 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.036rem]">
              Search Results for &quot;{query}&quot;
            </h1>
            <div className="mx-auto max-w-[1360px]">
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
                <ProductsList query={query} pageNo={pageNo} total={total} />
              </Suspense>
            </div>
          </>
        )}
    </>
  );
};

export default SearchPage;
