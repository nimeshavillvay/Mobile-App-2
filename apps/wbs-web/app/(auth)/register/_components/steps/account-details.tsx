import {
  StepContainer,
  StepContainerClosed,
  StepContainerOpen,
} from "@/_components/molecules/step-container/step-container";
import { cn } from "@/_lib/utils";
import { Input } from "@repo/web-ui/components/base/atoms/input";
import { Switch } from "@repo/web-ui/components/base/atoms/switch";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/base/molecules/form";
import type { UseFormReturn } from "react-hook-form";
import type { Step } from "../register-existing-user/register-existing-user";
import type { CurrentUserFormData } from "../register-schema";

type AccountDetailsStepProps = {
  readonly form: UseFormReturn<CurrentUserFormData>;
  readonly currentStep: Step;
  readonly setStep: (step: Step) => void;
  readonly isPending: boolean;
  readonly formId: string;
};

export const AccountDetailsStep = ({
  form,
  currentStep,
  setStep,
  isPending,
  formId,
}: AccountDetailsStepProps) => {
  const hasPlacedOrder = form.watch("hasPlacedOrder");
  const soldToAccount = form.watch("soldToAccount");
  const invoiceNo = form.watch("invoiceNo");

  const onAccountDetailsSubmit = () => {
    let isValid = true;

    if (!soldToAccount) {
      form.setError("soldToAccount", {
        type: "manual",
        message: "Sold-To Account is mandatory",
      });
      isValid = false;
    }

    if (!hasPlacedOrder && !invoiceNo) {
      form.setError("invoiceNo", {
        type: "manual",
        message: "Invoice document is mandatory when an order has been placed",
      });
      isValid = false;
    }

    if (isValid) {
      setStep("personal");
    }
  };

  return (
    <StepContainer
      title="Account details"
      state={currentStep === "account" ? "open" : "closed"}
    >
      <StepContainerOpen
        steps={{ current: 1, total: 2 }}
        customAction={onAccountDetailsSubmit}
        allFieldsRequired={hasPlacedOrder ? false : true}
        disableSubmit={isPending}
      >
        <p className="text-sm text-wurth-gray-800">
          To set up your online account with customer pricing,{" "}
          <span className="font-semibold">
            please provide a recent invoice, delivery, or order number (within
            the last 12 months)
          </span>
          . This will help us validate your account information.
        </p>

        <FormField
          control={form.control}
          name="hasPlacedOrder"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  We have not placed an order yet
                </FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    form.clearErrors("invoiceNo");
                  }}
                  disabled={isPending}
                  data-testid="switch-hasPlacedOrder"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
          <FormField
            control={form.control}
            name="soldToAccount"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>SOLD-TO Account #</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    required
                    placeholder="XXXXXXXX"
                    form={formId}
                    {...field}
                    className={cn(
                      !!form?.formState?.errors?.soldToAccount?.message &&
                        "border-red-500",
                    )}
                    onChange={(e) => {
                      field.onChange(e);
                      form.clearErrors("soldToAccount");
                    }}
                    data-testid="input-soldToAccount"
                  />
                </FormControl>
                <FormDescription>
                  Please enter your Würth Baer Supply Company Account Number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceNo"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {hasPlacedOrder
                    ? "Invoice, Delivery or Order # (optional)"
                    : "Invoice, Delivery or Order #"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    required={hasPlacedOrder}
                    placeholder="XXXXXXXX"
                    form={formId}
                    {...field}
                    className={cn(
                      !!form?.formState?.errors?.invoiceNo?.message &&
                        "border-red-500",
                    )}
                    onChange={(e) => {
                      field.onChange(e);
                      form.clearErrors("invoiceNo");
                    }}
                    data-testid="input-invoiceNo"
                  />
                </FormControl>
                <FormDescription>
                  Enter a recent invoice, delivery or order number from within
                  the last 12 months
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <p className="text-sm text-wurth-gray-800">
          By continuing, you agree to the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/privacy-policy"
            className="font-semibold underline"
          >
            Privacy Notice
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/terms-of-sale"
            className="font-semibold underline"
          >
            Terms and Conditions
          </a>{" "}
          and you consent to the collection and processing of your personal data
          for purposes of completing transactions.
        </p>
      </StepContainerOpen>
      {currentStep === "personal" && (
        <StepContainerClosed onClick={() => setStep("account")}>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-black">
                WLC Account Number
              </h4>

              <div className="text-base text-wurth-gray-800">
                {soldToAccount}
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-black">Order Number</h4>

              <div className="text-base text-wurth-gray-800">{invoiceNo}</div>
            </div>
          </div>
        </StepContainerClosed>
      )}
    </StepContainer>
  );
};
