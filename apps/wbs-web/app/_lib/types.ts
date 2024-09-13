export type Country = {
  code: string;
  country: string;
};

export type TaxDocument = {
  stateTaxExemptionNumber?: string;
  document?: FormData;
};

export type PasswordPolicies = {
  minimumLength: number;
  minimumNumbers: number;
  minimumAlphabets: number;
};

export type CheckUsernameResponse = {
  status_code: string;
  message: string;
};

export type Address = {
  address: string;
  addressTwo?: string;
  city: string;
  country: string;
  state: string;
  county?: string;
  postalCode: string;
  zipCode?: string;
};

export type ApiBillingAddress = {
  "country-name": string;
  county?: string;
  locality: string;
  region: string;
  "street-address": string;
  "street-address-two"?: string;
  "postal-code": string;
  zip4?: string;
  skip_address_check?: boolean;
  "phone-number": string;
};

export type ApiRequestPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: string;
  company?: string;
  industry?: string;
  employees: string;
  federalTaxId?: string;
  isExemptFromTax?: boolean;
  userName: string;
  "billing-address": ApiBillingAddress;
  "shipping-address": ApiBillingAddress;
};

export type SuccessResponse = {
  status_code: "OK";
  type: string;
  id: number;
};

export type UnableToRegisterResponse = {
  check_type: string;
  message: string;
  suggestions: unknown[];
};

export type ResponseAddress = {
  "country-name": string;
  county: string;
  locality: string;
  region: string;
  "street-address": string;
  "postal-code": string;
  zip4: string;
  skip_address_check?: boolean;
};

export type VerifyAddressResponse = {
  check_type: "ADDRESS" | "SAP";
  message: string;
  suggestions: {
    "billing-address": ResponseAddress[];
    "shipping-address": ResponseAddress[];
  };
};

export type SAPErrorResponse = {
  check_type: string;
  message: string;
};
