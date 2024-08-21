const API_URL = process.env.EXPO_PUBLIC_WURTH_LAC_API ?? "";

// Define a base URL when running Jest because the environment variables are
// not loaded, which results in "ky" throwing an error because it can't form
// a valid URL.
export const API_BASE_URL =
  process.env.NODE_ENV === "test" ? "https://test.wurthlac.com" : API_URL;
export const API_KEY = process.env.EXPO_PUBLIC_WURTH_LAC_API_KEY ?? "";

const SEARCH_URL = process.env.EXPO_PUBLIC_WURTH_LAC_SEARCH_API ?? "";
export const SEARCH_API_BASE_URL =
  process.env.NODE_ENV === "test" ? "https://test.wurthlac.com" : SEARCH_URL;

export const SESSION_TOKEN_COOKIE = "xid_00924";

export const DEFAULT_PLANT = "L010";

export const UI_DATE_FORMAT = "ddd, MMM. DD YYYY";

export const DELIVERY_METHODS = {
  SHIP_TO_ME: "ship-to-me",
  STORE_PICK_UP: "store-pick-up",
} as const;

export const DEFAULT_SHIPPING_METHOD = "G";
export const WILLCALL_SHIPPING_METHOD = "W";

// Availability statuses
export const IN_STOCK = "inStock" as const;
export const LIMITED_STOCK = "limitedStock" as const;
export const NOT_IN_STOCK = "notInStock" as const;
export const NOT_AVAILABLE = "notAvailable" as const;

// Cart config values
export const EMPTY_STRING = "" as const;
export const TRUE_STRING = "T" as const;
export const FALSE_STRING = "F" as const;

// Available shipping options
export const AVAILABLE_ALL = "availableAll" as const;
export const TAKE_ON_HAND = "takeOnHand" as const;
export const BACK_ORDER_ALL = "backOrderAll" as const;
export const ALTERNATIVE_BRANCHES = "shipAlternativeBranch" as const;

export const BACKORDER_ENABLED = "T";
export const BACKORDER_DISABLED = "F";
