import { cn } from "@/_lib/utils";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { forwardRef, useId, type ComponentPropsWithoutRef } from "react";

const ALLOWED_KEYS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
];

const ZipCodeInputField = forwardRef<
  HTMLInputElement,
  Omit<ComponentPropsWithoutRef<typeof Input>, "id" | "type" | "onKeyDown"> & {
    readonly removeDefaultStyles?: boolean;
  }
>(({ value, className, removeDefaultStyles = false, ...delegated }, ref) => {
  const id = useId();
  const zipCodeId = `zip-code-${id}`;

  return (
    <div>
      <Label htmlFor={zipCodeId} className="sr-only">
        Zip/Postal code
      </Label>

      <Input
        ref={ref}
        id={zipCodeId}
        type="number"
        value={value}
        className={cn(
          !removeDefaultStyles &&
            "flex-1 rounded-md text-wurth-gray-800 shadow-none",
          className,
        )}
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
        onKeyDown={(event) => {
          if (
            !ALLOWED_KEYS.includes(event.key) ||
            (value &&
              value.toString().length >= 5 &&
              event.key !== "Backspace") || // Limit to 5 characters
            (value !== undefined &&
              value.toString().length === 0 &&
              event.key === "0") // Disable "0" as first character
          ) {
            event.preventDefault();
          }
        }}
        {...delegated}
      />
    </div>
  );
});
ZipCodeInputField.displayName = "ZipCodeInputField";

export default ZipCodeInputField;
