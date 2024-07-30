const API_URL = process.env.EXPO_PUBLIC_WURTH_LAC_API ?? "";

// Define a base URL when running Jest because the environment variables are
// not loaded, which results in "ky" throwing an error because it can't form
// a valid URL.
export const API_BASE_URL =
  process.env.NODE_ENV === "test" ? "https://test.wurthlac.com" : API_URL;
export const API_KEY = process.env.EXPO_PUBLIC_WURTH_LAC_API_KEY ?? "";

const SEARCH_URL = process.env.EXPO_PUBLIC_WURTH_LAC_API ?? "";
export const SEARCH_API_BASE_URL =
  process.env.NODE_ENV === "test" ? "https://test.wurthlac.com" : SEARCH_URL;

export const SESSION_TOKEN_COOKIE = "xid_00924";
