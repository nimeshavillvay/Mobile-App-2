import { PhoneNumberInput } from "@/_components/molecules/phone-number-input/phone-number-input";
import {
  StepContainer,
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
import type { UseFormReturn } from "react-hook-form";
import type { Step } from "../register-existing-user/register-existing-user";
import type { CurrentUserFormData } from "../register-schema";

type PersonalInformationStepProps = {
  readonly form: UseFormReturn<CurrentUserFormData>;
  readonly currentStep: Step;
  readonly onBack: () => void;
  readonly onSubmit: () => void;
  readonly isPending: boolean;
  readonly formId: string;
  readonly title: string;
};

export const PersonalInformationStep = ({
  form,
  currentStep,
  onSubmit,
  isPending,
  formId,
  title,
}: PersonalInformationStepProps) => {
  return (
    <StepContainer
      title={title}
      state={currentStep === "personal" ? "open" : "closed"}
    >
      <StepContainerOpen
        steps={{ current: 2, total: 2 }}
        allFieldsRequired
        submitBtnText="Create account"
        onSubmit={onSubmit}
        disableSubmit={isPending ? true : false}
        className={cn(currentStep !== "personal" && "hidden")}
        id={formId}
      >
        <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
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
          />

          <FormField
            control={form.control}
            name="password"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="md:row-start-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="password"
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
              <FormItem className="md:row-start-4">
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="password"
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
    </StepContainer>
  );
};
