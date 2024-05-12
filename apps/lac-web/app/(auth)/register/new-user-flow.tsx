import useCounties from "@/_hooks/registration/use-counties.hook";
import useCountries from "@/_hooks/registration/use-countries.hook";
import useStates from "@/_hooks/registration/use-states.hook";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { useToast } from "@repo/web-ui/components/ui/toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ComponentProps, useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputHelperDescription from "../input-helper-description";
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
  { value: "R", label: "private / residential purposes" },
  { value: "C", label: "Business" },
  { value: "unselected", label: "Unselected" },
] as const;
const REGISTRATION_TYPES_VALUES = ["R", "C", "unselected"] as const;
type RegistrationType = (typeof REGISTRATION_TYPES_VALUES)[number];

const personalDetailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  type: z.enum(REGISTRATION_TYPES_VALUES),
  companyName: z.string(),
  industry: z.string(),
  employees: z.number(),
});
const addressSchema = z.object({
  billingAddress: z.string(),
  billingCity: z.string(),
  billingCountry: z.string(),
  billingState: z.string(),
  billingCounty: z.string(),
  billingPostCode: z.string(),
  billingZipCode: z.string().optional(),

  same: z.boolean(),

  shippingAddress: z.string(),
  shippingCity: z.string(),
  shippingCountry: z.string(),
  shippingState: z.string(),
  shippingCounty: z.string(),
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
  const companyNameId = `company-name-${id}`;
  const industryId = `industry-${id}`;
  const employeesId = `employees-${id}`;
  const billingAddressId = `billing-address-${id}`;
  const billingCityId = `billing-city-${id}`;
  const billingStateId = `billing-state-${id}`;
  const billingCountryId = `billing-country-${id}`;
  const billingCountyId = `billing-county-${id}`;
  const billingPostCodeId = `billing-post-code-${id}`;
  const billingZipCodeId = `billing-zip-code-${id}`;
  const sameAddressId = `confirm-address-${id}`;
  const shippingAddressId = `shipping-address-${id}`;
  const shippingCityId = `shipping-city-${id}`;
  const shippingStateId = `shipping-state-${id}`;
  const shippingCountryId = `shipping-country-${id}`;
  const shippingCountyId = `shipping-county-${id}`;
  const shippingPostCodeId = `shipping-post-code-${id}`;
  const shippingZipCodeId = `shipping-zip-code-${id}`;

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [step, setStep] = useState<Step>("personal");
  const [sameAddress, setSameAddress] = useState(true);

  const { toast } = useToast();

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
      email: email ?? "",
      password: "",
      confirmPassword: "",
      type: "unselected",
      companyName: "",
      industry: "",
      employees: 0,
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
      billingCity: "",
      billingCountry: "",
      billingState: "",
      billingCounty: "",
      billingPostCode: "",
      billingZipCode: "",
      same: sameAddress,
      shippingAddress: "",
      shippingCity: "",
      shippingCountry: "",
      shippingState: "",
      shippingCounty: "",
      shippingPostCode: "",
      shippingZipCode: "",
    },
  });

  const billingCountry = addressForm.watch("billingCountry");
  const billingState = addressForm.watch("billingState");
  const billingCounty = addressForm.watch("billingCounty");
  const shippingCountry = addressForm.watch("shippingCountry");
  const shippingState = addressForm.watch("shippingState");
  const shippingCounty = addressForm.watch("shippingCounty");

  const billingCountryQuery = useCountries();
  const billingStateQuery = useStates(billingCountry);
  const billingCountyQuery = useCounties(billingState);
  const shippingCountryQuery = useCountries();
  const shippingStateQuery = useStates(shippingCountry);
  const shippingCountyQuery = useCounties(shippingState);

  const registerNewUserMutation = useRegisterNewUserMutation();
  const handleAddressOnSubmit = addressForm.handleSubmit((values) => {
    const {
      firstName,
      lastName,
      email,
      password,
      type,
      companyName,
      industry,
      employees,
    } = personalDetailsForm.getValues();

    registerNewUserMutation.mutate(
      {
        firstName,
        lastName,
        email,
        password,
        type,
        company: companyName,
        industry,
        employees,
        billingAddress: {
          address: values.billingAddress,
          city: values.billingCity,
          country: values.billingCountry,
          state: values.billingState,
          county: values.billingCounty,
          postalCode: values.billingPostCode,
          zipCode: values.billingZipCode,
        },
        shippingAddress: {
          address: sameAddress ? values.billingAddress : values.shippingAddress,
          city: sameAddress ? values.billingCity : values.shippingCity,
          country: sameAddress ? values.billingCountry : values.shippingCountry,
          state: sameAddress ? values.billingState : values.shippingState,
          county: sameAddress ? values.billingCounty : values.shippingCounty,
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
          } else {
            toast({
              title: "Registered successfully",
            });
            router.replace("/");
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

          {type === "C" && (
            <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
              <h3 className="flex-1 text-base font-semibold text-wurth-gray-800">
                Business details
              </h3>

              <div className="flex flex-col gap-2 md:col-span-2">
                <Label htmlFor={companyNameId}>Name of the company</Label>

                <Input
                  {...personalDetailsForm.register("companyName")}
                  id={companyNameId}
                  type="text"
                  required={type === "C"}
                  disabled={registerNewUserMutation.isPending}
                />

                {!!personalDetailsForm.formState.errors.companyName
                  ?.message && (
                  <InputHelperDescription isError>
                    {personalDetailsForm.formState.errors.companyName.message}
                  </InputHelperDescription>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor={industryId}>Industry</Label>

                <Input
                  {...personalDetailsForm.register("industry")}
                  id={industryId}
                  type="text"
                  required={type === "C"}
                  disabled={registerNewUserMutation.isPending}
                />

                {!!personalDetailsForm.formState.errors.industry?.message && (
                  <InputHelperDescription isError>
                    {personalDetailsForm.formState.errors.industry.message}
                  </InputHelperDescription>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor={employeesId}>Number of employees</Label>

                <Input
                  {...personalDetailsForm.register("employees", {
                    valueAsNumber: true,
                  })}
                  id={employeesId}
                  type="number"
                  required={type === "C"}
                  disabled={registerNewUserMutation.isPending}
                />

                {!!personalDetailsForm.formState.errors.employees?.message && (
                  <InputHelperDescription isError>
                    {personalDetailsForm.formState.errors.employees.message}
                  </InputHelperDescription>
                )}
              </div>
            </div>
          )}

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
                <Label htmlFor={billingCountryId}>Country</Label>

                <Select
                  value={billingCountry}
                  onValueChange={(value) => {
                    addressForm.setValue("billingCountry", value);
                    addressForm.setValue("billingState", "");
                    addressForm.setValue("billingCounty", "");
                  }}
                >
                  <SelectTrigger id={billingCountryId}>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {billingCountryQuery.data?.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {!!addressForm.formState.errors.billingCountry?.message && (
                  <InputHelperDescription isError>
                    {addressForm.formState.errors.billingCountry.message}
                  </InputHelperDescription>
                )}
              </div>

              <div className="col-span-3 flex flex-col gap-2">
                <Label htmlFor={billingStateId}>State</Label>

                <Select
                  value={billingState}
                  onValueChange={(value) => {
                    addressForm.setValue("billingState", value);
                    addressForm.setValue("billingCounty", "");
                  }}
                  disabled={!billingCountry}
                >
                  <SelectTrigger id={billingStateId}>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {billingStateQuery.data?.map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {!!addressForm.formState.errors.billingState?.message && (
                  <InputHelperDescription isError>
                    {addressForm.formState.errors.billingState.message}
                  </InputHelperDescription>
                )}
              </div>

              <div className="col-span-3 flex flex-col gap-2">
                <Label htmlFor={billingCountyId}>County</Label>

                <Select
                  value={billingCounty}
                  onValueChange={(value) =>
                    addressForm.setValue("billingCounty", value)
                  }
                  disabled={!billingState}
                >
                  <SelectTrigger id={billingCountyId}>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {billingCountyQuery.data?.map(({ county }) => (
                      <SelectItem key={county} value={county}>
                        {county}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {!!addressForm.formState.errors.billingCounty?.message && (
                  <InputHelperDescription isError>
                    {addressForm.formState.errors.billingCounty.message}
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
                  <Label htmlFor={shippingCountryId}>Country</Label>

                  <Select
                    value={shippingCountry}
                    onValueChange={(value) => {
                      addressForm.setValue("shippingCountry", value);
                      addressForm.setValue("shippingState", "");
                      addressForm.setValue("shippingCounty", "");
                    }}
                  >
                    <SelectTrigger id={shippingCountryId}>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {shippingCountryQuery.data?.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {!!addressForm.formState.errors.shippingCountry?.message && (
                    <InputHelperDescription isError>
                      {addressForm.formState.errors.shippingCountry.message}
                    </InputHelperDescription>
                  )}
                </div>

                <div className="col-span-3 flex flex-col gap-2">
                  <Label htmlFor={shippingStateId}>State</Label>

                  <Select
                    value={shippingState}
                    onValueChange={(value) => {
                      addressForm.setValue("shippingState", value);
                      addressForm.setValue("shippingCounty", "");
                    }}
                  >
                    <SelectTrigger id={shippingStateId}>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {shippingStateQuery.data?.map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {!!addressForm.formState.errors.shippingState?.message && (
                    <InputHelperDescription isError>
                      {addressForm.formState.errors.shippingState.message}
                    </InputHelperDescription>
                  )}
                </div>

                <div className="col-span-3 flex flex-col gap-2">
                  <Label htmlFor={shippingCountyId}>County</Label>

                  <Select
                    value={shippingCounty}
                    onValueChange={(value) =>
                      addressForm.setValue("shippingCounty", value)
                    }
                  >
                    <SelectTrigger id={shippingCountyId}>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {shippingCountyQuery.data?.map(({ county }) => (
                        <SelectItem key={county} value={county}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {!!addressForm.formState.errors.shippingCounty?.message && (
                    <InputHelperDescription isError>
                      {addressForm.formState.errors.shippingCounty.message}
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
