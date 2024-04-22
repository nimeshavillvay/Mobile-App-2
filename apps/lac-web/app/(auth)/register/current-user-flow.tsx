import type { PasswordPolicies } from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputHelperDescription from "../input-helper-description";
import useSignInCookies from "../use-sign-in-cookies.hook";
import {
  StepContainer,
  StepContainerClosed,
  StepContainerOpen,
} from "./step-container";
import useRegisterExistingUserMutation from "./use-register-existing-user-mutation.hook";

type Step = "account" | "personal";

const accountDetailsSchema = z.object({
  soldToAccount: z.string(),
  invoiceNo: z.string(),
});
const personalDetailsSchema = accountDetailsSchema.extend({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type CurrentUserFlowProps = {
  passwordPolicies: PasswordPolicies;
};

const CurrentUserFlow = ({ passwordPolicies }: CurrentUserFlowProps) => {
  const id = useId();
  const soldToId = `sold-to-${id}`;
  const invoiceNoId = `invoice-no-${id}`;
  const firstNameId = `first-name-${id}`;
  const lastNameId = `last-name-${id}`;
  const emailId = `email-${id}`;
  const passwordId = `password-${id}`;
  const confirmPasswordId = `confirm-password-${id}`;

  const [cookies] = useSignInCookies();
  const [step, setStep] = useState<Step>("account");

  const accountDetailsForm = useForm<z.infer<typeof accountDetailsSchema>>({
    resolver: zodResolver(accountDetailsSchema),
    values: {
      soldToAccount: "",
      invoiceNo: "",
    },
  });
  const { soldToAccount, invoiceNo } = accountDetailsForm.watch();

  const onAccountDetailsSubmit = accountDetailsForm.handleSubmit(() => {
    // Move to the next step
    setStep("personal");
  });

  const refinedPersonalDetailsSchema = useMemo(
    () =>
      personalDetailsSchema
        .extend({
          password: z.string().min(passwordPolicies.minimumLength),
        })
        .superRefine(({ password, confirmPassword }, context) => {
          const containsAlphabet = (ch: string) => /[a-z,A-Z]/.test(ch);
          const containsNumber = (ch: string) => /[0-9]/.test(ch);

          let countOfAlphabets = 0;
          let countOfNumbers = 0;

          for (const ch of password) {
            if (containsAlphabet(ch)) {
              countOfAlphabets++;
            } else if (containsNumber(ch)) {
              countOfNumbers++;
            }
          }

          // TODO Add better messaging
          if (
            countOfAlphabets < passwordPolicies.minimumAlphabets ||
            countOfNumbers < passwordPolicies.minimumNumbers
          ) {
            context.addIssue({
              path: ["password"],
              code: "custom",
              message: "Password does not meet complexity requirements",
            });
          }

          if (confirmPassword !== password) {
            context.addIssue({
              path: ["confirmPassword"],
              code: "custom",
              message: "The passwords did not match",
            });
          }
        }),
    [passwordPolicies],
  );
  const personalDetailsForm = useForm<
    z.infer<typeof refinedPersonalDetailsSchema>
  >({
    resolver: zodResolver(refinedPersonalDetailsSchema),
    values: {
      soldToAccount,
      invoiceNo,
      firstName: "",
      lastName: "",
      email: cookies.email ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  const createUserMutation = useRegisterExistingUserMutation();
  const onPersonalDetailsSubmit = personalDetailsForm.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <StepContainer
        state={step === "account" ? "open" : "closed"}
        title="Account details"
      >
        <StepContainerOpen
          steps={{
            current: 1,
            total: 2,
          }}
          allFieldsRequired
          onSubmit={onAccountDetailsSubmit}
        >
          <p className="text-sm leading-6 text-wurth-gray-800">
            To set up your online account with customer pricing,{" "}
            <span className="font-semibold">
              please provide a recent invoice, delivery, or order number (within
              the last 12 months)
            </span>
            . This will help us validate your account information. Please
            complete the entire form before submitting.
          </p>

          <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor={soldToId}>Sold-to account</Label>

              <Input
                {...accountDetailsForm.register("soldToAccount")}
                id={soldToId}
                required
                placeholder="XXXXXXXX"
                disabled={createUserMutation.isPending}
              />

              <InputHelperDescription>
                Lorem ipsum dolor sit amet consectetur.
              </InputHelperDescription>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={invoiceNoId}>
                Invoice, delivery or order number
              </Label>

              <Input
                {...accountDetailsForm.register("invoiceNo")}
                id={invoiceNoId}
                required
                placeholder="XXXXXXXXXX"
                disabled={createUserMutation.isPending}
              />

              <InputHelperDescription>
                Recent invoice, delivery or order number from within the last 12
                months
              </InputHelperDescription>
            </div>
          </div>

          <p className="text-sm text-wurth-gray-800">
            By continuing, you agree to the{" "}
            <Link href="/privacy-policy" className="font-semibold underline">
              Privacy Notice
            </Link>{" "}
            and{" "}
            <Link href="/terms-of-sale" className="font-semibold underline">
              Terms and Conditions
            </Link>{" "}
            and you consent to the collection and processing of your personal
            data for purposes of completing transactions.
          </p>
        </StepContainerOpen>

        <StepContainerClosed
          onClick={() => setStep("account")}
          disabled={createUserMutation.isPending}
        >
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
      </StepContainer>

      {step === "personal" && (
        <StepContainer state="open" title="Personal details">
          <StepContainerOpen
            steps={{
              current: 2,
              total: 2,
            }}
            allFieldsRequired
            submitBtnText="Create account"
            onSubmit={onPersonalDetailsSubmit}
          >
            <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
              <div className="sr-only">
                <Label htmlFor={soldToId}>Sold-to account</Label>

                <Input
                  {...personalDetailsForm.register("soldToAccount")}
                  id={soldToId}
                  type="hidden"
                  required
                />
              </div>

              <div className="sr-only">
                <Label htmlFor={invoiceNoId}>
                  Invoice, delivery or order number
                </Label>

                <Input
                  {...personalDetailsForm.register("invoiceNo")}
                  id={invoiceNoId}
                  type="hidden"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor={firstNameId}>First name</Label>

                <Input
                  {...personalDetailsForm.register("firstName")}
                  id={firstNameId}
                  type="text"
                  required
                  disabled={createUserMutation.isPending}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor={lastNameId}>Last name</Label>

                <Input
                  {...personalDetailsForm.register("lastName")}
                  id={lastNameId}
                  type="text"
                  required
                  disabled={createUserMutation.isPending}
                />
              </div>

              <div className="flex flex-col gap-2 md:hidden">
                <Label htmlFor={emailId}>Email address</Label>

                <Input
                  {...personalDetailsForm.register("email")}
                  id={emailId}
                  type="email"
                  required
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor={passwordId}>Password</Label>

                <Input
                  {...personalDetailsForm.register("password")}
                  id={passwordId}
                  type="password"
                  required
                  disabled={createUserMutation.isPending}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor={confirmPasswordId}>Confirm password</Label>

                <Input
                  {...personalDetailsForm.register("confirmPassword")}
                  id={confirmPasswordId}
                  type="password"
                  required
                  disabled={createUserMutation.isPending}
                />
              </div>
            </div>
          </StepContainerOpen>
        </StepContainer>
      )}
    </>
  );
};

export default CurrentUserFlow;
