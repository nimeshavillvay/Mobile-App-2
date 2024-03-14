"use client";

import { cva } from "@/lib/cva.config";
import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps } from "cva";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

const labelVariants = cva({
  base: "ui-text-sm ui-font-medium ui-leading-none ui-text-wurth-gray-800 peer-disabled:ui-cursor-not-allowed peer-disabled:ui-opacity-70",
});

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
