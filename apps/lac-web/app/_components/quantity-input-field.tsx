import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { forwardRef, useId, type ComponentProps } from "react";

const QuantityInputField = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<typeof Input>, "id" | "type" | "className">
>((props, ref) => {
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
        className="flex-1 rounded-sm border-0 p-0 text-center text-lg font-semibold text-wurth-gray-800 shadow-none"
        {...props}
      />
    </div>
  );
});
QuantityInputField.displayName = "QuantityInputField";

export default QuantityInputField;
