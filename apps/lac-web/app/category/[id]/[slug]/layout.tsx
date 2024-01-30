import Breadcrumbs from "@/_components/breadcrumbs";
import { getBreadcrumbs, getCategories } from "@/_lib/shared-api";
import { getMediaUrl } from "@/_utils/helpers";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import Filters from "./_filters";
import { getCategory } from "./apis";

type CategoryLayoutProps = {
  params: {
    id: string;
    slug: string;
  };
  children: ReactNode;
};

export const generateMetadata = async ({
  params: { id, slug },
}: CategoryLayoutProps): Promise<Metadata> => {
  const category = await getCategory(id, slug);

  return {
    title: category.main.catTitle,
  };
};

const CategoryLayout = async ({
  params: { id, slug },
  children,
}: CategoryLayoutProps) => {
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

      <h1 className="max-w-desktop mx-auto">{category.main.catTitle}</h1>

      {!!category.main.description && (
        <p className="max-w-desktop mx-auto">{category.main.description}</p>
      )}

      {category.main.subCatgores.length > 0 && (
        <section className="max-w-desktop mx-auto">
          <h2 className="text-brand-primary">Categories</h2>

          <div className="grid grid-cols-4 gap-2">
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
                  className="mx-auto object-contain"
                  priority={index < 4}
                />

                <div className="bg-brand-primary text-center text-white">
                  {subCategory.SubCatTitle}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-desktop mx-auto flex flex-row gap-8">
        <Filters id={id} />

        <div className="grid flex-1 grid-cols-4 gap-4">{children}</div>
      </div>
    </>
  );
};

export default CategoryLayout;

export const generateStaticParams = async () => {
  const categories = await getCategories();

  const params: { id: string; slug: string }[] = [];
  categories.forEach((category) => {
    params.push({ id: category.id.toString(), slug: category.slug });

    category.subcategory.map((subCategory) => {
      params.push({ id: subCategory.subid.toString(), slug: subCategory.slug });

      subCategory.subsubcategory?.map((subSubCategories) =>
        params.push({
          id: subSubCategories.subsubid.toString(),
          slug: subSubCategories.slug,
        }),
      );
    });
  });

  return params;
};
