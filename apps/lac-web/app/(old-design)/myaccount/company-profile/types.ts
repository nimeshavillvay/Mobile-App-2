export type Address = {
  xcAddressId: string;
  countryName: string;
  county: string;
  locality: string;
  organization: string;
  phoneNumber: string;
  region: string;
  streetAddress: string;
  postalCode: string;
  zip4: string;
  shipTo: string;
  soldTo: string;
  default: boolean;
};

export type ShippingAddress = {
  xcAddressId: string;
  countryName: string;
  county: string;
  locality: string;
  organization: string;
  phoneNumber: string;
  region: string;
  streetAddress: string;
  postalCode: string;
  zip4: string;
  shipTo: string;
  default: boolean;
};

export type BillingAddress = {
  xcAddressId: string;
  countryName: string;
  county: string;
  locality: string;
  organization: string;
  phoneNumber: string;
  region: string;
  streetAddress: string;
  postalCode: string;
  zip4: string;
  soldTo: string;
};

export type ShippingAddressId = {
  shipTo: string;
};

export type AddressCheckSuggestions = {
  checkType: string;
  message: string;
  suggestions: Address[];
};

export type CompanyDetailsResponse = {
  company_name: string;
  image: string;
};

export type CompanyDetails = {
  companyName: string;
  image: string;
};
