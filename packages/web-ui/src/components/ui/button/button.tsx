import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../../lib/utils";

const buttonVariants = cva(
  "ui-inline-flex ui-items-center ui-justify-center ui-whitespace-nowrap ui-rounded-md ui-text-sm ui-font-medium ui-ring-offset-white ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-gray-950 focus-visible:ui-ring-offset-2 disabled:ui-pointer-events-none disabled:ui-opacity-50",
  {
    variants: {
      variant: {
        default: "ui-bg-gray-900 ui-text-gray-50 hover:ui-bg-gray-900/90",
        destructive: "ui-bg-red-500 ui-text-gray-50 hover:ui-bg-red-500/90",
        outline:
          "ui-border ui-border-gray-200 ui-bg-white hover:ui-bg-gray-100 hover:ui-text-gray-900",
        secondary: "ui-bg-gray-100 ui-text-gray-900 hover:ui-bg-gray-100/80",
        ghost: "hover:ui-bg-gray-100 hover:ui-text-gray-900",
        link: "ui-text-gray-900 ui-underline-offset-4 hover:ui-underline",
      },
      size: {
        default: "ui-h-10 ui-px-4 ui-py-2",
        sm: "ui-h-9 ui-rounded-md ui-px-3",
        lg: "ui-h-11 ui-rounded-md ui-px-8",
        icon: "ui-h-10 ui-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
