import type { Step } from "@/(auth)/register/_components/register-new-user/register-new-user";
import type { Country } from "@/(auth)/register/_components/types";
import {
  StepContainer,
  StepContainerClosed,
  StepContainerOpen,
} from "@/_components/molecules/step-container/step-container";
import { ZipCodeInput } from "@/_components/molecules/zip-code-input/zip-code-input";
import useCounties from "@/_hooks/registration/use-counties.hook";
import useStates from "@/_hooks/registration/use-states.hook";
import { Checkbox } from "@repo/web-ui/components/base/atoms/checkbox";
import { Input } from "@repo/web-ui/components/base/atoms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/base/atoms/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/web-ui/components/base/molecules/alert";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/base/molecules/form";
import { AlertTriangle } from "lucide-react";
import React, { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { NewUserFormData } from "../register-schema";

type AddressInformationProps = {
  readonly form: UseFormReturn<NewUserFormData>;
  readonly currentStep: Step;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly isPending: boolean;
  readonly formId: string;
  readonly countries: Country[];
  readonly setStep: (step: Step) => void;
  readonly userType: string;
};

const isPOBox = (address: string) => {
  return /(?:P(?:ost(?:al)?)?[.\-\s]*(?:(?:O(?:ffice)?[.\-\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:[-\s]*\d)|code)|box[-\s\b]*\d)/i.test(
    address,
  );
};

export const AddressInformation = ({
  form,
  currentStep,
  onSubmit,
  isPending,
  countries,
  setStep,
  userType,
}: AddressInformationProps) => {
  const [showPOBoxAlert, setShowPOBoxAlert] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const billingCountry = form.watch("billingCountry");
  const billingState = form.watch("billingState");

  const shippingCountry = form.watch("shippingCountry");
  const shippingState = form.watch("shippingState");

  const billingStateQuery = useStates(billingCountry);
  const billingCountyQuery = useCounties(billingState);
  const shippingStateQuery = useStates(shippingCountry);
  const shippingCountyQuery = useCounties(shippingState);

  const handleAddressOnSubmit = (event: React.FormEvent) => {
    const addressValues = form.getValues();
    const billingAddressIsPOBox = isPOBox(addressValues.billingAddress);
    const shippingAddressIsPOBox = isPOBox(addressValues.shippingAddress);

    const billingAddressTwoIsPOBox = addressValues.billingAddressTwo
      ? isPOBox(addressValues.billingAddressTwo)
      : false;
    const shippingAddressTwoIsPOBox = addressValues.shippingAddressTwo
      ? isPOBox(addressValues.shippingAddressTwo)
      : false;

    if (
      (addressValues.same && billingAddressIsPOBox) ||
      (addressValues.same && billingAddressTwoIsPOBox)
    ) {
      setShowPOBoxAlert(true);
      form.setValue("same", false, { shouldValidate: true });
      setShowShippingForm(true);
      event.preventDefault();
      return;
    }

    if (
      (!addressValues.same && shippingAddressIsPOBox) ||
      (!addressValues.same && shippingAddressTwoIsPOBox)
    ) {
      setShowPOBoxAlert(true);
      form.setValue("same", false, { shouldValidate: true });
      setShowShippingForm(true);
      event.preventDefault();
      return;
    }
    setShowPOBoxAlert(false);
    setShowShippingForm(false);
    event.preventDefault();
    onSubmit(event);
  };
  const totalSteps = userType === "Homeowner" ? 2 : 3;
  return (
    <StepContainer
      state={currentStep === "address" ? "open" : "closed"}
      title="Billing address"
    >
      <StepContainerOpen
        steps={{ current: 2, total: totalSteps }}
        onSubmit={handleAddressOnSubmit}
        disableSubmit={isPending}
      >
        <div className="grid grid-cols-3 items-end gap-5 md:grid-cols-6">
          <FormField
            control={form.control}
            name="billingAddress"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="col-span-3 md:col-span-6">
                <FormLabel>Street address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    required
                    disabled={isPending}
                    {...field}
                    data-testid="input-billingAddress"
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
            control={form.control}
            name="billingAddressTwo"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="col-span-3 md:col-span-6">
                <FormLabel>Street address (line 2) </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    {...field}
                    data-testid="input-billingAddressTwo"
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
            control={form.control}
            name="billingCity"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="col-span-3 md:col-span-6">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    required
                    disabled={isPending}
                    {...field}
                    data-testid="input-billingCity"
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
            control={form.control}
            name="billingCountry"
            render={({ field }) => (
              <FormItem className="col-span-3 self-start">
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isPending}
                  data-testid="select-country"
                >
                  <FormControl>
                    <SelectTrigger data-testid="country-select-trigger">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries?.map((country) => (
                      <SelectItem
                        key={country.code}
                        value={country.code}
                        data-testid={`country-option-${country.code}`}
                      >
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
            control={form.control}
            name="billingState"
            render={({ field }) => (
              <FormItem className="col-span-3 self-start">
                <FormLabel>State</FormLabel>
                {billingCountry === "US" ? (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!billingCountry || isPending}
                    data-testid="billing-state-select"
                  >
                    <FormControl>
                      <SelectTrigger data-testid="billing-state-select-trigger">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billingStateQuery.data?.map((state) => (
                        <SelectItem
                          key={state.code}
                          value={state.code}
                          data-testid={`billing-state-option-${state.code}`}
                        >
                          {state.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      disabled={isPending}
                      data-testid="input-billingState"
                    />
                  </FormControl>
                )}
                <FormDescription className="sr-only">
                  This is the state of your billing address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="billingCounty"
            render={({ field }) => (
              <FormItem className="col-span-3 mt-[0.85rem] self-start">
                <FormLabel>County (Optional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!billingState || isPending}
                  data-testid="billing-county-select"
                >
                  <FormControl>
                    <SelectTrigger data-testid="billing-county-select-trigger">
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {billingCountyQuery.data?.map(({ county }) => (
                      <SelectItem
                        key={county}
                        value={county}
                        data-testid={`billing-county-option-${county.replace(/\s+/g, "-").toLowerCase()}`}
                      >
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
          <div className="col-span-2 md:col-span-2">
            <ZipCodeInput
              control={form.control}
              name="billingPostCode"
              label="Zip/Postal code"
              description="Enter your zip code here."
            />
          </div>
          <FormField
            control={form.control}
            name="billingZipCode"
            disabled={isPending}
            render={({ field }) => (
              <FormItem className="col-span-1 self-start">
                <FormLabel className="overflow-hidden text-ellipsis text-wrap">
                  Zip4 (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    {...field}
                    data-testid="input-billingZipCode"
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
          <h3 className="text-base font-semibold text-wurth-gray-800">
            Shipping address
          </h3>

          <FormField
            control={form.control}
            name="same"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (checked) {
                        setShowShippingForm(false);
                        setShowPOBoxAlert(false);
                      } else {
                        setShowShippingForm(true);
                        setShowPOBoxAlert(false);
                      }
                    }}
                    data-testid="checkbox-sameAsBilling"
                  />
                </FormControl>

                <FormLabel>Same billing address</FormLabel>

                <FormDescription className="sr-only">
                  Check this if the shipping address is the same as your billing
                  address
                </FormDescription>
              </FormItem>
            )}
          />
          {showPOBoxAlert ? (
            <Alert
              variant="warning"
              className="mb-2 flex items-start rounded-lg border p-4"
              data-testid="alert-poBoxWarning-"
            >
              <div className="mr-2 flex flex-shrink-0 items-center">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <AlertTitle
                  className="mb-1 text-sm font-semibold"
                  data-testid="alert-title-poBoxWarning"
                >
                  Shipping Address cannot be a PO Box
                </AlertTitle>
                <AlertDescription
                  className="text-xs"
                  data-testid="alert-desc-poBoxWarning"
                >
                  You have added a PO box number as your Billing and Shipping
                  address. We do not ship to PO boxes. Please add a physical
                  Shipping address.
                </AlertDescription>
              </div>
            </Alert>
          ) : null}
        </div>

        {showShippingForm || !form.watch("same") ? (
          <div className="grid grid-cols-3 items-end gap-5 md:grid-cols-6">
            <FormField
              control={form.control}
              name="shippingAddress"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="col-span-3 md:col-span-6">
                  <FormLabel>Street address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      required
                      disabled={isPending}
                      {...field}
                      data-testid="input-shippingStreetAddress"
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
              control={form.control}
              name="shippingAddressTwo"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="col-span-3 md:col-span-6">
                  <FormLabel>Street address (line 2)</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      {...field}
                      data-testid="input-shippingAddressTwo"
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
              control={form.control}
              name="shippingCity"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="col-span-3 md:col-span-6">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      required
                      disabled={isPending}
                      {...field}
                      data-testid="input-shippingCity"
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
              control={form.control}
              name="shippingCountry"
              render={({ field }) => (
                <FormItem className="col-span-3 self-start">
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                    data-testid="select-shippingCountry"
                  >
                    <FormControl>
                      <SelectTrigger data-testid="shipping-country-select-trigger">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem
                          key={country.code}
                          value={country.code}
                          data-testid={`shipping-country-option-${country.code}`}
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
              control={form.control}
              name="shippingState"
              render={({ field }) => (
                <FormItem className="col-span-3 self-start">
                  <FormLabel>State</FormLabel>
                  {shippingCountry === "US" ? (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!shippingCountry || isPending}
                      data-testid="select-shippingState"
                    >
                      <FormControl>
                        <SelectTrigger data-testid="shipping-state-select-trigger">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shippingStateQuery.data?.map((state) => (
                          <SelectItem
                            key={state.code}
                            value={state.code}
                            data-testid={`shipping-state-option-${state.code}`}
                          >
                            {state.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        disabled={isPending}
                        data-testid="input-shippingState"
                      />
                    </FormControl>
                  )}
                  <FormDescription className="sr-only">
                    This is the state of your shipping address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingCounty"
              render={({ field }) => (
                <FormItem className="col-span-3 mt-[0.8rem] self-start">
                  <FormLabel>County (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!shippingState || isPending}
                    data-testid="shipping-county-select"
                  >
                    <FormControl>
                      <SelectTrigger data-testid="shipping-county-select-trigger">
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {shippingCountyQuery.data?.map(({ county }) => (
                        <SelectItem
                          key={county}
                          value={county}
                          data-testid={`shipping-county-option-${county.replace(/\s+/g, "-").toLowerCase()}`}
                        >
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
            <div className="col-span-2 md:col-span-2">
              <ZipCodeInput
                control={form.control}
                name="shippingPostCode"
                label="Zip/Postal code"
                description="Enter your shipping zip code here."
              />
            </div>
            <FormField
              control={form.control}
              name="shippingZipCode"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="col-span-1 self-start">
                  <FormLabel className="overflow-hidden text-ellipsis text-wrap">
                    Zip4 (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isPending}
                      {...field}
                      data-testid="input-shippingZip4"
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
        ) : null}
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
      <StepContainerClosed onClick={() => setStep("address")} />
    </StepContainer>
  );
};
