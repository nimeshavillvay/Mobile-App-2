import { forwardRef, type ComponentProps } from "react";
import { Input } from "tamagui";

export const NumericInput = forwardRef<Input, ComponentProps<typeof Input>>(
  ({ ...delegated }, ref) => {
    return (
      <Input
        ref={ref}
        keyboardType="numeric"
        inputMode="numeric"
        textAlign="center"
        {...delegated}
      />
    );
  },
);
NumericInput.displayName = "NumericInput";
