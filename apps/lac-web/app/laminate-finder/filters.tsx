"use client";

import * as FilterAccordion from "@/_components/filter-accordion";
import VisuallyHidden from "@/_components/visually-hidden";
import * as Accordion from "@radix-ui/react-accordion";

const COLORS_SECTION = "colors";

type LaminateFinderFiltersProps = {
  colors: { id: number; colorCode: string; disabled: boolean }[];
  filterSections: {
    attribute_name: string;
    name: string;
    type: "default" | "icons";
    values: {
      isActive: boolean;
      image: null | string;
      attribute_value: string;
      name: string;
      attribute_name: string;
      id: string;
      slug: string;
    }[];
  }[];
};

const LaminateFinderFilters = ({
  colors,
  filterSections,
}: LaminateFinderFiltersProps) => {
  return (
    <FilterAccordion.Root defaultValue={COLORS_SECTION}>
      <FilterAccordion.Item value={COLORS_SECTION}>
        <FilterAccordion.Header>Color</FilterAccordion.Header>

        <Accordion.Content asChild>
          <div className="grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-px">
            {colors.map((color) => (
              <button
                key={color.id}
                className="size-[15px] rounded"
                style={{ backgroundColor: color.colorCode }}
              >
                <VisuallyHidden>{color.colorCode}</VisuallyHidden>
              </button>
            ))}
          </div>
        </Accordion.Content>
      </FilterAccordion.Item>

      {filterSections.map((section) => (
        <FilterAccordion.Item
          key={section.attribute_name}
          value={section.attribute_name}
        >
          <FilterAccordion.Header>{section.name}</FilterAccordion.Header>

          <FilterAccordion.Content
            values={section.values}
            type={section.type}
          />
        </FilterAccordion.Item>
      ))}
    </FilterAccordion.Root>
  );
};

export default LaminateFinderFilters;
