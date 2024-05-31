import { cn } from "@/_lib/utils";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { forwardRef, useId, type ComponentPropsWithoutRef } from "react";

const QuantityInputField = forwardRef<
  HTMLInputElement,
  Omit<ComponentPropsWithoutRef<typeof Input>, "id" | "type" | "onKeyDown"> & {
    readonly removeDefaultStyles?: boolean;
  }
>(({ value, className, removeDefaultStyles = false, ...delegated }, ref) => {
  const id = useId();
  const quantityId = `quantity-${id}`;

  return (
    <div>
      <Label htmlFor={quantityId} className="sr-only">
        Quantity
      </Label>

      <Input
        ref={ref}
        id={quantityId}
        type="number"
        value={value}
        className={cn(
          !removeDefaultStyles &&
            "flex-1 rounded-sm border-0 p-0 text-center text-lg font-semibold text-wurth-gray-800 shadow-none",
          className,
        )}
        onKeyDown={(event) => {
          if (
            event.code === "Minus" || // Disable "-"
            event.code === "KeyE" || // Disable "e"
            event.key === "#" || // Disable "#"
            event.key === "+" || // Disable "+"
            (value &&
              value.toString().length >= 5 &&
              event.code !== "Backspace") || // Limit to 5 characters
            (value !== undefined &&
              value.toString().length === 0 &&
              event.key === "0") || // Disable "0" as first character
            event.key === "." // Disable "."
          ) {
            event.preventDefault();
          }
        }}
        {...delegated}
      />
    </div>
  );
});
QuantityInputField.displayName = "QuantityInputField";

export default QuantityInputField;
