import { forwardRef, useState } from "react";
import { Input, type InputProps } from "~/components/base/atoms/input";
import { cn } from "~/lib/utils";

type FederalTaxIdInputProps = Omit<InputProps, "type"> & {
  readonly onChange?: (value: string) => void;
};

const FederalTaxIdInput = forwardRef<HTMLInputElement, FederalTaxIdInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(
      (props.value as string) || "",
    );

    const formatTaxId = (input: string) => {
      const digitsOnly = input.replace(/\D/g, "");
      if (digitsOnly.length <= 2) {
        return digitsOnly;
      } else {
        return `${digitsOnly.slice(0, 2)}-${digitsOnly.slice(2, 9)}`;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = formatTaxId(e.target.value);
      setDisplayValue(newValue);
      onChange?.(newValue);
    };

    return (
      <div className="relative">
        <Input
          type="text"
          value={displayValue}
          onChange={handleChange}
          className={cn("pr-10", className)}
          ref={ref}
          aria-label="Federal Tax ID"
          maxLength={10}
          placeholder="00-0000000"
          {...props}
        />
        <style>{`
          input[type="text"]::-ms-clear,
          input[type="text"]::-ms-reveal {
            display: none;
            width: 0;
            height: 0;
          }
        `}</style>
      </div>
    );
  },
);

FederalTaxIdInput.displayName = "FederalTaxIdInput";

export { FederalTaxIdInput };
export type { FederalTaxIdInputProps };
