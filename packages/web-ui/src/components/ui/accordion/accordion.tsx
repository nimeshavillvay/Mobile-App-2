"use client";

import ChevronDown from "@/components/icons/chevron-down";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = AccordionPrimitive.Item;

const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="ui-flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "ui-flex ui-flex-1 ui-items-center ui-gap-2 ui-p-2 ui-text-left ui-text-sm ui-font-semibold ui-text-black ui-transition-all hover:ui-underline [&[data-state=open]>svg]:ui-rotate-180",
        className,
      )}
      {...props}
    >
      <ChevronDown className="ui-h-4 ui-w-4 ui-shrink-0 ui-transition-transform ui-duration-200" />
      <span>{children}</span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="ui-overflow-hidden ui-text-sm data-[state=closed]:ui-animate-accordion-up data-[state=open]:ui-animate-accordion-down"
    {...props}
  >
    <div className={cn("ui-px-1 ui-pb-4 ui-pt-3", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
