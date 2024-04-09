import { cva, type VariantProps } from "@/lib/cva.config";
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

const alertVariants = cva({
  base: "ui-relative ui-flex ui-w-full ui-flex-row ui-items-center ui-gap-2 ui-rounded ui-px-3 ui-py-2.5 ui-text-sm",
  variants: {
    variant: {
      default:
        "ui-bg-wurth-gray-50 ui-text-wurth-gray-800 [&>svg]:ui-stroke-wurth-gray-800",
      destructive:
        "ui-bg-red-50 ui-text-wurth-red-650 [&>svg]:ui-stroke-wurth-red-650",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ui-space-y-1", className)} {...props} />
  ),
);
AlertContent.displayName = "AlertContent";

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("ui-text-sm ui-font-medium", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ui-text-xs", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertContent, AlertDescription, AlertTitle };
