export type Address = {
  xcAddressId?: string;
  countryName: string;
  county: string | null;
  locality: string;
  organization?: string;
  phoneNumber?: string;
  region: string;
  streetAddress: string;
  postalCode: string;
  zip4: string;
  shipTo?: string;
  soldTo?: string;
  default?: boolean;
};

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
