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
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";

type ZipCodeInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  readonly control: Control<TFieldValues>;
  readonly name: TName;
  readonly label?: string;
  readonly description?: string;
  readonly disabled?: boolean;
};

export const ZipCodeInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label = "Zip Code",
  description = "This is your zip code.",
  disabled = false,
}: ZipCodeInputProps<TFieldValues, TName>) => {
  const { trigger } = useFormContext();
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
              type="text"
              autoComplete="postal-code"
              disabled={disabled}
              {...field}
              onSubmit={() => {
                trigger(name);
              }}
              mask="_____"
              replacement={{ _: /\d/ }}
              data-testid={`input-${name}`}
            />
          </FormControl>
          <FormDescription className="sr-only">{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
