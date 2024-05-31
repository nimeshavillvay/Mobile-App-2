import SubHeading from "@/_components/sub-heading";
import { api } from "@/_lib/api";
import { getCategoriesList } from "@/_lib/apis/server";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import Image from "next/image";
import Link from "next/link";

const SHOWN_CATEGORIES = 9;

const FeaturedCategories = async () => {
  const [data, categoriesList] = await Promise.all([
    api
      .get("rest/featuredcategories", {
        next: {
          revalidate: DEFAULT_REVALIDATE,
        },
      })
      .json<
        {
          id: string;
          name: string;
          slug: string;
          shortcode: string;
          item_count: string;
          direct_item_count: string;
          img: string;
        }[]
      >(),
    getCategoriesList(),
  ]);

  const showCategories = data.slice(0, SHOWN_CATEGORIES).map((category) => ({
    id: category.id,
    slug: category.slug,
    image: category.img,
    name: category.name,
  }));
  const hiddenCategories = data.slice(SHOWN_CATEGORIES).map((category) => ({
    id: category.id,
    slug: category.slug,
    image: category.img,
    name: category.name,
  }));

  const viewAllCategory = categoriesList[0];

  return (
    <section className="container my-14 space-y-6 md:my-20 md:space-y-9">
      <SubHeading>Featured Categories</SubHeading>

      <CategoriesGrid categories={showCategories} />

      {hiddenCategories.length > 0 && (
        <Collapsible className="flex flex-col space-y-6 md:space-y-9">
          <CollapsibleContent asChild>
            <CategoriesGrid categories={hiddenCategories} />
          </CollapsibleContent>

          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="mx-auto py-2.5 font-bold text-black"
            >
              View all categories
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      )}

      {!!viewAllCategory && (
        <div className="flex flex-row justify-center">
          <Link
            href={`/category/${viewAllCategory.id}/${viewAllCategory.slug}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-fit p-2.5 text-sm font-bold leading-5 text-black",
            )}
          >
            View all categories
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturedCategories;

const CategoriesGrid = ({
  categories,
}: {
  readonly categories: {
    id: string;
    slug: string;
    image: string;
    name: string;
  }[];
}) => {
  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-10 pb-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/category/${category.id}/${category.slug}`}
            className="flex flex-col items-center gap-4 md:gap-2"
          >
            <Image
              src={category.image}
              alt={`An image of the category ${category.name}`}
              width={124}
              height={124}
              className="size-28 rounded-full object-fill md:size-[7.75rem]"
            />

            <span className="text-center text-[0.9375rem] font-semibold leading-5 text-black md:text-base">
              {category.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
