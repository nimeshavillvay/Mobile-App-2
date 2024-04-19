"use client";

import { cva } from "@/lib/cva.config";
import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { type ComponentProps } from "react";

const labelVariants = cva({
  base: "ui-text-sm ui-font-medium ui-leading-none ui-text-wurth-gray-800 peer-disabled:ui-cursor-not-allowed peer-disabled:ui-opacity-70",
});

const Label = ({
  className = "",
  ...delegated
}: ComponentProps<typeof LabelPrimitive.Root>) => {
  return (
    <LabelPrimitive.Root
      className={cn(labelVariants(), className)}
      {...delegated}
    />
  );
};

export { Label };
