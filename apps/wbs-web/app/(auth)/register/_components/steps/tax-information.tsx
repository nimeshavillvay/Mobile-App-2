import type { Step } from "@/(auth)/register/_components/register-new-user/register-new-user";
import type { Industry } from "@/(auth)/register/types";
import {
  StepContainer,
  StepContainerOpen,
} from "@/_components/molecules/step-container/step-container";
import { FederalTaxIdInput } from "@/_components/molecules/tax-id-input";
import { Button } from "@repo/web-ui/components/base/atoms/button";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/base/molecules/form";
import { PDFDownload } from "@repo/web-ui/components/icons/pdf-download";
import Link from "next/link";
import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { NewUserFormData } from "../register-schema";

type TaxInformationProps = {
  readonly form: UseFormReturn<NewUserFormData>;
  readonly currentStep: Step;
  readonly onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  readonly isPending: boolean;
  readonly formId: string;
  readonly industries: Industry[];
};

export const TaxInformation = ({
  form,
  currentStep,
  onSubmit,
  isPending,
  industries,
}: TaxInformationProps) => {
  const isExemptFromTax = form.watch("isExemptFromTax");
  const taxDocuments = form.watch("taxDocuments") || [];

  const handleAddTaxDocument = () => {
    const currentDocuments = form.getValues("taxDocuments") || [];
    form.setValue("taxDocuments", [
      ...currentDocuments,
      { stateTaxExemptionNumber: "", document: "" },
    ]);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(
      process.env.NEXT_PUBLIC_WURTH_LAC_API +
        "assets/tax_forms/WBSC-Credit-Application.pdf",
      "_blank",
    );
  };

  return (
    <StepContainer
      title="Additional details"
      state={currentStep === "tax" ? "open" : "closed"}
    >
      <StepContainerOpen
        steps={{ current: 3, total: 3 }}
        onSubmit={onSubmit}
        disableSubmit={isPending}
      >
        <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
          <FormField
            control={form.control}
            name="federalTaxId"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Federal tax ID</FormLabel>
                <FormControl>
                  <FederalTaxIdInput
                    placeholder="00-0000000"
                    required
                    disabled={isPending}
                    {...field}
                    data-testid="input-federalTaxId"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  disabled={isPending}
                  required
                  data-testid="select-industry"
                >
                  <FormControl>
                    <SelectTrigger data-testid="si-trigger">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem
                        key={industry.code}
                        value={industry.code}
                        data-testid={`si-item-${industry.code}`}
                      >
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employees"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of employees</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    required
                    disabled={isPending}
                    {...field}
                    data-testid="input-employees"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="rounded-lg bg-sky-50 p-4 md:col-span-2">
            <div className="flex h-full flex-col">
              <h3 className="mb-2 text-xl font-bold">
                Applying for open terms?
              </h3>
              <div className="flex h-full flex-col justify-between">
                <p className="text-sm">
                  Download and fill out the application to clear credit
                  references and banking information.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    className="flex items-center whitespace-nowrap font-bold"
                    onClick={handleDownload}
                    data-testid="button-downloadCreditApplication"
                  >
                    <PDFDownload className="mr-2 h-5 w-5" />
                    Download credit application
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="isExemptFromTax"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 md:col-span-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (checked && taxDocuments.length === 0) {
                        form.setValue("taxDocuments", [
                          { stateTaxExemptionNumber: "", document: "" },
                        ]);
                      }
                    }}
                    data-testid="checkbox-taxExempt"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Is your business exempt from paying sales tax?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {isExemptFromTax ? (
            <div className="space-y-5 text-gray-600 md:col-span-2">
              <p className="text-sm">
                If your business is exempt from paying Sales Tax, please enter
                your State Tax Exemption Certification number in the space
                provided and attach a copy of your Tax Exemption certificate
                below. You may attach multiple certificates for each state you
                are exempt in by clicking the &quot;Add more&quot; button.
              </p>
              <p className="text-sm">
                If you are unsure about which certificate to load, please click
                the &quot;View Tax Exemption forms by state&quot; link to see
                examples and/or get the appropriate form.
              </p>

              <div className="text-sm">
                <p className="mb-2">
                  Only upload up-to-date State Tax Exemption Certificates with
                  authorized signature. See forms linked if you are unsure what
                  to upload. Please do not upload:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Business Licenses</li>
                  <li>State Seller&apos;s Permits</li>
                  <li>Picture of Gandalf or your dog Tony</li>
                </ul>
              </div>
              {(taxDocuments.length > 0
                ? taxDocuments
                : [{ stateTaxExemptionNumber: "", document: "" }]
              ).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <FormField
                    control={form.control}
                    name={`taxDocuments.${index}.stateTaxExemptionNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          State tax exemption certificate number
                        </FormLabel>
                        <FormControl>
                          <FederalTaxIdInput
                            placeholder="00-0000000"
                            {...field}
                            data-testid={`input-stateTaxExemptionNumber-${index}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`taxDocuments.${index}.document`}
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload certificate</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            id={`file-upload-${index}`}
                            data-testid={`input-taxDocumentUpload-${index}`}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                form.setValue(
                                  `taxDocuments.${index}.document`,
                                  file.name,
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  onClick={handleAddTaxDocument}
                  disabled={taxDocuments.length >= 50}
                  className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                  data-testid="add-tax-document-button"
                >
                  <span className="mr-1">⊕</span>{" "}
                  <FormLabel className="font-weight: 700;">Add new</FormLabel>
                </Button>

                <Link
                  href="https://www.baersupply.com/v2/wbsc/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                  data-testid="link-viewTaxExemptionForms"
                >
                  View Tax Exemption forms by state
                </Link>
              </div>
              <p className="text-sm">
                We will gladly process your Tax Exemption request upon receipt
                of the correct form. Your order will be held up to 24 hours to
                allow the application of the tax exemption. Since we don’t want
                your shipment to be delayed due to paperwork, if we do not
                receive the form within 24 hours, we will move forward and
                process your order as-is.
              </p>
            </div>
          ) : null}
        </div>
      </StepContainerOpen>
    </StepContainer>
  );
};

export default TaxInformation;
