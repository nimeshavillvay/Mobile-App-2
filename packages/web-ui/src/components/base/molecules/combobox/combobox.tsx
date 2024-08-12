"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import type * as React from "react";

import { Button } from "~/components/base/atoms/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/base/molecules/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

type Framework = {
  value: string;
  label: string;
};

type ComboboxProps = {
  readonly value: string;
  readonly onSelect: (value: string) => void;
  readonly frameworks: Framework[];
  readonly open: boolean;
  readonly setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readonly placeholder?: string;
  readonly containerClassName?: string;
};

export const Combobox = ({
  value,
  onSelect,
  frameworks,
  open,
  setOpen,
  placeholder = "Select framework...",
  containerClassName,
}: ComboboxProps) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", containerClassName)}
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    // Call the onSelect callback from the parent component
                    onSelect(currentValue === value ? "" : currentValue);
                    setOpen(false); // Close the dropdown
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
