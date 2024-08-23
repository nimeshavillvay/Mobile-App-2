import ProductCardSkeleton from "@/_components/product-card-skeleton";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { api } from "@/_lib/api";
import { getBreadcrumbs } from "@/_lib/apis/server";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import { sendGTMEvent } from "@next/third-parties/google";
import { ChevronLeft } from "@repo/web-ui/components/icons/chevron-left";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import { decode } from "html-entities";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import Balancer from "react-wrap-balancer";
import ProductHero from "./_product-hero";
import RelatedProductsList from "./_related-products-list";
import { getProduct } from "./apis";
import type { ProductPageProps, RelatedProduct } from "./types";

export const generateMetadata = async ({
  params: { id, slug },
}: ProductPageProps): Promise<Metadata> => {
  const product = await getProduct(id, slug);

  return {
    title: decode(product.selectedProduct.productName),
    description: decode(product.selectedProduct.productDescription),
  };
};

const ProductPage = async ({ params: { id, slug } }: ProductPageProps) => {
  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  sendGTMEvent({
    event: "view_page",
    viewPageData: {
      page_type: getGTMPageType(
        pathnameHistory[pathnameHistory.length - 1] ?? "",
      ),
    },
  });

  // Just to check if the product exists
  await getProduct(id, slug);

  const [breadcrumbs, relatedProducts] = await Promise.all([
    getBreadcrumbs(id, "product"),
    api
      .get("rest/landingrelatedproduct", {
        searchParams: {
          productid: id,
        },
        next: { revalidate: DEFAULT_REVALIDATE },
      })
      .json<{
        data: {
          heading: string;
          items: RelatedProduct[];
        }[];
      }>()
      .then(({ data }) => data),
  ]);

  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];

  return (
    <>
      {!!lastBreadcrumb && (
        <div className="container my-4 md:hidden">
          <Link
            href={`/category/${lastBreadcrumb.id}/${lastBreadcrumb.slug}`}
            className={buttonVariants({
              variant: "link",
              className: "h-fit gap-1 p-0",
            })}
          >
            <ChevronLeft className="size-4" />

            <span>{lastBreadcrumb.categoryName}</span>
          </Link>
        </div>
      )}

      <Breadcrumb className="container mb-6 mt-3 hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="bread-crumb">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((breadcrumb) => (
            <Fragment key={breadcrumb.id}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={`/category/${breadcrumb.id}/${breadcrumb.slug}`}
                    className="bread-crumb"
                  >
                    {breadcrumb.categoryName}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <ProductHero id={id} slug={slug} />

      {relatedProducts.length > 0 && (
        <section className="my-10 space-y-4 md:my-[3.75rem] md:space-y-9">
          <h2 className="container font-title text-2xl font-medium tracking-[-0.144px] text-wurth-gray-800">
            <Balancer>Accessories and Related Products</Balancer>
          </h2>

          {relatedProducts.map((relatedSection) => (
            <div key={relatedSection.heading} className="space-y-3 bg-white">
              {!!relatedSection.heading && (
                <h3 className="container text-lg font-semibold text-wurth-gray-800">
                  <Balancer>{relatedSection.heading}</Balancer>
                </h3>
              )}

              <Suspense
                fallback={
                  <div className="container grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <ProductCardSkeleton
                        key={index}
                        orientation="horizontal"
                      />
                    ))}
                  </div>
                }
              >
                <RelatedProductsList products={relatedSection.items} />
              </Suspense>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default ProductPage;
