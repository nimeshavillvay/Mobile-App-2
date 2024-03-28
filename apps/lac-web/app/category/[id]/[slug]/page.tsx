import Banner from "@/_components/banner";
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
import Balancer from "react-wrap-balancer";
import categoryImage from "./category.jpeg";
import PopularBrands from "./popular-brands";
import TopSubCategories from "./top-sub-categories";

type CategoryPageProps = {
  params: {
    id: string;
    slug: string;
  };
};

export const generateMetadata = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: { id, slug },
}: CategoryPageProps): Promise<Metadata> => {
  return {
    title: "Lorem Ipsum",
  };
};

const CategoryPage = () => {
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

      <Breadcrumb className="container hidden md:block my-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              Decorative Hardware & Wood Components
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="container md:my-10">
        <div className="overflow-hidden rounded-lg border border-wurth-gray-250 bg-white shadow-lg md:items-center md:flex md:flex-row-reverse md:max-h-[21rem]">
          <div className="aspect-h-1 aspect-w-2 md:flex-1 relative">
            <Image
              src={categoryImage}
              alt="A placeholder category"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="space-y-3 md:space-y-5 p-6 md:p-10 md:flex-1">
            <h1 className="font-title text-4xl md:text-5xl md:leading-[3.5rem] line-clamp-3 text-balance md:tracking-[-0.036rem] font-medium tracking-tight text-wurth-gray-800">
              Decorative Hardware & Wood Components
            </h1>

            <p className="text-base text-wurth-gray-800 md:text-lg md:line-clamp-3">
              Lorem ipsum dolor sit amet consectetur. Curabitur diam urna
              faucibus quisque. Pretium lectus morbi justo amet amet quisque
              ipsum elementum ut. Tincidunt pellentesque ipsum ac dignissim
              lectus id.
            </p>
          </div>
        </div>
      </section>

      <section className="container my-10 space-y-6 md:space-y-9 md:my-16">
        <CategoriesGrid />

        <Collapsible className="flex flex-col gap-6 space-y-6 md:space-y-9">
          <CollapsibleContent asChild>
            <CategoriesGrid />
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
      </section>

      <TopSubCategories />

      <PopularBrands />

      <Banner />
    </>
  );
};

export default CategoryPage;

const CategoriesGrid = () => {
  return (
    <div className="grid grid-cols-3 justify-items-center gap-y-10 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <article key={index} className="flex flex-col items-center gap-4">
          <div className="size-28 rounded-full bg-[linear-gradient(180deg,#FBFDFF_0%,#F0F3FB_100%)]" />

          <h2 className="text-center text-[0.9375rem] font-semibold leading-5 text-black">
            <Balancer>Bathroom Stall Hardware</Balancer>
          </h2>
        </article>
      ))}
    </div>
  );
};
