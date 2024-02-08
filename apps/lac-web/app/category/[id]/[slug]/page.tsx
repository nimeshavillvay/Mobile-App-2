import Breadcrumbs from "@/_components/breadcrumbs";
import ErrorBoundary from "@/_components/error-boundary";
import {
  ProductCardActions,
  ProductCardContainer,
  ProductCardDetailsSkeleton,
} from "@/_components/product-card";
import SelectedFilters from "@/_components/selected-filters";
import Separator from "@/_components/separator";
import { Skeleton } from "@/_components/ui/skeleton";
import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { getBreadcrumbs } from "@/_lib/shared-server-apis";
import { getMediaUrl } from "@/_utils/helpers";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getCategory } from "./apis";
import { PAGE_SIZES } from "./constants";
import Filters from "./filters";
import FiltersBase from "./filters-base";
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
  const [breadcrumbs, filterHeadings] = await Promise.all([
    getBreadcrumbs(id, "category"),
    api
      .get(`pim/webservice/rest/productlandingattributeheading/${id}`, {
        next: {
          revalidate: DEFAULT_REVALIDATE,
        },
      })
      .json<{
        attribute_heading: {
          attribute_name: string;
          name: string;
        }[];
      }>(),
  ]);

  const filterSections = await Promise.all(
    filterHeadings.attribute_heading.map(async (heading) => {
      const values = await api
        .get(
          `pim/webservice/rest/productlandingattributevalues/${id}/${heading.attribute_name}`,
          {
            next: {
              revalidate: DEFAULT_REVALIDATE,
            },
          },
        )
        .json<{
          attribute_values: {
            isActive: boolean;
            attribute_value: string;
            name: string;
            attribute_name: string;
            id: string;
            slug: string;
          }[];
        }>();

      return {
        id: heading.attribute_name,
        heading: heading.name,
        values: values.attribute_values.map((item) => ({
          id: item.id,
          name: item.name,
          isActive: item.isActive,
        })),
      };
    }),
  );

  return (
    <>
      <Breadcrumbs
        links={breadcrumbs.map((breadcrumb) => ({
          href: `/category/${breadcrumb.oo_id}/${breadcrumb.slug}`,
          label: breadcrumb.cat_name,
        }))}
      />

      <div className="max-w-desktop mx-auto mb-[34px] mt-5 flex flex-row items-center gap-2.5">
        <h1 className="text-brand-gray-500 text-[28px] font-medium leading-8">
          {category.main.catTitle}
        </h1>

        <Separator
          orientation="horizontal"
          className="bg-brand-gray-300 h-px flex-1"
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

      <SelectedFilters
        sections={filterSections.map((section) => ({
          id: section.id,
          name: section.heading,
          values: section.values.map((value) => ({
            id: value.id,
            name: value.name,
          })),
        }))}
      />

      <div className="max-w-desktop mx-auto flex flex-row items-start gap-8">
        <Suspense fallback={<FiltersBase sections={filterSections} />}>
          <Filters sections={filterSections} />
        </Suspense>

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
