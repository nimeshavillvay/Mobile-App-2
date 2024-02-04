import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/_components/ui/accordion";
import { Checkbox } from "@/_components/ui/checkbox";
import { Label } from "@/_components/ui/label";
import dayjs from "dayjs";
import useMyAccountFilters from "./use-my-account-filters.hook";

type FiltersProps = {
  section: Parameters<typeof useMyAccountFilters>[0];
};

const Filters = ({ section }: FiltersProps) => {
  const period =
    section === "purchased-items"
      ? {
          from: dayjs().subtract(1, "year").format("YYYY-MM-DD"),
          to: dayjs().format("YYYY-MM-DD"),
        }
      : undefined;

  const brandsFiltersQuery = useMyAccountFilters(section, "brands", period);
  const categoriesFiltersQuery = useMyAccountFilters(
    section,
    "categories",
    period,
  );
  const subCategoriesFiltersQuery = useMyAccountFilters(
    section,
    "subCategories",
    period,
  );

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="brands">
        <AccordionTrigger>Brands</AccordionTrigger>

        <AccordionContent className="space-y-2">
          <FilterList filters={brandsFiltersQuery?.data?.data?.brands} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="categories">
        <AccordionTrigger>Category</AccordionTrigger>

        <AccordionContent className="space-y-2">
          <FilterList
            filters={categoriesFiltersQuery?.data?.data?.categories}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="subCategories" className="last:border-b-0">
        <AccordionTrigger>Sub-Category</AccordionTrigger>

        <AccordionContent className="space-y-2">
          <FilterList
            filters={subCategoriesFiltersQuery?.data?.data?.subCategories}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Filters;

const FilterList = ({
  filters = [],
}: {
  filters?: {
    name: string;
    id: number;
  }[];
}) => {
  return (
    <>
      {filters.map((filter) => (
        <div key={filter.id} className="flex flex-row items-center gap-1">
          <Checkbox id={`filter-${filter.id}`} />

          <Label htmlFor={`filter-${filter.id}`}>{filter.name}</Label>
        </div>
      ))}
    </>
  );
};
