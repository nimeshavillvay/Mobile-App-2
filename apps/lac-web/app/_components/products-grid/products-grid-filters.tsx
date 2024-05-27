"use client";

import type { Filters } from "@/_lib/types";
import { type CheckedState } from "@radix-ui/react-checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/web-ui/components/ui/accordion";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import { Label } from "@repo/web-ui/components/ui/label";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { useId } from "react";
import { useFilterParams } from "./use-filter-params.hook";

export const ProductsGridFilters = ({
  filters,
}: {
  readonly filters: Filters[];
}) => {
  const id = useId();
  const getCheckboxId = (filterId: string, valueId: number) => {
    return `${id}-checkbox-${filterId}-${valueId}`;
  };

  const { selectedValues, searchParams } = useFilterParams(filters);

  const checkIsChecked = (attributeId: string, valueId: number) => {
    return !!selectedValues[attributeId]?.values.find(
      (value) => value.id === valueId.toString(),
    );
  };

  const toggleCheck = (
    attributeId: string,
    valueId: number,
    checked: CheckedState,
  ) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);

    if (checked === true) {
      newUrlSearchParams.append(attributeId, valueId.toString());
    } else {
      newUrlSearchParams.delete(attributeId, valueId.toString());
    }

    window.history.pushState(null, "", `?${newUrlSearchParams.toString()}`);
  };

  return (
    <aside className="w-[14.75rem] space-y-1">
      <h4 className="px-3 text-sm text-wurth-gray-800">Filters</h4>

      <Accordion type="single" collapsible className="space-y-1">
        {filters.map((filter) => (
          <AccordionItem key={filter.id} value={filter.id}>
            <AccordionTrigger>{filter.filter}</AccordionTrigger>

            <AccordionContent>
              <ul>
                {filter.values.map((value) => (
                  <li
                    key={value.id}
                    className="flex flex-row items-center gap-2 p-1"
                  >
                    <Checkbox
                      id={getCheckboxId(filter.id, value.id)}
                      checked={checkIsChecked(filter.id, value.id)}
                      onCheckedChange={(checked) =>
                        toggleCheck(filter.id, value.id, checked)
                      }
                    />

                    <Label htmlFor={getCheckboxId(filter.id, value.id)}>
                      {value.value}
                    </Label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};

export const ProductsGridFiltersSkeleton = () => {
  return <Skeleton className="h-[109rem] w-[14.75rem]" />;
};
