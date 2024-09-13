import type { Step } from "@/(auth)/register/_components/register-new-user/register-new-user";
import { PhoneNumberInput } from "@/_components/molecules/phone-number-input/phone-number-input";
import {
  StepContainer,
  StepContainerClosed,
  StepContainerOpen,
} from "@/_components/molecules/step-container/step-container";
import { UsernameInput } from "@/_components/molecules/username-input/username-input";
import { cn } from "@/_lib/utils";
import { Input } from "@repo/web-ui/components/base/atoms/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/base/molecules/form";
import { PasswordInput } from "@repo/web-ui/components/base/molecules/password-input";
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { NewUserFormData } from "../register-schema";

type NewUserPersonalInformationStepProps = {
  readonly form: UseFormReturn<NewUserFormData>;
  readonly currentStep: Step;
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  readonly isPending: boolean;
  readonly formId: string;
  readonly title: string;
  readonly userType: string;
  readonly setStep: (step: Step) => void;
};

export const NewUserPersonalInformation = ({
  form,
  currentStep,
  onSubmit,
  isPending,
  formId,
  title,
  userType,
  setStep,
}: NewUserPersonalInformationStepProps) => {
  const totalSteps = userType === "Homeowner" ? 2 : 3;
  return (
    <StepContainer
      title={title}
      state={currentStep === "personal" ? "open" : "closed"}
    >
      <StepContainerOpen
        steps={{ current: 1, total: totalSteps }}
        allFieldsRequired
        submitBtnText="Continue"
        onSubmit={onSubmit}
        disableSubmit={isPending}
        className={cn(currentStep !== "personal" && "hidden")}
        id={formId}
      >
        <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
          {userType === "Buying for business" && (
            <FormField
              control={form.control}
              name="companyName"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      required
                      {...field}
                      data-testid="input-companyName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="firstName"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="given-name"
                    required
                    {...field}
                    data-testid="input-firstName"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your first name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="family-name"
                    required
                    {...field}
                    data-testid="input-lastName"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your last name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.clearErrors("email");
                    }}
                    data-testid="input-email"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <PhoneNumberInput
            control={form.control}
            name="phoneNumber"
            disabled={isPending}
          />

          <UsernameInput
            control={form.control}
            name="userName"
            disabled={isPending}
            data-testid="input-username"
          />

          <FormField
            control={form.control}
            name="password"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="new-password"
                    required
                    {...field}
                    data-testid="input-password"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="new-password"
                    required
                    {...field}
                    data-testid="input-confirmPassword"
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Type the same password here to confirm it.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </StepContainerOpen>
      <StepContainerClosed onClick={() => setStep("personal")} />
    </StepContainer>
  );
};
