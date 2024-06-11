import ZipCodeInputField from "@/_components/zip-code-input-field";
import useCounties from "@/_hooks/registration/use-counties.hook";
import useCountries from "@/_hooks/registration/use-countries.hook";
import useStates from "@/_hooks/registration/use-states.hook";
import type { PasswordPolicies } from "@/_lib/types";
import { NUMBER_TYPE } from "@/_lib/zod-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/web-ui/components/ui/alert-dialog";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
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
import { useMemo, useState, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddressSelector from "./address-selector";
import {
  StepContainer,
  StepContainerClosed,
  StepContainerOpen,
} from "./step-container";
import type { Industry } from "./types";
import type { ResponseAddress } from "./use-register-new-user-mutation.hook";
import useRegisterNewUserMutation, {
  isVerifyAddressResponse,
} from "./use-register-new-user-mutation.hook";

type Step = "personal" | "address";

const REGISTRATION_TYPES = [
  { value: "R", label: "private / residential purposes" },
  { value: "C", label: "Business" },
  { value: "unselected", label: "Unselected" },
] as const;
const REGISTRATION_TYPES_VALUES = ["R", "C", "unselected"] as const;

const personalDetailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  type: z.enum(REGISTRATION_TYPES_VALUES),
  companyName: z.string(),
  industry: z.string(),
  employees: NUMBER_TYPE,
});
const addressSchema = z
  .object({
    billingAddress: z.string().min(6, "Please enter a valid address"),
    billingCity: z.string().min(1, "Please enter a valid City"), // there are cities with just 1 letter also
    billingCountry: z.string().min(2, "Please select a valid country"),
    billingState: z.string().min(2, "Please select a valid state"),
    billingCounty: z.string().optional(),
    billingPostCode: z
      .string()
      .length(5, "Please enter a valid Zip/Postal code"),
    billingZipCode: z.string().optional(),

    same: z.boolean(),

    shippingAddress: z.string(),
    shippingCity: z.string(),
    shippingCountry: z.string(),
    shippingState: z.string(),
    shippingCounty: z.string().optional(),
    shippingPostCode: z.string(),
    shippingZipCode: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (!values.same) {
      if (values.shippingAddress.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingAddress"],
          message: "Please enter a valid address",
        });
      }

      if (values.shippingCity.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingCity"],
          message: "Please enter a valid address",
        });
      }

      if (values.shippingCountry.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingCountry"],
          message: "Please select a valid country",
        });
      }

      if (values.shippingState.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingState"],
          message: "Please select a valid state",
        });
      }

      if (values.shippingPostCode.length != 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["shippingPostCode"],
          message: "Please enter a valid Zip/Postal code",
        });
      }
    }
  });
type AddressSchema = z.infer<typeof addressSchema>;

type NewUserFlowProps = {
  readonly passwordPolicies: PasswordPolicies;
  readonly industries: Industry[];
};

const NewUserFlow = ({ passwordPolicies, industries }: NewUserFlowProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [step, setStep] = useState<Step>("personal");
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false);

  const { toast } = useToast();

  const [billingSuggestions, setBillingSuggestions] = useState<
    ResponseAddress[]
  >([]);
  const [shippingSuggestions, setShippingSuggestions] = useState<
    ResponseAddress[]
  >([]);
  // Backup state of the address form because all the fields
  // become undefined after submitting. This is a workaround.
  const [formValues, setFormValues] = useState<AddressSchema>({
    billingAddress: "",
    billingCity: "",
    billingCountry: "",
    billingState: "",
    billingCounty: "",
    billingPostCode: "",
    billingZipCode: "",
    same: true,
    shippingAddress: "",
    shippingCity: "",
    shippingCountry: "",
    shippingState: "",
    shippingCounty: "",
    shippingPostCode: "",
    shippingZipCode: "",
  });

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

  const addressForm = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    values: formValues,
  });

  const billingCountry = addressForm.watch("billingCountry");
  const billingState = addressForm.watch("billingState");
  const sameAddress = addressForm.watch("same");
  const shippingCountry = addressForm.watch("shippingCountry");
  const shippingState = addressForm.watch("shippingState");

  const countriesQuery = useCountries();
  const billingStateQuery = useStates(billingCountry);
  const billingCountyQuery = useCounties(billingState);
  const shippingStateQuery = useStates(shippingCountry);
  const shippingCountyQuery = useCounties(shippingState);

  const registerNewUserMutation = useRegisterNewUserMutation();

  const registerUser = (values: AddressSchema, skipAddressCheck?: boolean) => {
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
          address: values.same ? values.billingAddress : values.shippingAddress,
          city: values.same ? values.billingCity : values.shippingCity,
          country: values.same ? values.billingCountry : values.shippingCountry,
          state: values.same ? values.billingState : values.shippingState,
          county: values.same ? values.billingCounty : values.shippingCounty,
          postalCode: values.same
            ? values.billingPostCode
            : values.shippingPostCode,
          zipCode: values.same ? values.billingZipCode : values.shippingZipCode,
        },
        skipAddressCheck,
      },
      {
        onSuccess: (data) => {
          // Scroll to the address form of the page
          window.scrollTo({ top: 300, behavior: "smooth" });

          if (isVerifyAddressResponse(data)) {
            if (Array.isArray(data.suggestions)) {
              // If registration fails, data.suggestions becomes an array
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
            toast({
              title: "Registered successfully",
            });
            if (
              billingSuggestions.length == 0 ||
              shippingSuggestions.length == 0
            ) {
              router.replace("/");
            }
          }
        },
      },
    );
  };

  const onOkButtonClicked = () => {
    router.replace("/");
  };

  const handleAddressOnSubmit = addressForm.handleSubmit((values) => {
    setFormValues(values);
    registerUser(values);
  });

  const handleClearSuggestions = () => {
    // Clear all suggestions
    setBillingSuggestions([]);
    setShippingSuggestions([]);
    // Scroll to the address form of the page
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const updateAddress: ComponentProps<
    typeof AddressSelector
  >["updateAddress"] = ({ billing, shipping }) => {
    const newFormValues = structuredClone(formValues);
    let isSkipAddressCheck = false;

    if (billing) {
      newFormValues.billingAddress = billing["street-address"];
      newFormValues.billingCity = billing.locality;
      newFormValues.billingCounty = billing.county;
      newFormValues.billingState = billing.region;
      newFormValues.billingCountry = billing["country-name"];
      newFormValues.billingPostCode = billing["postal-code"];
      newFormValues.billingZipCode = billing.zip4;
      isSkipAddressCheck = true;
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
      isSkipAddressCheck = true;
    }

    // Submit the form again
    registerUser(newFormValues, isSkipAddressCheck);
  };

  // Hide the forms when there is an address conflict.
  // During this time, suggestions will be returned from either UPS or
  // SAP. Once the user selected the correct address, the suggestions arrays
  // should be cleared.
  if (billingSuggestions.length > 0 || shippingSuggestions.length > 0) {
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
              <AlertDialogAction onClick={onOkButtonClicked}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AddressSelector
          billingAddresses={billingSuggestions}
          shippingAddresses={shippingSuggestions}
          clearSuggestions={() => handleClearSuggestions()}
          updateAddress={updateAddress}
          disabled={registerNewUserMutation.isPending}
        />
      </>
    );
  }

  return (
    <>
      <StepContainer
        state={step === "personal" ? "open" : "closed"}
        title="Personal details"
      >
        <Form {...personalDetailsForm}>
          <StepContainerOpen
            steps={{ current: 1, total: 2 }}
            onSubmit={handlePersonalDetailsOnSubmit}
          >
            <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
              <FormField
                control={personalDetailsForm.control}
                name="firstName"
                disabled={registerNewUserMutation.isPending}
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
                disabled={registerNewUserMutation.isPending}
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
                disabled={registerNewUserMutation.isPending}
                render={({ field }) => (
                  <FormItem className="hidden">
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
                      This is your Email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={personalDetailsForm.control}
                name="password"
                disabled={registerNewUserMutation.isPending}
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
                disabled={registerNewUserMutation.isPending}
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
                      This is to confirm your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={personalDetailsForm.control}
              name="type"
              disabled={registerNewUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold leading-5">
                    I&apos;m buying for
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="item-center flex flex-col gap-2 md:flex-row"
                      disabled={registerNewUserMutation.isPending}
                    >
                      {REGISTRATION_TYPES.filter(
                        (type) => type.value !== "unselected",
                      ).map((type) => (
                        <FormItem
                          key={type.value}
                          className="flex flex-row items-center gap-6 md:gap-2"
                        >
                          <FormControl>
                            <RadioGroupItem value={type.value} />
                          </FormControl>
                          <FormLabel>{type.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {type === "C" && (
              <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
                <h3 className="flex-1 text-base font-semibold text-wurth-gray-800">
                  Business details
                </h3>

                <FormField
                  control={personalDetailsForm.control}
                  name="companyName"
                  disabled={registerNewUserMutation.isPending}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          required={type === "C"}
                          disabled={registerNewUserMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is the name of your company.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={personalDetailsForm.control}
                  name="industry"
                  disabled={registerNewUserMutation.isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={registerNewUserMutation.isPending}
                        required={type === "C"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem
                              key={industry.code}
                              value={industry.code}
                            >
                              {industry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="sr-only">
                        This is the industry of your company.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={personalDetailsForm.control}
                  name="employees"
                  disabled={registerNewUserMutation.isPending}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of employees</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          required={type === "C"}
                          disabled={registerNewUserMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is the number of employees at your company.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <p className="text-sm text-wurth-gray-800">
              By continuing, you agree to the{" "}
              <Link
                target="_blank"
                href="/privacy-policy"
                className="font-semibold underline"
              >
                Privacy Notice
              </Link>{" "}
              and{" "}
              <Link
                target="_blank"
                href="/terms-of-sale"
                className="font-semibold underline"
              >
                Terms and Conditions
              </Link>{" "}
              and you consent to the collection and processing of your personal
              data for purposes of completing transactions.
            </p>
          </StepContainerOpen>

          <StepContainerClosed onClick={() => setStep("personal")} />
        </Form>
      </StepContainer>

      {step === "address" && (
        <StepContainer state="open" title="Billing address">
          <Form {...addressForm}>
            <StepContainerOpen
              steps={{ current: 2, total: 2 }}
              onSubmit={handleAddressOnSubmit}
              disableSubmit={registerNewUserMutation.isPending}
            >
              <div className="grid grid-cols-3 items-end gap-5 md:grid-cols-6">
                <FormField
                  control={addressForm.control}
                  name="billingAddress"
                  disabled={registerNewUserMutation.isPending}
                  render={({ field }) => (
                    <FormItem className="col-span-3 md:col-span-6">
                      <FormLabel>Street address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          required
                          disabled={registerNewUserMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is the street address of your billing address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addressForm.control}
                  name="billingCity"
                  disabled={registerNewUserMutation.isPending}
                  render={({ field }) => (
                    <FormItem className="col-span-3 md:col-span-6">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          required
                          disabled={registerNewUserMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is the city of your billing address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addressForm.control}
                  name="billingCountry"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={registerNewUserMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countriesQuery.data?.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="sr-only">
                        This is the country of your billing address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addressForm.control}
                  name="billingState"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={
                          !billingCountry || registerNewUserMutation.isPending
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {billingStateQuery.data?.map((state) => (
                            <SelectItem key={state.code} value={state.code}>
                              {state.country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="sr-only">
                        This is the state of your billing address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addressForm.control}
                  name="billingCounty"
                  render={({ field }) => (
                    <FormItem className="col-span-3 self-end">
                      <FormLabel>County</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={
                          !billingState || registerNewUserMutation.isPending
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select county" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {billingCountyQuery.data?.map(({ county }) => (
                            <SelectItem key={county} value={county}>
                              {county}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="sr-only">
                        This is the county of your billing address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addressForm.control}
                  name="billingPostCode"
                  disabled={registerNewUserMutation.isPending}
                  render={({ field }) => (
                    <FormItem className="col-span-2 self-end">
                      <FormLabel>Zip/Post code</FormLabel>
                      <FormControl>
                        <ZipCodeInputField
                          {...field}
                          disabled={registerNewUserMutation.isPending}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is the Zip/Post code of your billing address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addressForm.control}
                  name="billingZipCode"
                  disabled={registerNewUserMutation.isPending}
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel className="overflow-hidden text-ellipsis text-wrap">
                        Zip4 (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          disabled={registerNewUserMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is the Zip4 of your billing address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-5 pt-2">
                <h3 className="text-base text-wurth-gray-800">
                  Shipping address
                </h3>

                <FormField
                  control={addressForm.control}
                  name="same"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>

                      <FormLabel>Same billing address</FormLabel>

                      <FormDescription className="sr-only">
                        Check this if the shipping address is the same as your
                        billing address
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              {!sameAddress && (
                <div className="grid grid-cols-3 items-end gap-5 md:grid-cols-6">
                  <FormField
                    control={addressForm.control}
                    name="shippingAddress"
                    disabled={registerNewUserMutation.isPending}
                    render={({ field }) => (
                      <FormItem className="col-span-3 md:col-span-6">
                        <FormLabel>Street address</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            required
                            disabled={registerNewUserMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is the street address of your shipping address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addressForm.control}
                    name="shippingCity"
                    disabled={registerNewUserMutation.isPending}
                    render={({ field }) => (
                      <FormItem className="col-span-3 md:col-span-6">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            required
                            disabled={registerNewUserMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is the city of your shipping address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addressForm.control}
                    name="shippingCountry"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={registerNewUserMutation.isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countriesQuery.data?.map((country) => (
                              <SelectItem
                                key={country.code}
                                value={country.code}
                              >
                                {country.country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="sr-only">
                          This is the country of your shipping address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addressForm.control}
                    name="shippingState"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>State</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={
                            !shippingCountry ||
                            registerNewUserMutation.isPending
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shippingStateQuery.data?.map((state) => (
                              <SelectItem key={state.code} value={state.code}>
                                {state.country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="sr-only">
                          This is the state of your shipping address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addressForm.control}
                    name="shippingCounty"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>County</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={
                            !shippingState || registerNewUserMutation.isPending
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select county" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shippingCountyQuery.data?.map(({ county }) => (
                              <SelectItem key={county} value={county}>
                                {county}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="sr-only">
                          This is the county of your shipping address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addressForm.control}
                    name="shippingPostCode"
                    disabled={registerNewUserMutation.isPending}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Zip/Post code</FormLabel>
                        <FormControl>
                          <ZipCodeInputField
                            {...field}
                            disabled={registerNewUserMutation.isPending}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is the Zip/Post code of your shipping address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={addressForm.control}
                    name="shippingZipCode"
                    disabled={registerNewUserMutation.isPending}
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel className="overflow-hidden text-ellipsis text-wrap">
                          Zip4 (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            disabled={registerNewUserMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is the Zip4 of your shipping address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </StepContainerOpen>
          </Form>
        </StepContainer>
      )}
    </>
  );
};

export default NewUserFlow;
