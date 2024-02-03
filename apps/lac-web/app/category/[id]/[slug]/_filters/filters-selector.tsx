"use client";

import * as FilterAccordion from "@/_components/filter-accordion";

type FiltersSelectorProps = {
  sections: {
    id: string;
    heading: string;
    values: {
      id: string;
      name: string;
      isActive: boolean;
    }[];
  }[];
};

const FiltersSelector = ({ sections }: FiltersSelectorProps) => {
  return (
    <FilterAccordion.Root>
      {sections.map((section) => (
        <FilterAccordion.Item key={section.id} value={section.id}>
          <FilterAccordion.Header>{section.heading}</FilterAccordion.Header>

          <FilterAccordion.Content
            values={section.values.map((value) => ({
              ...value,
              attribute_name: section.id,
            }))}
            type="default"
          />
        </FilterAccordion.Item>
      ))}
    </FilterAccordion.Root>
  );
};

export default FiltersSelector;
