import { Button } from "@repo/web-ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import Title from "./Title";

const FeaturedCategories = () => {
  return (
    <section className="container my-14 space-y-6 md:my-20 md:space-y-9">
      <Title>Featured Categories</Title>

      <CategoriesGrid />

      <Collapsible className="flex flex-col space-y-6 md:space-y-9">
        <CollapsibleContent asChild>
          <CategoriesGrid />
        </CollapsibleContent>

        <CollapsibleTrigger asChild>
          <Button
            variant="cancel"
            className="mx-auto py-2.5 font-bold text-black"
          >
            View all categories
          </Button>
        </CollapsibleTrigger>
      </Collapsible>
    </section>
  );
};

export default FeaturedCategories;

const CategoriesGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-10 pb-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9">
      {Array.from({ length: 9 }).map((_, index) => (
        <article
          key={index}
          className="flex flex-col items-center gap-4 md:gap-2"
        >
          <div className="size-28 rounded-full bg-wurth-gray-400 md:size-[7.75rem]" />

          <div className="text-center text-[0.9375rem] font-semibold leading-5 text-black md:text-base">
            Bathroom Stall Hardware
          </div>
        </article>
      ))}
    </div>
  );
};
