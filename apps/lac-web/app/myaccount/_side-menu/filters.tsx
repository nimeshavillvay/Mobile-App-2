import * as Accordion from "@radix-ui/react-accordion";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Label from "@radix-ui/react-label";
import dayjs from "dayjs";
import { type ReactNode } from "react";
import { FaCheck } from "react-icons/fa";
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
    <Accordion.Root type="single">
      <Accordion.Item value="brands">
        <AccordionTrigger>Brands</AccordionTrigger>

        <AccordionContent filters={brandsFiltersQuery?.data?.data?.brands} />
      </Accordion.Item>

      <Accordion.Item value="categories">
        <AccordionTrigger>Category</AccordionTrigger>

        <AccordionContent
          filters={categoriesFiltersQuery?.data?.data?.categories}
        />
      </Accordion.Item>

      <Accordion.Item value="subCategories">
        <AccordionTrigger>Sub-Category</AccordionTrigger>

        <AccordionContent
          filters={subCategoriesFiltersQuery?.data?.data?.subCategories}
        />
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default Filters;

const AccordionTrigger = ({ children }: { children: ReactNode }) => {
  return (
    <Accordion.Header>
      <Accordion.Trigger>{children}</Accordion.Trigger>
    </Accordion.Header>
  );
};

const AccordionContent = ({
  filters = [],
}: {
  filters?: {
    name: string;
    id: number;
  }[];
}) => {
  return (
    <Accordion.Content>
      {filters.map((filter) => (
        <div key={filter.id} className="flex flex-row items-center gap-2">
          <Checkbox.Root
            className="data-[state=checked]:bg-brand-secondary data-[state=checked]:border-brand-secondary grid h-[25px] w-[25px] place-items-center border border-black"
            id={`filter-${filter.id}`}
          >
            <Checkbox.Indicator className="text-white">
              <FaCheck />
            </Checkbox.Indicator>
          </Checkbox.Root>

          <Label.Root htmlFor={`filter-${filter.id}`} className="capitalize">
            {filter.name}
          </Label.Root>
        </div>
      ))}
    </Accordion.Content>
  );
};
