"use client";

import { cn, getMediaUrl } from "@/_utils/helpers";
import * as Accordion from "@radix-ui/react-accordion";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Label from "@radix-ui/react-label";
import Image from "next/image";
import { useState, type ComponentProps, type ReactNode } from "react";
import { FaCheck } from "react-icons/fa";

type CheckboxType = "default" | "icons";
type Value = {
  id: string;
  name: string;
  isActive: boolean;
  attribute_name: string;
  image?: string | null;
};

const NO_OF_SHOWN_VALUES = 10; // Number of filter to show by default

export const Root = ({
  defaultValue,
  children,
}: {
  defaultValue?: string;
  children?: ReactNode;
}) => {
  return (
    <Accordion.Root
      type="single"
      collapsible
      asChild
      defaultValue={defaultValue}
    >
      <aside className="w-64">{children}</aside>
    </Accordion.Root>
  );
};

export const Item = ({
  value,
  children,
}: {
  value: ComponentProps<typeof Accordion.Item>["value"];
  children?: ReactNode;
}) => {
  return <Accordion.Item value={value}>{children}</Accordion.Item>;
};

export const Header = ({ children }: { children?: ReactNode }) => {
  return (
    <Accordion.Header>
      <Accordion.Trigger className="text-brand-primary">
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  );
};

export const Content = <T extends Value>({
  values,
  type,
}: {
  values: T[];
  type: CheckboxType;
}) => {
  const visibleValues = values
    .filter((value) => value.isActive)
    .slice(0, NO_OF_SHOWN_VALUES);
  const hiddenValues = values
    .filter((value) => value.isActive)
    .slice(NO_OF_SHOWN_VALUES);
  const inactiveValues = values.filter((value) => !value.isActive);
  const lengthOfHiddenContent = hiddenValues.length + inactiveValues.length;

  const [open, setOpen] = useState(false);

  return (
    <Accordion.Content
      className={cn(
        "grid gap-2",
        type === "icons" ? "grid-cols-2" : "grid-cols-1",
      )}
    >
      {visibleValues.map((value) => (
        <Filter
          key={value.id}
          sectionId={value.attribute_name}
          value={value}
          type={type}
        />
      ))}

      {!!lengthOfHiddenContent && (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
          <Collapsible.Content
            className={cn(
              "grid gap-2",
              type === "icons" ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {hiddenValues.map((value) => (
              <Filter
                key={value.id}
                sectionId={value.attribute_name}
                value={value}
                type={type}
              />
            ))}

            {inactiveValues.map((value) => (
              <Filter
                key={value.id}
                sectionId={value.attribute_name}
                value={value}
                type={type}
              />
            ))}
          </Collapsible.Content>

          <Collapsible.Trigger asChild>
            <button className="text-brand-primary">
              {open ? "less" : "more..."}
            </button>
          </Collapsible.Trigger>
        </Collapsible.Root>
      )}
    </Accordion.Content>
  );
};

const Filter = ({
  sectionId,
  value,
  type,
}: {
  sectionId: string;
  value: Value;
  type: CheckboxType;
}) => {
  if (type === "default") {
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
  }

  if (type === "icons") {
    return (
      <Checkbox.Root
        key={value.id}
        id={value.id}
        className="relative rounded border border-black p-2"
      >
        <Checkbox.Indicator className="bg-brand-secondary absolute left-2 top-2 size-[15px] text-white">
          <FaCheck />
        </Checkbox.Indicator>

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

        <Label.Root htmlFor={value.id} className="cursor-pointer">
          {value.name}
        </Label.Root>
      </Checkbox.Root>
    );
  }

  return null;
};
