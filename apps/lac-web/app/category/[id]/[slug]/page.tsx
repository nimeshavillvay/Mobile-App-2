import Banner from "@/_components/banner";
import RelatedSearches from "@/_components/related-searches";
import { api } from "@/_lib/api";
import { getBreadcrumbs } from "@/_lib/apis/server";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import ChevronLeft from "@repo/web-ui/components/icons/chevron-left";
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
import { notFound } from "next/navigation";
import { Fragment, Suspense } from "react";
import Balancer from "react-wrap-balancer";
import categoryImage from "./category.jpeg";
import PopularBrands from "./popular-brands";
import Products from "./products";
import TopSubCategories from "./top-sub-categories";

const VISIBLE_SUB_CATEGORIES_LENGTH = 6;

const getCategory = async (id: string, slug: string) => {
  try {
    const category = await api
      .get(`rest/productlandingcategory/${id}`, {
        next: { revalidate: DEFAULT_REVALIDATE },
      })
      .json<{
        main: {
          catId: string;
          type: string;
          catTitle: string;
          description: string;
          additional_description: string;
          Image: string;
          slug: string;
          subCatgores: {
            SubCatId: string;
            SubCatTitle: string;
            slug: string;
            Image: string;
          }[];
        };
      }>();

    // Compare slug
    if (slug !== category.main.slug) {
      notFound();
    }

    return category.main;
  } catch {
    notFound();
  }
};

type CategoryPageProps = {
  params: {
    id: string;
    slug: string;
  };
};
type SubCategory = {
  id: string;
  slug: string;
  title: string;
  image: string;
};

export const generateMetadata = async ({
  params: { id, slug },
}: CategoryPageProps): Promise<Metadata> => {
  const category = await getCategory(id, slug);

  return {
    title: category.catTitle,
    description: category.description,
  };
};

const CategoryPage = async ({ params: { id, slug } }: CategoryPageProps) => {
  const category = await getCategory(id, slug);

  const breadcrumbs = await getBreadcrumbs(id, "category");

  const subCategories = category.subCatgores.map(
    (subCategory) =>
      ({
        id: subCategory.SubCatId,
        slug: subCategory.slug,
        title: subCategory.SubCatTitle,
        image: subCategory.Image,
      }) satisfies SubCategory,
  );
  const visibleSubCategories = subCategories.slice(
    0,
    VISIBLE_SUB_CATEGORIES_LENGTH,
  );
  const hiddenSubCategories = subCategories.slice(
    VISIBLE_SUB_CATEGORIES_LENGTH,
    VISIBLE_SUB_CATEGORIES_LENGTH + category.subCatgores.length,
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
            <Fragment key={breadcrumb.oo_id}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {index < breadcrumbs.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/category/${breadcrumb.oo_id}/${breadcrumb.slug}`}
                    >
                      {breadcrumb.cat_name}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{breadcrumb.cat_name}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <section className="container md:my-10">
        <div className="overflow-hidden rounded-lg border border-wurth-gray-250 bg-white shadow-lg md:flex md:max-h-[21rem] md:flex-row-reverse md:items-center">
          <div className="aspect-h-1 aspect-w-2 relative md:flex-1">
            <Image
              src={categoryImage}
              alt="A placeholder category"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="space-y-3 p-6 md:flex-1 md:space-y-5 md:p-10">
            <h1 className="line-clamp-3 text-balance font-title text-4xl font-medium tracking-tight text-wurth-gray-800 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.036rem]">
              {category.catTitle}
            </h1>

            <p className="text-base text-wurth-gray-800 md:line-clamp-3 md:text-lg">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      <section className="container my-10 space-y-6 md:my-16 md:space-y-9">
        <CategoriesGrid categories={visibleSubCategories} />

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

      <TopSubCategories title={category.catTitle} />

      <PopularBrands />

      <Banner />

      <Suspense fallback={<div>Loading...</div>}>
        <Products />
      </Suspense>

      <RelatedSearches />
    </>
  );
};

export default CategoryPage;

const CategoriesGrid = ({ categories }: { categories: SubCategory[] }) => {
  return (
    <ul className="grid grid-cols-3 justify-items-center gap-y-10 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/category/${category.id}/${category.slug}`}
            className="flex flex-col items-center gap-4"
          >
            <span className="size-28 rounded-full bg-[linear-gradient(180deg,#FBFDFF_0%,#F0F3FB_100%)]" />

            <h2 className="text-center text-[0.9375rem] font-semibold leading-5 text-black">
              <Balancer>{category.title}</Balancer>
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};
