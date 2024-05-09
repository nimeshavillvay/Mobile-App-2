import type { Address } from "@/_lib/types";

export type AddressWithUuid = Address & {
  uuid: string;
};

export type AddressFormData = {
  company?: string;
  addressLineOne?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phoneNumber?: string;
  zip4?: string;
  country?: string;
  county?: string;
  xcAddressId?: string;
  shipTo?: string;
  default?: boolean;
  skipAddressCheck?: boolean;
};

export type AddressCheckSuggestions = {
  checkType: string;
  message: string;
  suggestions: Address[];
};

export type AddressCheckSuggestionsWithUuid = {
  checkType: string;
  message: string;
  suggestions: AddressWithUuid[];
};

export type CompanyDetails = {
  companyName: string;
  image: string;
};
