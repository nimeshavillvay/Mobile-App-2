import { cva } from "@/lib/cva.config";
import { type VariantProps } from "cva";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva({
  base: "ui-inline-flex ui-items-center ui-rounded ui-border ui-border-zinc-200 ui-px-2.5 ui-py-0.5 ui-text-xs ui-font-semibold ui-transition-colors focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-zinc-950 focus:ui-ring-offset-2",
  variants: {
    variant: {
      default:
        "ui-border-transparent ui-bg-wurth-gray-800 ui-text-zinc-50 ui-shadow hover:ui-bg-wurth-gray-800/80",
      secondary:
        "ui-border-transparent ui-bg-wurth-gray-50 ui-text-wurth-gray-800 hover:ui-bg-wurth-gray-50/80",
      destructive:
        "ui-border-transparent ui-bg-red-500 ui-text-zinc-50 ui-shadow hover:ui-bg-red-500/80",
      outline: "ui-text-zinc-950",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
