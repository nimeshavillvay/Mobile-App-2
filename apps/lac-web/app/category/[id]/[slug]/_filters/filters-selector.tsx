"use client";

import CheckboxList from "@/_components/checkbox-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/_components/ui/accordion";

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
              <CheckboxList values={section.values} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </aside>
    </Accordion>
  );
};

export default FiltersSelector;
