import { Button } from "@repo/web-ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import Title from "./Title";

const FeaturedCategories = () => {
  return (
    <section className="container my-14 space-y-6">
      <Title>Featured Categories</Title>

      <div className="grid grid-cols-3 gap-x-4 gap-y-10 pb-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <article key={index} className="flex flex-col items-center gap-4">
            <div className="size-28 rounded-full bg-wurth-gray-400" />

            <div className="text-center text-[0.9375rem] font-semibold leading-5 text-black">
              Bathroom Stall Hardware
            </div>
          </article>
        ))}
      </div>

      <Collapsible className="flex flex-col items-center space-y-6">
        <CollapsibleContent className="grid grid-cols-3 gap-x-4 gap-y-10 pb-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <article key={index} className="flex flex-col items-center gap-4">
              <div className="size-28 rounded-full bg-wurth-gray-400" />

              <div className="text-center text-[0.9375rem] font-semibold leading-5 text-black">
                Bathroom Stall Hardware
              </div>
            </article>
          ))}
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
