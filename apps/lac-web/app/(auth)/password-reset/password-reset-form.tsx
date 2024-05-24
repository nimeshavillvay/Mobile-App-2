"use client";

import type { PasswordPolicies } from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/ui/form";
import { Input } from "@repo/web-ui/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import usePasswordResetConfirmMutation from "./use-password-reset-confirm-mutation.hook";

type PasswordResetFormProps = {
  userKey: string;
  userId: string;
  passwordPolicies: PasswordPolicies;
};

const PasswordResetForm = ({
  userKey,
  userId,
  passwordPolicies,
}: PasswordResetFormProps) => {
  const router = useRouter();

  const passwordResetSchema = z
    .object({
      password: z
        .string()
        .min(passwordPolicies.minimumLength, {
          message: `Password must be at least ${passwordPolicies.minimumLength} characters long`,
        })
        .refine(
          (value) =>
            (value.match(/\d/g) || []).length >=
            passwordPolicies.minimumNumbers,
          {
            message: `Password must contain at least ${passwordPolicies.minimumNumbers} numbers`,
          },
        )
        .refine(
          (value) =>
            (value.match(/[a-zA-Z]/g) || []).length >=
            passwordPolicies.minimumAlphabets,
          {
            message: `Password must contain at least ${passwordPolicies.minimumAlphabets} alphabet character`,
          },
        ),
      confirmPassword: z.string().min(passwordPolicies.minimumLength, {
        message: `Confirm password must be at least ${passwordPolicies.minimumLength} characters long`,
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"], // This path will highlight the confirmPassword field
    });

  type PasswordResetSchema = z.infer<typeof passwordResetSchema>;

  const form = useForm<PasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
    values: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordResetConfirmMutation = usePasswordResetConfirmMutation();

  const onPasswordResetSubmit = (formData: PasswordResetSchema) => {
    passwordResetConfirmMutation.mutate(
      {
        userKey: userKey,
        userId: userId,
        password: formData.password,
      },
      {
        onSuccess: () => {
          router.replace("/sign-in");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onPasswordResetSubmit)}
        className="mx-auto my-20 max-w-[25rem] space-y-5"
      >
        <h1 className="text-center font-title text-3xl font-medium tracking-[-0.225px] text-wurth-gray-800">
          Reset Your Password
        </h1>

        <p className="text-center text-sm text-wurth-gray-500">
          Please choose a new password to finish signing in.
          <br />
          Note: Passwords are case-sensitive
        </p>

        <div className="grid grid-cols-1">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="password" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="password" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is to confirm your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="text-right">
          <Button
            type="submit"
            className="h-9 rounded-[3px] bg-brand-primary px-4 text-base font-normal uppercase text-white"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordResetForm;