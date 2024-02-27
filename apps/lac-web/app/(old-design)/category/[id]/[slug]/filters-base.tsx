"use client";

import CheckboxList from "@/_components/checkbox-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/_components/ui/accordion";
import { FILTERS_QUERY_PREFIX } from "@/_lib/constants";
import {
  toggleCheckboxInSearchparams,
  updateSearchParams,
} from "@/_utils/client-helpers";
import { type CheckedState } from "@radix-ui/react-checkbox";
import { type ReadonlyURLSearchParams } from "next/navigation";
import type { FilterSection } from "./types";

type FiltersBaseProps = {
  sections: FilterSection[];
  searchParams?: ReadonlyURLSearchParams;
};

const FiltersBase = ({ sections, searchParams }: FiltersBaseProps) => {
  // Check which values are selected (in the search parameters)
  const consolidatedSections = sections.map((section) => {
    const selectedValues = searchParams?.getAll(
      `${FILTERS_QUERY_PREFIX}${section.id}`,
    );

    return {
      ...section,
      values: section.values.map((value) => {
        // No filters under section
        if (!selectedValues) {
          return {
            ...value,
            checked: false,
          };
        }

        return {
          ...value,
          checked: selectedValues.includes(value.id),
        };
      }),
    };
  });

  const hasSelectedFilters = consolidatedSections.some((section) =>
    section.values.some((values) => values.checked),
  );

  const onCheckedChange = (sectionId: string) => {
    return (valueId: string, checked: CheckedState) => {
      if (searchParams) {
        toggleCheckboxInSearchparams(searchParams, {
          sectionId,
          valueId,
          checked,
        });
      }
    };
  };

  const handleReset = () => {
    if (searchParams) {
      const newSearchParams = new URLSearchParams(searchParams);

      for (const key of searchParams.keys()) {
        if (key.startsWith(FILTERS_QUERY_PREFIX)) {
          newSearchParams.delete(key);
        }
      }

      updateSearchParams(newSearchParams);
    }
  };

  return (
    <Accordion type="single" collapsible asChild>
      <aside className="w-64">
        {hasSelectedFilters && (
          <button
            className="bg-brand-primary mb-3.5 min-w-0 shrink-0 text-nowrap rounded-[3px] px-5 py-1.5 text-base font-normal uppercase text-white"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

        {consolidatedSections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger>{section.heading}</AccordionTrigger>

            <AccordionContent className="space-y-2">
              <CheckboxList
                values={section.values}
                onCheckedChange={onCheckedChange(section.id)}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </aside>
    </Accordion>
  );
};

export default FiltersBase;
