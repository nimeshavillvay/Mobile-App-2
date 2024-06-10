import { cn } from "@/_lib/utils";
import type { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { forwardRef, useId, type ComponentPropsWithoutRef } from "react";
import QuantityInputField from "./quantity-input-field";

const ZipCodeInputField = forwardRef<
  HTMLInputElement,
  Omit<ComponentPropsWithoutRef<typeof Input>, "id" | "type" | "onKeyDown"> & {
    readonly removeDefaultStyles?: boolean;
    readonly placeholder?: string;
  }
>(
  (
    { value, className, removeDefaultStyles = true, placeholder, ...delegated },
    ref,
  ) => {
    const id = useId();
    const zipCodeId = `zip-code-${id}`;

    return (
      <div>
        <Label htmlFor={zipCodeId} className="sr-only">
          Zip/Postal code
        </Label>

        <QuantityInputField
          hideLabel={true}
          ref={ref}
          removeDefaultStyles={removeDefaultStyles}
          className={cn(
            "flex-1 rounded-md text-wurth-gray-800 shadow-none",
            className,
          )}
          placeholder={placeholder}
          value={value}
          inputId={zipCodeId}
          {...delegated}
        />
      </div>
    );
  },
);
ZipCodeInputField.displayName = "ZipCodeInputField";

export default ZipCodeInputField;
