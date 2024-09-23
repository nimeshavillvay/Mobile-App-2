import { AddressInformation } from "@/(auth)/register/_components/steps/address-information";
import { NewUserPersonalInformation } from "@/(auth)/register/_components/steps/new-user-personal-info";
import { TaxInformation } from "@/(auth)/register/_components/steps/tax-information";
import type {
  Country,
  PasswordPolicies,
  ResponseAddress,
} from "@/(auth)/register/_components/types";
import type { Industry, UpdateAddressParams } from "@/(auth)/register/types";
import AddressSelector from "@/_components/molecules/address-selector/address-selector";
import { useCheckRecaptcha } from "@/_context/recaptcha-ref";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/web-ui/components/base/molecules/alert-dialog";
import { Form } from "@repo/web-ui/components/base/molecules/form";
import { useToast } from "@repo/web-ui/components/base/molecules/toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useUploadTaxDocumentMutation from "../../use-upload-tax-document-file-mutation.hook";
import { newUserSchema, type NewUserFormData } from "../register-schema";
import useRegisterNewUserMutation, {
  isVerifyAddressResponse,
} from "./use-register-new-user-mutation.hook";

export type Step = "personal" | "address" | "tax";

type RegisterNewUserProps = {
  readonly passwordPolicies: PasswordPolicies;
  readonly industries: Industry[];
  readonly countries: Country[];
  readonly userType: string;
};

const RegisterNewUser: React.FC<RegisterNewUserProps> = ({
  industries,
  countries,
  userType,
}) => {
  const router = useRouter();
  const checkRecaptcha = useCheckRecaptcha();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("personal");
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false);
  const [billingSuggestions, setBillingSuggestions] = useState<
    ResponseAddress[]
  >([]);
  const [shippingSuggestions, setShippingSuggestions] = useState<
    ResponseAddress[]
  >([]);
  const [skipAddressCheck, setIsAddressChecked] = useState(false);

  const form = useForm<NewUserFormData>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      type: "unselected",
      companyName: "",
      userName: "",
      billingAddress: "",
      billingAddressTwo: "",
      billingCity: "",
      billingCountry: countries[0]?.code ?? "",
      billingState: "IL",
      billingCounty: "",
      billingPostCode: "",
      billingZipCode: "",
      same: true,
      shippingAddress: "",
      shippingAddressTwo: "",
      shippingCity: "",
      shippingCountry: countries[0]?.code ?? "",
      shippingState: "IL",
      shippingCounty: "",
      shippingPostCode: "",
      shippingZipCode: "",
      federalTaxId: "",
      industry: "",
      employees: 1,
      isExemptFromTax: false,
      taxDocuments: [],
    },
    mode: "onSubmit",
  });

  const { trigger, getValues } = form;

  const registerNewUserMutation = useRegisterNewUserMutation();
  const uploadTaxDocumentMutation = useUploadTaxDocumentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = false;
    if (form.formState.errors.userName) {
      form.setError("userName", {
        message: form.formState.errors.userName.message,
      });
      return;
    }
    if (step === "personal") {
      isValid = await trigger([
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
        "phoneNumber",
        "userName",
        "companyName",
      ]);

      if (isValid) {
        setStep("address");
      }
    } else if (step === "address") {
      isValid = await trigger([
        "billingAddress",
        "billingCity",
        "billingCountry",
        "billingState",
        "billingPostCode",
        "shippingAddress",
        "shippingCity",
        "shippingCountry",
        "shippingState",
        "shippingPostCode",
      ]);
      if (isValid) {
        if (userType === "Buying for business") {
          setStep("tax");
        } else {
          await registerUser(getValues());
        }
      }
    } else if (step === "tax") {
      isValid = await trigger();
      if (isValid) {
        await registerUser(getValues());
      }
    }
  };

  const registerUser = async (
    values: NewUserFormData,
    skipAddressCheck?: boolean,
  ) => {
    try {
      await checkRecaptcha();
    } catch {
      return toast({
        variant: "destructive",
        title: "Registration failed.",
        description: "reCAPTCHA verification failed.",
      });
    }

    await registerNewUserMutation.mutateAsync(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        type: userType === "Buying for business" ? "C" : "R",
        employees: values.employees,
        industry: values.industry,
        federalTaxId: values.federalTaxId,
        company: values.companyName,
        username: values.userName,
        billingAddress: {
          address: values.billingAddress,
          addressTwo: values.billingAddressTwo,
          city: values.billingCity,
          country: values.billingCountry,
          state: values.billingState,
          county: values.billingCounty,
          postalCode: values.billingPostCode,
          zipCode: values.billingZipCode,
        },
        shippingAddress: {
          address: values.same ? values.billingAddress : values.shippingAddress,
          addressTwo: values.same
            ? values.billingAddressTwo
            : values.shippingAddressTwo,
          city: values.same ? values.billingCity : values.shippingCity,
          country: values.same ? values.billingCountry : values.shippingCountry,
          state: values.same ? values.billingState : values.shippingState,
          county: values.same ? values.billingCounty : values.shippingCounty,
          postalCode: values.same
            ? values.billingPostCode
            : values.shippingPostCode,
          zipCode: values.same ? values.billingZipCode : values.shippingZipCode,
        },
        isExemptFromTax: values.isExemptFromTax,
        skipAddressCheck,
      },
      {
        onSuccess: async (data) => {
          window.scrollTo({ top: 300, behavior: "smooth" });

          if (isVerifyAddressResponse(data)) {
            if (Array.isArray(data.suggestions)) {
              return toast({
                variant: "destructive",
                title: "Registration failed.",
                description: data.message,
              });
            }

            if (Array.isArray(data.suggestions["billing-address"])) {
              setBillingSuggestions(data.suggestions["billing-address"]);
            }

            if (Array.isArray(data.suggestions["shipping-address"])) {
              setShippingSuggestions(data.suggestions["shipping-address"]);
            }
          } else {
            setOpenVerificationDialog(true);

            if (values.isExemptFromTax && "id" in data) {
              const taxDocumentsToUpload =
                values.taxDocuments?.map((doc) => ({
                  userId: data.id,
                  cert1: doc.stateTaxExemptionNumber || "",
                  cert2: new FormData(), // Handle file upload separately
                })) || [];

              try {
                await uploadTaxDocumentMutation.mutateAsync(
                  taxDocumentsToUpload,
                );
              } catch (error) {
                toast({
                  variant: "destructive",
                  title: "Some documents failed to upload",
                  description:
                    "Please try uploading the failed documents again later.",
                });
              }
            }

            toast({ title: "Registered successfully" });

            if (
              billingSuggestions.length === 0 &&
              shippingSuggestions.length === 0
            ) {
              router.replace("/");
            }
          }
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Registration failed",
            description: error.message,
          });
        },
      },
    );
  };

  const handleClearSuggestions = () => {
    setBillingSuggestions([]);
    setShippingSuggestions([]);
    setStep("address");
    setTimeout(() => {
      window.scrollTo({ top: 500, behavior: "smooth" });
    }, 100);
  };

  const handleUpdateAddress = ({ billing, shipping }: UpdateAddressParams) => {
    const newFormValues = { ...getValues() };

    if (billing) {
      newFormValues.billingAddress = billing["street-address"];
      newFormValues.billingCity = billing.locality;
      newFormValues.billingCounty = billing.county;
      newFormValues.billingState = billing.region;
      newFormValues.billingCountry = billing["country-name"];
      newFormValues.billingPostCode = billing["postal-code"];
      newFormValues.billingZipCode = billing.zip4;
      setIsAddressChecked(true);
    }

    if (shipping) {
      newFormValues.same = false;
      newFormValues.shippingAddress = shipping["street-address"];
      newFormValues.shippingCity = shipping.locality;
      newFormValues.shippingCounty = shipping.county;
      newFormValues.shippingState = shipping.region;
      newFormValues.shippingCountry = shipping["country-name"];
      newFormValues.shippingPostCode = shipping["postal-code"];
      newFormValues.shippingZipCode = shipping.zip4;
      setIsAddressChecked(true);
    }

    form.reset(newFormValues);
    registerUser(newFormValues, skipAddressCheck);
  };

  if (billingSuggestions.length > 0 || shippingSuggestions.length > 0) {
    const values = getValues();

    const currentBillingAddress = [
      {
        "country-name": values.billingCountry,
        county: values.billingCounty,
        locality: values.billingCounty
          ? values.billingCounty
          : values.billingCity,
        region: values.billingState,
        "street-address": values.billingAddress,
        "postal-code": values.billingPostCode,
        zip4: values.billingZipCode,
        skip_address_check: false,
      },
    ] as ResponseAddress[];

    const currentShippingAddress = values.same
      ? currentBillingAddress
      : ([
          {
            "country-name": values.shippingCountry,
            county: values.shippingCounty,
            locality: values.shippingCounty
              ? values.shippingCounty
              : values.shippingCity,
            region: values.shippingState,
            "street-address": values.shippingAddress,
            "postal-code": values.shippingPostCode,
            zip4: values.shippingZipCode,
            skip_address_check: false,
          },
        ] as ResponseAddress[]);
    return (
      <>
        <AlertDialog
          open={openVerificationDialog}
          onOpenChange={() => setOpenVerificationDialog(false)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Address Verified!</AlertDialogTitle>
              <AlertDialogDescription>
                We&apos;ll use this address for shipping and tax calculation
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => router.replace("/")}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AddressSelector
          billingAddresses={billingSuggestions}
          shippingAddresses={shippingSuggestions}
          clearSuggestions={handleClearSuggestions}
          updateAddress={handleUpdateAddress}
          disabled={registerNewUserMutation.isPending}
          currentBillingAddress={currentBillingAddress}
          currentShippingAddress={currentShippingAddress}
        />
      </>
    );
  }

  return (
    <Form {...form}>
      <div data-testid="new-user" className="flex flex-col gap-5">
        <NewUserPersonalInformation
          form={form}
          currentStep={step}
          onSubmit={handleSubmit}
          isPending={registerNewUserMutation.isPending}
          formId="form-new-user-personal"
          userType={userType}
          title={
            userType === "Homeowner"
              ? "Personal details"
              : "Company and personal details"
          }
          setStep={setStep}
        />
        {(step === "address" || step === "tax") && (
          <AddressInformation
            form={form}
            currentStep={step}
            onSubmit={handleSubmit}
            isPending={registerNewUserMutation.isPending}
            formId="form-new-user-address"
            countries={countries}
            setStep={setStep}
            userType={userType}
          />
        )}

        {userType === "Buying for business" && step === "tax" && (
          <TaxInformation
            form={form}
            currentStep={step}
            onSubmit={handleSubmit}
            isPending={registerNewUserMutation.isPending}
            formId="form-new-user-tax"
            industries={industries}
          />
        )}
      </div>
    </Form>
  );
};

export default RegisterNewUser;
