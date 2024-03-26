import ChevronLeft from "@repo/web-ui/components/icons/chevron-left";
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
      <div className="md:hidden my-2 container">
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

      <section className="container">
        <div className="border border-wurth-gray-250 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-w-2 aspect-h-1">
            <Image
              src={categoryImage}
              alt="A placeholder category"
              width={664}
              height={336}
              className="object-cover"
            />
          </div>

          <div className="p-6 space-y-3">
            <h1 className="font-title text-4xl text-wurth-gray-800 font-medium tracking-tight">
              <Balancer>Decorative Hardware & Wood Components</Balancer>
            </h1>

            <p className="text-wurth-gray-800 text-base">
              Lorem ipsum dolor sit amet consectetur. Curabitur diam urna
              faucibus quisque. Pretium lectus morbi justo amet amet quisque
              ipsum elementum ut. Tincidunt pellentesque ipsum ac dignissim
              lectus id.
            </p>
          </div>
        </div>
      </section>

      <section className="my-10 container space-y-6">
        <CategoriesGrid />

        <Collapsible className="flex flex-col gap-6">
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
    </>
  );
};

export default CategoryPage;

const CategoriesGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-y-10 justify-items-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <article key={index} className="space-y-4">
          <div className="rounded-full size-28 bg-[linear-gradient(180deg,#FBFDFF_0%,#F0F3FB_100%)]" />

          <h2 className="text-center text-black text-[0.9375rem] leading-5 font-semibold">
            <Balancer>Bathroom Stall Hardware</Balancer>
          </h2>
        </article>
      ))}
    </div>
  );
};
