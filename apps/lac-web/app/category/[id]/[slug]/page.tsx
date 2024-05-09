import {
  ProductsGrid,
  ProductsGridDesktopContainer,
  ProductsGridFiltersSkeleton,
  ProductsGridHeaderSkeleton,
  ProductsGridListSkeleton,
  ProductsGridPaginationSkeleton,
} from "@/_components/products-grid";
import { getBreadcrumbs } from "@/_lib/apis/server";
import { ChevronLeft } from "@repo/web-ui/components/icons/chevron-left";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import Balancer from "react-wrap-balancer";
import ProductsList from "./_products-list";
import { getCategory } from "./apis";
import categoryImage from "./category.jpeg";
import type { CategoryPageProps } from "./types";

const VISIBLE_SUB_CATEGORIES_LENGTH = 6;

type SubCategory = {
  id: number;
  slug: string;
  title: string;
  image: string;
};

export const generateMetadata = async ({
  params: { id, slug },
}: CategoryPageProps): Promise<Metadata> => {
  const category = await getCategory(id, slug);

  return {
    title: category.title,
    description: category.description,
  };
};

const CategoryPage = async ({ params: { id, slug } }: CategoryPageProps) => {
  const category = await getCategory(id, slug);
  const breadcrumbs = await getBreadcrumbs(id, "category");

  const subCategories = category.subCategories.map(
    (subCategory) =>
      ({
        id: subCategory.id,
        slug: subCategory.slug,
        title: subCategory.title,
        image: subCategory.image,
      }) satisfies SubCategory,
  );
  const visibleSubCategories = subCategories.slice(
    0,
    VISIBLE_SUB_CATEGORIES_LENGTH,
  );
  const hiddenSubCategories = subCategories.slice(
    VISIBLE_SUB_CATEGORIES_LENGTH,
    VISIBLE_SUB_CATEGORIES_LENGTH + category.subCategories.length,
  );

  return (
    <>
      <div className="container my-2 md:hidden">
        <Button variant="link" asChild className="group gap-1 px-0">
          <Link href="/">
            <ChevronLeft
              width={16}
              height={16}
              className="group-hover:stroke-red-800"
            />
            Home
          </Link>
        </Button>
      </div>

      <Breadcrumb className="container my-3 hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((breadcrumb, index) => (
            <Fragment key={breadcrumb.id}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {index < breadcrumbs.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/category/${breadcrumb.id}/${breadcrumb.slug}`}
                    >
                      {breadcrumb.categoryName}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{breadcrumb.categoryName}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <section className="container md:my-10">
        <div className="overflow-hidden rounded-lg border border-wurth-gray-250 bg-white shadow-lg md:flex md:max-h-[21rem] md:flex-row-reverse md:items-center">
          <Image
            src={categoryImage}
            alt="A placeholder category"
            className="object-cover object-center"
            priority
            width={926}
            height={336}
          />

          <div className="space-y-3 p-6 md:flex-1 md:space-y-5 md:p-10">
            <h1 className="line-clamp-3 text-balance font-title text-4xl font-medium tracking-tight text-wurth-gray-800 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.036rem]">
              {category.title}
            </h1>

            {!!category.description && (
              <p className="text-base text-wurth-gray-800 md:line-clamp-3 md:text-lg">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="container my-10 space-y-6 md:my-16 md:space-y-9">
        <CategoriesGrid categories={visibleSubCategories} priorityImages />

        {hiddenSubCategories.length > 0 && (
          <Collapsible className="flex flex-col gap-6 space-y-6 md:space-y-9">
            <CollapsibleContent asChild>
              <CategoriesGrid categories={hiddenSubCategories} />
            </CollapsibleContent>

            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="self-center py-2.5 font-bold text-black"
              >
                Show all
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </section>

      <Suspense
        fallback={
          <ProductsGrid>
            <ProductsGridHeaderSkeleton />

            <ProductsGridListSkeleton type="mobile" />

            <ProductsGridDesktopContainer>
              <ProductsGridFiltersSkeleton />

              <ProductsGridListSkeleton type="desktop" />
            </ProductsGridDesktopContainer>

            <ProductsGridPaginationSkeleton />
          </ProductsGrid>
        }
      >
        <ProductsList categoryId={id} />
      </Suspense>
    </>
  );
};

export default CategoryPage;

const CategoriesGrid = ({
  categories,
  priorityImages = false,
}: {
  categories: SubCategory[];
  priorityImages?: boolean;
}) => {
  return (
    <ul className="grid grid-cols-3 justify-items-center gap-y-10 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/category/${category.id}/${category.slug}`}
            className="flex flex-col items-center gap-4"
          >
            <Image
              src={category.image}
              alt={`An image of ${category.title}`}
              width={112}
              height={112}
              className="size-28 rounded-full object-contain"
              priority={priorityImages}
            />

            <h2 className="text-center text-[0.9375rem] font-semibold leading-5 text-black">
              <Balancer>{category.title}</Balancer>
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};
