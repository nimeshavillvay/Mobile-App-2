import { toCamelCase } from "@/_lib/utils";
import { Input } from "@repo/web-ui/components/base/atoms/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/base/molecules/form";
import React from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

type PhoneNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  readonly control: Control<TFieldValues>;
  readonly name: TName;
  readonly label?: string;
  readonly description?: string;
  readonly disabled?: boolean;
};

export const PhoneNumberInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label = "Phone Number",
  description = "This is your phone number.",
  disabled = false,
}: PhoneNumberInputProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              required
              type="tel"
              autoComplete="tel"
              disabled={disabled}
              {...field}
              mask="(___) ___-____"
              replacement={{ _: /\d/ }}
              data-testid={`input-${toCamelCase(name)}`}
            />
          </FormControl>
          <FormDescription className="sr-only">{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
