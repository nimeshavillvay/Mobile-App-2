import { useCheckRecaptcha } from "@/_context/recaptcha-ref";
import { isErrorResponse } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/web-ui/components/base/molecules/alert";
import { Form } from "@repo/web-ui/components/base/molecules/form";
import { useToast } from "@repo/web-ui/components/base/molecules/toast";
import { Alert as AlertIcon } from "@repo/web-ui/components/icons/alert";
import { HTTPError } from "ky";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { CurrentUserFormData } from "../register-schema";
import { currentUserSchema } from "../register-schema";
import { AccountDetailsStep, PersonalInformationStep } from "../steps";
import useRegisterExistingUserMutation from "./use-register-existing-user-mutation.hook";

export type Step = "account" | "personal";

const RegisterExistingUser = () => {
  const checkRecaptcha = useCheckRecaptcha();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("account");

  const form = useForm<CurrentUserFormData>({
    resolver: zodResolver(currentUserSchema),
    values: {
      hasPlacedOrder: false,
      soldToAccount: "",
      invoiceNo: "",
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    mode: "onBlur",
  });

  const createUserMutation = useRegisterExistingUserMutation();
  const onSubmit = form.handleSubmit(async (data) => {
    if (form.formState.errors.userName) {
      form.setError("userName", {
        message: form.formState.errors.userName.message,
      });
      return;
    }
    try {
      await checkRecaptcha();
    } catch {
      return toast({
        variant: "destructive",
        title: "Registration failed.",
      });
    }

    createUserMutation.mutate(
      {
        accountNo: data.soldToAccount,
        documentId: data.invoiceNo,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        userName: data.userName,
        password: data.password,
        phoneNumber: data.phoneNumber,
      },
      {
        onError: async (error) => {
          if (error instanceof HTTPError && error.response.status === 400) {
            const response = await error.response.json();
            if (
              isErrorResponse(response) &&
              response.message ===
                "Sorry, the account/document combination is invalid."
            ) {
              form.setError("soldToAccount", {
                message: response.message,
              });
              form.setError("invoiceNo", {
                message: response.message,
              });
              setStep("account");
            } else if (
              isErrorResponse(response) &&
              response.message ===
                "Email address already exists in the database! Please Login to continue."
            ) {
              form.setError("email", {
                message: response.message,
              });
            } else {
              form.setError("root", {
                message: response.message,
              });
            }
          } else {
            form.setError("root", {
              message: "Registration unsuccessful. Please try again",
            });
          }
        },
      },
    );
  });

  return (
    <Form {...form}>
      <div data-testid="existing-user" className="flex flex-col gap-5">
        {!!form?.formState?.errors?.root?.message && (
          <Alert variant="destructive" data-testid="alert-error">
            <AlertIcon className="size-4 stroke-red-500" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}
        <AccountDetailsStep
          data-testid="step-accountDetail"
          form={form}
          setStep={setStep}
          currentStep={step}
          isPending={createUserMutation.isPending}
          formId="form-existing-user"
        />

        <PersonalInformationStep
          form={form}
          onBack={() => setStep("account")}
          onSubmit={onSubmit}
          currentStep={step}
          isPending={createUserMutation.isPending}
          formId="form-existing-user"
          title={"Personal Information"}
        />
      </div>
    </Form>
  );
};

export default RegisterExistingUser;
