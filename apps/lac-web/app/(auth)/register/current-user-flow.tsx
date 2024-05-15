import type { PasswordPolicies } from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

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
      email: email ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  const createUserMutation = useRegisterExistingUserMutation();
  const onPersonalDetailsSubmit = personalDetailsForm.handleSubmit((data) => {
    createUserMutation.mutate({
      accountNo: data.soldToAccount,
      documentId: data.invoiceNo,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
  });

  return (
    <Form {...accountDetailsForm}>
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
            <FormField
              control={personalDetailsForm.control}
              name="soldToAccount"
              disabled={createUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sold-to account</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      required
                      placeholder="XXXXXXXX"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Lorem ipsum dolor sit amet consectetur.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={personalDetailsForm.control}
              name="invoiceNo"
              disabled={createUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice, delivery or order number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      required
                      placeholder="XXXXXXXX"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Recent invoice, delivery or order number from within the
                    last 12 months
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              <FormField
                control={personalDetailsForm.control}
                name="soldToAccount"
                disabled={createUserMutation.isPending}
                render={({ field }) => (
                  <FormItem className="sr-only">
                    <FormLabel>Sold-to account</FormLabel>
                    <FormControl>
                      <Input type="hidden" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalDetailsForm.control}
                name="invoiceNo"
                disabled={createUserMutation.isPending}
                render={({ field }) => (
                  <FormItem className="sr-only">
                    <FormLabel>Invoice, delivery or order number</FormLabel>
                    <FormControl>
                      <Input type="hidden" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalDetailsForm.control}
                name="firstName"
                disabled={createUserMutation.isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="given-name"
                        required
                        {...field}
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
                control={personalDetailsForm.control}
                name="lastName"
                disabled={createUserMutation.isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="family-name"
                        required
                        {...field}
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
                control={personalDetailsForm.control}
                name="email"
                disabled
                render={({ field }) => (
                  <FormItem className="md:hidden">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalDetailsForm.control}
                name="password"
                disabled={createUserMutation.isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="password"
                        required
                        {...field}
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
                control={personalDetailsForm.control}
                name="confirmPassword"
                disabled={createUserMutation.isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="password"
                        required
                        {...field}
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
      )}
    </Form>
  );
};

export default CurrentUserFlow;
