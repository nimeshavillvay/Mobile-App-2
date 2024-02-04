"use client";

import { cn } from "@/_utils/helpers";
import * as RadixSelect from "@radix-ui/react-select";
import { type ComponentProps } from "react";
import { MdCheck, MdOutlineArrowDropDown } from "react-icons/md";

export const Root = (props: ComponentProps<typeof RadixSelect.Root>) => {
  return <RadixSelect.Root {...props} />;
};

export const Trigger = ({
  children,
  className,
  placeholder,
  ...delegated
}: ComponentProps<typeof RadixSelect.Trigger> & {
  placeholder: ComponentProps<typeof RadixSelect.Value>["placeholder"];
}) => {
  return (
    <RadixSelect.Trigger
      className={cn(
        "border-brand-dark-gray text-brand-very-dark-gray flex flex-row items-center justify-between gap-2 rounded-sm border px-1.5 text-[14px] leading-5",
        className,
      )}
      {...delegated}
    >
      <RadixSelect.Value placeholder={placeholder}>
        {children}
      </RadixSelect.Value>

      <RadixSelect.Icon>
        <MdOutlineArrowDropDown />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
};

export const Content = ({
  children,
  className,
  ...delegated
}: ComponentProps<typeof RadixSelect.Content>) => {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        className={cn(
          "border border-black/[0.13] bg-white shadow-[0_1px_6px_0px] shadow-black/10",
          className,
        )}
        {...delegated}
      >
        <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
};

export const Item = ({
  children,
  className,
  ...delegated
}: ComponentProps<typeof RadixSelect.Item>) => {
  return (
    <RadixSelect.Item
      className={cn(
        "text-brand-very-dark-gray data-[highlighted]:bg-brand-primary/5 flex flex-row items-center justify-between px-1.5 text-[14px] leading-5",
        className,
      )}
      {...delegated}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>

      <RadixSelect.ItemIndicator>
        <MdCheck />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
};
