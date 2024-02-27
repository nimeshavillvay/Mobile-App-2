"use client";

import CheckboxList from "@/_components/checkbox-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/_components/ui/accordion";
import { Label } from "@/_components/ui/label";
import VisuallyHidden from "@/_components/visually-hidden";
import { FILTERS_QUERY_PREFIX } from "@/_lib/constants";
import { toggleCheckboxInSearchparams } from "@/_utils/client-helpers";
import { cn, getMediaUrl } from "@/_utils/helpers";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type CheckedState } from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import Image from "next/image";
import { type ReadonlyURLSearchParams } from "next/navigation";

const COLORS_SECTION = "colors";

type FiltersBaseProps = {
  colors: { id: number; colorCode: string; disabled: boolean }[];
  sections: {
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
  searchParams?: ReadonlyURLSearchParams;
};

const Filters = ({ colors, sections, searchParams }: FiltersBaseProps) => {
  const consolidatedSections = sections.map((section) => {
    const selectedValues = searchParams?.getAll(
      `${FILTERS_QUERY_PREFIX}${section.attribute_name}`,
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

  return (
    <Accordion type="single" collapsible asChild defaultValue={COLORS_SECTION}>
      <aside className="w-64">
        <AccordionItem value={COLORS_SECTION}>
          <AccordionTrigger>Color</AccordionTrigger>

          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        {consolidatedSections.map((section) => (
          <AccordionItem
            key={section.attribute_name}
            value={section.attribute_name}
          >
            <AccordionTrigger>{section.name}</AccordionTrigger>

            <AccordionContent
              className={cn(
                section.type === "icons"
                  ? "grid grid-cols-2 place-content-stretch gap-2"
                  : "space-y-2",
              )}
            >
              {section.type === "icons" ? (
                section.values.map((value) => (
                  <CheckboxPrimitive.Root
                    key={value.id}
                    id={value.id}
                    className="relative rounded border border-black p-2"
                    checked={value.checked}
                    onCheckedChange={(checked) =>
                      onCheckedChange(section.attribute_name)(value.id, checked)
                    }
                  >
                    <CheckboxPrimitive.Indicator className="bg-brand-secondary absolute left-2 top-2 size-[15px] text-white">
                      <Check />
                    </CheckboxPrimitive.Indicator>

                    {value.image ? (
                      <Image
                        src={getMediaUrl(value.image)}
                        alt={`The logo of ${value.name}`}
                        width={88}
                        height={88}
                        className="mx-auto size-[88px] object-contain"
                      />
                    ) : (
                      <div className="mx-auto size-[88px]" />
                    )}

                    <Label htmlFor={value.id} className="cursor-pointer">
                      {value.name}
                    </Label>
                  </CheckboxPrimitive.Root>
                ))
              ) : (
                <CheckboxList
                  values={section.values}
                  onCheckedChange={onCheckedChange(section.attribute_name)}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </aside>
    </Accordion>
  );
};

export default Filters;
