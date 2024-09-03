"use client";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import useCheckUsernameMutation from "@/_hooks/user/use-check-username-mutation.hook";
import { isErrorResponse } from "@/_lib/utils";
import { Input } from "@repo/web-ui/components/base/atoms/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/base/molecules/form";
import React, { useRef, useState } from "react";
import {
  useFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type UsernameInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  readonly control: Control<TFieldValues>;
  readonly name: TName;
  readonly label?: string;
  readonly description?: string;
  readonly disabled?: boolean;
};

export const UsernameInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label = "Requested User ID",
  description = "This is your username.",
  disabled = false,
}: UsernameInputProps<TFieldValues, TName>) => {
  const [username, setUsername] = useState("");
  const delayedUsername = useDebouncedState(username, 1000);
  const lastCheckedUsername = useRef("");
  const checkUsernameMutation = useCheckUsernameMutation();
  const { trigger, setError, clearErrors, formState } = useFormContext();

  const checkUsername = async (value: string) => {
    if (!value) {
      lastCheckedUsername.current = "";
      clearErrors(name);
      return;
    }
    if (value !== lastCheckedUsername.current && !formState.errors[name]) {
      lastCheckedUsername.current = value;
      checkUsernameMutation.mutate(value, {
        onSuccess: () => {
          clearErrors(name);
        },
        onError: async (error) => {
          if (error?.response?.status === 400) {
            const errorResponse = await error.response.json();
            if (
              isErrorResponse(errorResponse) &&
              errorResponse["status_code"] === "FAILED"
            ) {
              setError(name, {
                type: "manual",
                message:
                  "The User ID you entered already exists. Please enter a new User ID",
              });
            } else {
              setError(name, {
                type: "manual",
                message: "The User Id check failed, Please try again",
              });
            }
          }
        },
      });
    }
  };

  if (delayedUsername !== lastCheckedUsername.current) {
    checkUsername(delayedUsername);
  }
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              autoComplete={name}
              required
              disabled={disabled || checkUsernameMutation.isPending}
              onChange={(e) => {
                field.onChange(e);
                setUsername(e.target.value);
                trigger(name);
              }}
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
