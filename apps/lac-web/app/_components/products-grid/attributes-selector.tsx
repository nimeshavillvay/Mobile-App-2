import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/web-ui/components/ui/accordion";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import { Label } from "@repo/web-ui/components/ui/label";
import { useId } from "react";
import type { Filter } from "./types";

type AttributesSelectorProps = {
  filters: Filter[];
};

const AttributesSelector = ({ filters }: AttributesSelectorProps) => {
  const id = useId();

  const getCheckboxId = (filterId: string, valueId: string) => {
    return `${id}-checkbox-${filterId}-${valueId}`;
  };

  return (
    <aside className="w-[14.75rem] space-y-1">
      <h4 className="px-3 text-sm text-wurth-gray-800">Filters</h4>

      <Accordion type="single" collapsible className="space-y-1">
        {filters.map((filter) => (
          <AccordionItem key={filter.id} value={filter.id}>
            <AccordionTrigger>{filter.title}</AccordionTrigger>

            <AccordionContent>
              <ul>
                {filter.values.map((value) => (
                  <li
                    key={value.id}
                    className="flex flex-row items-center gap-2 p-1"
                  >
                    <Checkbox id={getCheckboxId(filter.id, value.id)} />

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

export default AttributesSelector;
