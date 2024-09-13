import { cn } from "@/_lib/utils";
import {
  Input,
  type InputProps,
} from "@repo/web-ui/components/base/atoms/input";
import { forwardRef } from "react";

type FederalTaxIdInputProps = Omit<InputProps, "type"> & {
  readonly onChange?: (value: string) => void;
};

const FederalTaxIdInput = forwardRef<HTMLInputElement, FederalTaxIdInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        type="text"
        className={cn("pr-10", className)}
        ref={ref}
        aria-label="Federal Tax ID"
        maxLength={10}
        placeholder="00-0000000"
        {...props}
        mask="__-_______"
        replacement={{ _: /\d/ }}
      />
    );
  },
);

FederalTaxIdInput.displayName = "FederalTaxIdInput";

export { FederalTaxIdInput };
export type { FederalTaxIdInputProps };
