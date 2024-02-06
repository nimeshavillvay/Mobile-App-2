import Breadcrumbs from "@/_components/breadcrumbs";
import ErrorBoundary from "@/_components/error-boundary";
import {
  ProductCardActions,
  ProductCardContainer,
  ProductCardDetailsSkeleton,
} from "@/_components/product-card";
import Separator from "@/_components/separator";
import { Skeleton } from "@/_components/ui/skeleton";
import { getBreadcrumbs } from "@/_lib/shared-server-apis";
import { getMediaUrl } from "@/_utils/helpers";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Filters from "./_filters";
import { getCategory } from "./apis";
import { PAGE_SIZES } from "./constants";
import ProductsList from "./products-list";
import ProductsListSelectors from "./products-list-selectors";

type CategoryPageProps = {
  params: {
    id: string;
    slug: string;
  };
};

export const generateMetadata = async ({
  params: { id, slug },
}: CategoryPageProps): Promise<Metadata> => {
  const category = await getCategory(id, slug);

  return {
    title: category.main.catTitle,
  };
};

const CategoryPage = async ({ params: { id, slug } }: CategoryPageProps) => {
  const category = await getCategory(id, slug);
  const breadcrumbs = await getBreadcrumbs(id, "category");

  return (
    <>
      <Breadcrumbs
        links={breadcrumbs.map((breadcrumb) => ({
          href: `/category/${breadcrumb.oo_id}/${breadcrumb.slug}`,
          label: breadcrumb.cat_name,
        }))}
      />

      <div className="max-w-desktop mx-auto mb-[34px] mt-5 flex flex-row items-center gap-2.5">
        <h1 className="text-brand-very-dark-gray text-[28px] font-medium leading-8">
          {category.main.catTitle}
        </h1>

        <Separator
          orientation="horizontal"
          className="bg-brand-gray h-px flex-1"
        />
      </div>

      {!!category.main.description && (
        <div className="max-w-desktop mx-auto">
          <p className="max-w-[540px] text-[15px] leading-5">
            {category.main.description}
          </p>
        </div>
      )}

      {category.main.subCatgores.length > 0 && (
        <section className="max-w-desktop mx-auto my-8">
          <h2 className="text-brand-primary mb-2 text-xl font-bold leading-6">
            Categories
          </h2>

          <div className="grid grid-cols-4 gap-8">
            {category.main.subCatgores.map((subCategory, index) => (
              <Link
                key={subCategory.SubCatId}
                href={`/category/${subCategory.SubCatId}/${subCategory.slug}`}
              >
                <Image
                  src={getMediaUrl(subCategory.Image)}
                  alt={`A picture of ${subCategory.SubCatTitle}`}
                  width={238}
                  height={172}
                  className="mx-auto aspect-[238/172] object-contain"
                  priority={index < 4}
                />

                <div className="bg-brand-primary px-2.5 py-[5px] text-center text-[15px] leading-5 text-white">
                  {subCategory.SubCatTitle}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-desktop mx-auto flex flex-row gap-8">
        <Filters id={id} />

        <div className="grid flex-1 grid-cols-4 gap-4">
          <ErrorBoundary
            fallback={<div className="col-span-4">Error fetching products</div>}
          >
            <Suspense
              fallback={
                <>
                  <ProductsListSelectors />

                  {[...Array(parseInt(PAGE_SIZES[0]))].map((item, index) => (
                    <ProductCardContainer key={index}>
                      <ProductCardDetailsSkeleton />

                      <ProductCardActions>
                        <Skeleton className="h-5" />

                        <Skeleton className="mx-auto mb-5 mt-3.5 h-3.5 w-2/3" />

                        <Skeleton className="h-9" />
                      </ProductCardActions>
                    </ProductCardContainer>
                  ))}
                </>
              }
            >
              <ProductsList id={id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
