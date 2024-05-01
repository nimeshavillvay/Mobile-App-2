import { AddressCheckSuggestions } from "./types";

export const UPS_ADDRESS_CHECK_RESPONSE: AddressCheckSuggestions = {
  checkType: "ADDRESS",
  message:
    "Multiple options for your billing address found. Please select the correct one!",
  suggestions: [
    {
      countryName: "US",
      county: null,
      locality: "Vernon Hills",
      region: "IL",
      streetAddress: "1255 ranchview",
      postalCode: "60089",
      zip4: "",
    },
    {
      countryName: "US",
      county: null,
      locality: "BUFFALO GROVE",
      region: "IL",
      streetAddress: "1255 RANCHVIEW CT",
      postalCode: "60089",
      zip4: "1189",
    },
  ],
};

export const SAP_ADDRESS_CHECK_RESPONSE: AddressCheckSuggestions = {
  checkType: "SAP",
  message:
    "Multiple options for your billing address found. Please select the correct one!",
  suggestions: [
    {
      countryName: "US",
      county: "COOK",
      locality: "BUFFALO GROVE",
      region: "IL",
      streetAddress: "1255 RANCHVIEW CT",
      postalCode: "60089",
      zip4: "1189",
    },
    {
      countryName: "US",
      county: "LAKE",
      locality: "BUFFALO GROVE",
      region: "IL",
      streetAddress: "1255 RANCHVIEW CT",
      postalCode: "60089",
      zip4: "1189",
    },
  ],
};

// export const EMPTY_SUGGESTIONS_RESPONSE: AddressCheckSuggestions = {
//   checkType: "SAP",
//   message:
//     "No valid tax jurisdiction found. Please correct your shipping address!",
//   suggestions: [],
// };
