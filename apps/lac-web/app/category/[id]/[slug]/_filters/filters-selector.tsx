"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Label from "@radix-ui/react-label";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const NO_SHOWN_VALUES = 10; // Number of filter to show by default

type Value = {
  id: string;
  name: string;
  isActive: boolean;
};
type Section = {
  id: string;
  heading: string;
  values: Value[];
};
type FiltersSelectorProps = {
  sections: Section[];
};

const FiltersSelector = ({ sections }: FiltersSelectorProps) => {
  return (
    <Accordion.Root type="single" collapsible asChild>
      <aside className="w-64">
        {sections.map((section) => (
          <Accordion.Item key={section.id} value={section.id}>
            <Accordion.Header>
              <Accordion.Trigger className="text-brand-primary">
                {section.heading}
              </Accordion.Trigger>
            </Accordion.Header>

            <AccordionContent section={section} />
          </Accordion.Item>
        ))}
      </aside>
    </Accordion.Root>
  );
};

export default FiltersSelector;

const AccordionContent = ({ section }: { section: Section }) => {
  const visibleValues = section.values
    .filter((value) => value.isActive)
    .slice(0, NO_SHOWN_VALUES);
  const hiddenValues = section.values
    .filter((value) => value.isActive)
    .slice(NO_SHOWN_VALUES);
  const inactiveValues = section.values.filter((value) => !value.isActive);

  const [open, setOpen] = useState(false);

  return (
    <Accordion.Content>
      {visibleValues.map((value) => (
        <Filter key={value.id} sectionId={section.id} value={value} />
      ))}

      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Content>
          {hiddenValues.map((value) => (
            <Filter key={value.id} sectionId={section.id} value={value} />
          ))}

          {inactiveValues.map((value) => (
            <Filter key={value.id} sectionId={section.id} value={value} />
          ))}
        </Collapsible.Content>

        <Collapsible.Trigger asChild>
          <button className="text-brand-primary">
            {open ? "less" : "more..."}
          </button>
        </Collapsible.Trigger>
      </Collapsible.Root>
    </Accordion.Content>
  );
};

const Filter = ({ sectionId, value }: { sectionId: string; value: Value }) => {
  return (
    <div className="flex flex-row items-center gap-2" key={value.id}>
      <Checkbox.Root
        className="data-[disabled]:bg-brand-light-gray data-[state=checked]:bg-brand-secondary data-[state=checked]:border-brand-secondary border-brand-light-gray grid h-[25px] w-[25px] place-items-center border"
        id={`filter-${sectionId}-${value.id}`}
        disabled={!value.isActive}
      >
        <Checkbox.Indicator className="text-white">
          <FaCheck />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <Label.Root
        htmlFor={`filter-${sectionId}-${value.id}`}
        className="capitalize"
      >
        {value.name}
      </Label.Root>
    </div>
  );
};
