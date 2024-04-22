/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PasswordPolicies } from "@/_lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@repo/web-ui/components/ui/radio-group";
import { useToast } from "@repo/web-ui/components/ui/toast";
import Link from "next/link";
import { ComponentProps, useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputHelperDescription from "../input-helper-description";
import useSignInCookies from "../use-sign-in-cookies.hook";
import AddressSelector from "./address-selector";
import {
  StepContainer,
  StepContainerClosed,
  StepContainerOpen,
} from "./step-container";
import useRegisterNewUserMutation, {
  ResponseAddress,
  isVerifyAddressResponse,
} from "./use-register-new-user-mutation.hook";

type Step = "personal" | "address";

const REGISTRATION_TYPES = [
  { value: "C", label: "private / residential purposes" },
  { value: "B", label: "Business" },
  { value: "unselected", label: "Unselected" },
] as const;
const REGISTRATION_TYPES_VALUES = ["C", "B", "unselected"] as const;
type RegistrationType = (typeof REGISTRATION_TYPES_VALUES)[number];

const personalDetailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  type: z.enum(REGISTRATION_TYPES_VALUES),
});
const addressSchema = z.object({
  billingAddress: z.string(),
  billingOptionalAddress: z.string().optional(),
  billingCity: z.string(),
  billingState: z.string(),
  billingCountry: z.string(),
  billingPostCode: z.string(),
  billingZipCode: z.string().optional(),

  same: z.boolean(),

  shippingAddress: z.string(),
  shippingOptionalAddress: z.string().optional(),
  shippingCity: z.string(),
  shippingState: z.string(),
  shippingCountry: z.string(),
  shippingPostCode: z.string(),
  shippingZipCode: z.string().optional(),
});

type NewUserFlowProps = {
  passwordPolicies: PasswordPolicies;
};

const NewUserFlow = ({ passwordPolicies }: NewUserFlowProps) => {
  const id = useId();
  const firstNameId = `first-name-${id}`;
  const lastNameId = `last-name-${id}`;
  const emailId = `email-${id}`;
  const passwordId = `password-${id}`;
  const confirmPasswordId = `confirm-password-${id}`;
  const billingAddressId = `billing-address-${id}`;
  const billingOptionalAddressId = `billing-optional-address-${id}`;
  const billingCityId = `billing-city-${id}`;
  const billingStateId = `billing-state-${id}`;
  const billingCountryId = `billing-country-${id}`;
  const billingPostCodeId = `billing-post-code-${id}`;
  const billingZipCodeId = `billing-zip-code-${id}`;
  const sameAddressId = `confirm-address-${id}`;
  const shippingAddressId = `shipping-address-${id}`;
  const shippingOptionalAddressId = `shipping-optional-address-${id}`;
  const shippingCityId = `shipping-city-${id}`;
  const shippingStateId = `shipping-state-${id}`;
  const shippingCountryId = `shipping-country-${id}`;
  const shippingPostCodeId = `shipping-post-code-${id}`;
  const shippingZipCodeId = `shipping-zip-code-${id}`;

  const [cookies] = useSignInCookies();
  const [step, setStep] = useState<Step>("personal");
  const [sameAddress, setSameAddress] = useState(true);

  const toast = useToast();

  const [billingSuggestions, setBillingSuggestions] = useState<
    ResponseAddress[]
  >([]);
  const [shippingSuggestions, setShippingSuggestions] = useState<
    ResponseAddress[]
  >([]);

  const refinedPersonalDetailsSchema = useMemo(
    () =>
      personalDetailsSchema
        .extend({
          password: z.string().min(passwordPolicies.minimumLength),
        })
        .superRefine(({ password, confirmPassword, type }, context) => {
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

          if (type === "unselected") {
            context.addIssue({
              path: ["type"],
              code: "custom",
              message: "Please select a value",
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
      firstName: "",
      lastName: "",
      email: cookies.email ?? "",
      password: "",
      confirmPassword: "",
      type: "unselected",
    },
  });
  const type = personalDetailsForm.watch("type");

  const handlePersonalDetailsOnSubmit = personalDetailsForm.handleSubmit(() => {
    setStep("address");
  });

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    values: {
      billingAddress: "",
      billingOptionalAddress: "",
      billingCity: "",
      billingState: "",
      billingCountry: "",
      billingPostCode: "",
      billingZipCode: "",
      same: sameAddress,
      shippingAddress: "",
      shippingOptionalAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingCountry: "",
      shippingPostCode: "",
      shippingZipCode: "",
    },
  });

  const registerNewUserMutation = useRegisterNewUserMutation();
  const handleAddressOnSubmit = addressForm.handleSubmit((values) => {
    const { firstName, lastName, email, password, type } =
      personalDetailsForm.getValues();

    registerNewUserMutation.mutate(
      {
        firstName,
        lastName,
        email,
        password,
        type,
        billingAddress: {
          address: `${values.billingAddress}${values.billingOptionalAddress ? ` ${values.billingOptionalAddress}` : ""}`,
          city: values.billingCity,
          state: values.billingState,
          country: values.billingCountry,
          postalCode: values.billingPostCode,
          zipCode: values.billingZipCode,
        },
        shippingAddress: {
          address: sameAddress
            ? `${values.billingAddress}${values.billingOptionalAddress ? ` ${values.billingOptionalAddress}` : ""}`
            : `${values.shippingAddress}${values.shippingOptionalAddress ? ` ${values.shippingOptionalAddress}` : ""}`,
          city: sameAddress ? values.billingCity : values.shippingCity,
          state: sameAddress ? values.billingState : values.shippingState,
          country: sameAddress ? values.billingCountry : values.shippingCountry,
          postalCode: sameAddress
            ? values.billingPostCode
            : values.shippingPostCode,
          zipCode: sameAddress ? values.billingZipCode : values.shippingZipCode,
        },
      },
      {
        onSuccess: (data) => {
          if (isVerifyAddressResponse(data)) {
            if (Array.isArray(data.suggestions["billing-address"])) {
              setBillingSuggestions(data.suggestions["billing-address"]);
            }

            if (Array.isArray(data.suggestions["shipping-address"])) {
              setShippingSuggestions(data.suggestions["shipping-address"]);
            }
          }
        },
      },
    );
  });

  const updateAddress: ComponentProps<
    typeof AddressSelector
  >["updateAddress"] = ({ billing, shipping }) => {
    if (billing) {
      addressForm.setValue("billingAddress", billing["street-address"]);
      addressForm.setValue("billingCity", billing.locality);
      addressForm.setValue("billingState", billing.region);
      addressForm.setValue("billingCountry", billing["country-name"]);
      addressForm.setValue("billingPostCode", billing["postal-code"]);
      addressForm.setValue("billingZipCode", billing.zip4);
    }

    if (shipping) {
      addressForm.setValue("shippingAddress", shipping["street-address"]);
      addressForm.setValue("shippingCity", shipping.locality);
      addressForm.setValue("shippingState", shipping.region);
      addressForm.setValue("shippingCountry", shipping["country-name"]);
      addressForm.setValue("shippingPostCode", shipping["postal-code"]);
      addressForm.setValue("shippingZipCode", shipping.zip4);
    }

    // Clear all suggestions
    setBillingSuggestions([]);
    setShippingSuggestions([]);
  };

  // Hide the forms when there is an address conflict.
  // During this time, suggestions will be returned from either UPS or
  // SAP. Once the user selected the correct address, the suggestions arrays
  // should be cleared.
  if (billingSuggestions.length > 0 || shippingSuggestions.length > 0) {
    return (
      <AddressSelector
        billingAddresses={billingSuggestions}
        shippingAddresses={billingSuggestions}
        updateAddressManually={() => {
          // Clear all suggestions
          setBillingSuggestions([]);
          setShippingSuggestions([]);
        }}
        updateAddress={updateAddress}
      />
    );
  }

  return (
    <>
      <StepContainer
        state={step === "personal" ? "open" : "closed"}
        title="Personal details"
      >
        <StepContainerOpen
          steps={{ current: 1, total: 2 }}
          onSubmit={handlePersonalDetailsOnSubmit}
        >
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor={firstNameId}>First name</Label>

              <Input
                {...personalDetailsForm.register("firstName")}
                id={firstNameId}
                type="text"
                required
                disabled={registerNewUserMutation.isPending}
              />

              {!!personalDetailsForm.formState.errors.firstName?.message && (
                <InputHelperDescription isError>
                  {personalDetailsForm.formState.errors.firstName.message}
                </InputHelperDescription>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={lastNameId}>Last name</Label>

              <Input
                {...personalDetailsForm.register("lastName")}
                id={lastNameId}
                type="text"
                required
                disabled={registerNewUserMutation.isPending}
              />

              {!!personalDetailsForm.formState.errors.lastName?.message && (
                <InputHelperDescription isError>
                  {personalDetailsForm.formState.errors.lastName.message}
                </InputHelperDescription>
              )}
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

              {!!personalDetailsForm.formState.errors.email?.message && (
                <InputHelperDescription isError>
                  {personalDetailsForm.formState.errors.email.message}
                </InputHelperDescription>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={passwordId}>Password</Label>

              <Input
                {...personalDetailsForm.register("password")}
                id={passwordId}
                type="password"
                required
                disabled={registerNewUserMutation.isPending}
              />

              {!!personalDetailsForm.formState.errors.password?.message && (
                <InputHelperDescription isError>
                  {personalDetailsForm.formState.errors.password.message}
                </InputHelperDescription>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={confirmPasswordId}>Confirm password</Label>

              <Input
                {...personalDetailsForm.register("confirmPassword")}
                id={confirmPasswordId}
                type="password"
                required
                disabled={registerNewUserMutation.isPending}
              />

              {!!personalDetailsForm.formState.errors.confirmPassword
                ?.message && (
                <InputHelperDescription isError>
                  {personalDetailsForm.formState.errors.confirmPassword.message}
                </InputHelperDescription>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-wurth-gray-800">
              I&apos;m buying for
            </h4>

            <RadioGroup
              value={type}
              onValueChange={(value: string) =>
                personalDetailsForm.setValue("type", value as RegistrationType)
              }
              className="item-center flex flex-col gap-2 md:flex-row"
              disabled={registerNewUserMutation.isPending}
            >
              {REGISTRATION_TYPES.filter(
                (type) => type.value !== "unselected",
              ).map((type) => (
                <div
                  key={type.value}
                  className="flex items-center gap-6 md:gap-2"
                >
                  <RadioGroupItem
                    value={type.value}
                    id={`${type.value}-${id}`}
                  />
                  <Label htmlFor={`${type.value}-${id}`}>{type.label}</Label>
                </div>
              ))}
            </RadioGroup>

            {!!personalDetailsForm.formState.errors.type?.message && (
              <InputHelperDescription isError>
                {personalDetailsForm.formState.errors.type.message}
              </InputHelperDescription>
            )}
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

        <StepContainerClosed onClick={() => setStep("personal")} />
      </StepContainer>

      {step === "address" && (
        <StepContainer state="open" title="Billing address">
          <StepContainerOpen
            steps={{ current: 2, total: 2 }}
            onSubmit={handleAddressOnSubmit}
          >
            <div className="grid grid-cols-3 gap-5 md:grid-cols-6">
              <div className="col-span-3 flex flex-col gap-2 md:col-span-6">
                <Label htmlFor={billingAddressId}>Street address</Label>

                <Input
                  {...addressForm.register("billingAddress")}
                  id={billingAddressId}
                  type="text"
                  required
                  disabled={registerNewUserMutation.isPending}
                />

                {!!addressForm.formState.errors.billingAddress?.message && (
                  <InputHelperDescription isError>
                    {addressForm.formState.errors.billingAddress.message}
                  </InputHelperDescription>
                )}
              </div>

              <div className="col-span-3 flex flex-col gap-2 md:col-span-6">
                <Label htmlFor={billingOptionalAddressId}>Address line 2</Label>

                <Input
                  {...addressForm.register("billingOptionalAddress")}
                  id={billingOptionalAddressId}
                  type="text"
                  disabled={registerNewUserMutation.isPending}
                />

                {!!addressForm.formState.errors.billingOptionalAddress
                  ?.message && (
                  <InputHelperDescription isError>
                    {
                      addressForm.formState.errors.billingOptionalAddress
                        .message
                    }
                  </InputHelperDescription>
                )}
              </div>

              <div className="col-span-3 flex flex-col gap-2">
                <Label htmlFor={billingCityId}>City</Label>

                <Input
                  {...addressForm.register("billingCity")}
                  id={billingCityId}
                  type="text"
                  required
                  disabled={registerNewUserMutation.isPending}
                />

                {!!addressForm.formState.errors.billingCity?.message && (
                  <InputHelperDescription isError>
                    {addressForm.formState.errors.billingCity.message}
                  </InputHelperDescription>
                )}
              </div>

              <div className="col-span-3 flex flex-col gap-2">
                <Label htmlFor={billingStateId}>State</Label>

                <Input
                  {...addressForm.register("billingState")}
                  id={billingStateId}
                  type="text"
                  required
                  disabled={registerNewUserMutation.isPending}
                />

                {!!addressForm.formState.errors.billingState?.message && (
                  <InputHelperDescription isError>
                    {addressForm.formState.errors.billingState.message}
                  </InputHelperDescription>
                )}
              </div>

              <div className="col-span-3 flex flex-col gap-2">
                <Label htmlFor={billingCountryId}>Country</Label>

                <Input
                  {...addressForm.register("billingCountry")}
                  id={billingCountryId}
                  type="text"
                  required
                  disabled={registerNewUserMutation.isPending}
                />

                {!!addressForm.formState.errors.billingCountry?.message && (
                  <InputHelperDescription isError>
                    {addressForm.formState.errors.billingCountry.message}
                  </InputHelperDescription>
                )}
              </div>

              <div className="col-span-2 flex flex-col gap-2">
                <Label htmlFor={billingPostCodeId}>Zip/Post code</Label>

                <Input
                  {...addressForm.register("billingPostCode")}
                  id={billingPostCodeId}
                  type="text"
                  required
                  disabled={registerNewUserMutation.isPending}
                />

                {!!addressForm.formState.errors.billingPostCode?.message && (
                  <InputHelperDescription isError>
                    {addressForm.formState.errors.billingPostCode.message}
                  </InputHelperDescription>
                )}
              </div>

              <div className="col-span-1 flex flex-col gap-2">
                <Label
                  htmlFor={billingZipCodeId}
                  className="overflow-hidden text-ellipsis text-nowrap"
                >
                  Zip4 (Optional)
                </Label>

                <Input
                  {...addressForm.register("billingZipCode")}
                  id={billingZipCodeId}
                  type="text"
                  disabled={registerNewUserMutation.isPending}
                />

                {!!addressForm.formState.errors.billingZipCode?.message && (
                  <InputHelperDescription isError>
                    {addressForm.formState.errors.billingZipCode.message}
                  </InputHelperDescription>
                )}
              </div>
            </div>

            <div className="space-y-5 pt-2">
              <h3 className="text-base text-wurth-gray-800">
                Shipping address
              </h3>

              <div className="flex flex-row items-center gap-2">
                <Checkbox
                  id={sameAddressId}
                  checked={sameAddress}
                  onCheckedChange={(value: CheckedState) => {
                    if (typeof value === "boolean") {
                      setSameAddress(value);
                    }
                  }}
                />

                <Label htmlFor={sameAddressId}>Same billing address</Label>
              </div>
            </div>

            {!sameAddress && (
              <div className="grid grid-cols-3 gap-5 md:grid-cols-6">
                <div className="col-span-3 flex flex-col gap-2 md:col-span-6">
                  <Label htmlFor={shippingAddressId}>Street address</Label>

                  <Input
                    {...addressForm.register("shippingAddress")}
                    id={shippingAddressId}
                    type="text"
                    required={!sameAddress}
                    disabled={registerNewUserMutation.isPending}
                  />

                  {!!addressForm.formState.errors.shippingAddress?.message && (
                    <InputHelperDescription isError>
                      {addressForm.formState.errors.shippingAddress.message}
                    </InputHelperDescription>
                  )}
                </div>

                <div className="col-span-3 flex flex-col gap-2 md:col-span-6">
                  <Label htmlFor={shippingOptionalAddressId}>
                    Address line 2
                  </Label>

                  <Input
                    {...addressForm.register("shippingOptionalAddress")}
                    id={shippingOptionalAddressId}
                    type="text"
                    disabled={registerNewUserMutation.isPending}
                  />

                  {!!addressForm.formState.errors.shippingOptionalAddress
                    ?.message && (
                    <InputHelperDescription isError>
                      {
                        addressForm.formState.errors.shippingOptionalAddress
                          .message
                      }
                    </InputHelperDescription>
                  )}
                </div>

                <div className="col-span-3 flex flex-col gap-2">
                  <Label htmlFor={shippingCityId}>City</Label>

                  <Input
                    {...addressForm.register("shippingCity")}
                    id={shippingCityId}
                    type="text"
                    required={!sameAddress}
                    disabled={registerNewUserMutation.isPending}
                  />

                  {!!addressForm.formState.errors.shippingCity?.message && (
                    <InputHelperDescription isError>
                      {addressForm.formState.errors.shippingCity.message}
                    </InputHelperDescription>
                  )}
                </div>

                <div className="col-span-3 flex flex-col gap-2">
                  <Label htmlFor={shippingStateId}>State</Label>

                  <Input
                    {...addressForm.register("shippingState")}
                    id={shippingStateId}
                    type="text"
                    required={!sameAddress}
                    disabled={registerNewUserMutation.isPending}
                  />

                  {!!addressForm.formState.errors.shippingState?.message && (
                    <InputHelperDescription isError>
                      {addressForm.formState.errors.shippingState.message}
                    </InputHelperDescription>
                  )}
                </div>

                <div className="col-span-3 flex flex-col gap-2">
                  <Label htmlFor={shippingCountryId}>Country</Label>

                  <Input
                    {...addressForm.register("shippingCountry")}
                    id={shippingCountryId}
                    type="text"
                    required={!sameAddress}
                    disabled={registerNewUserMutation.isPending}
                  />

                  {!!addressForm.formState.errors.shippingCountry?.message && (
                    <InputHelperDescription isError>
                      {addressForm.formState.errors.shippingCountry.message}
                    </InputHelperDescription>
                  )}
                </div>

                <div className="col-span-2 flex flex-col gap-2">
                  <Label htmlFor={shippingPostCodeId}>Zip/Post code</Label>

                  <Input
                    {...addressForm.register("shippingPostCode")}
                    id={shippingPostCodeId}
                    type="text"
                    required={!sameAddress}
                    disabled={registerNewUserMutation.isPending}
                  />

                  {!!addressForm.formState.errors.shippingPostCode?.message && (
                    <InputHelperDescription isError>
                      {addressForm.formState.errors.shippingPostCode.message}
                    </InputHelperDescription>
                  )}
                </div>

                <div className="col-span-1 flex flex-col gap-2">
                  <Label
                    htmlFor={shippingZipCodeId}
                    className="overflow-hidden text-ellipsis text-nowrap"
                  >
                    Zip4 (Optional)
                  </Label>

                  <Input
                    {...addressForm.register("shippingZipCode")}
                    id={shippingZipCodeId}
                    type="text"
                    disabled={registerNewUserMutation.isPending}
                  />

                  {!!addressForm.formState.errors.shippingZipCode?.message && (
                    <InputHelperDescription isError>
                      {addressForm.formState.errors.shippingZipCode.message}
                    </InputHelperDescription>
                  )}
                </div>
              </div>
            )}
          </StepContainerOpen>
        </StepContainer>
      )}
    </>
  );
};

export default NewUserFlow;
