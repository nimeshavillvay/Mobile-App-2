"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/_components/ui/accordion";
import { Checkbox } from "@/_components/ui/checkbox";
import { Label } from "@/_components/ui/label";

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
    <Accordion type="single" collapsible asChild>
      <aside className="w-64">
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger>{section.heading}</AccordionTrigger>

            <AccordionContent className="space-y-2">
              {section.values.map((value) => (
                <div
                  key={value.id}
                  className="flex flex-row items-center gap-1"
                >
                  <Checkbox id={value.id} disabled={!value.isActive} />

                  <Label htmlFor={value.id}>{value.name}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </aside>
    </Accordion>
  );
};

export default FiltersSelector;
