export const BASE_URL = "https://wurthlac.com";
export const SESSION_TOKEN_COOKIE = "xid_00924";
export const TOKEN_EXPIRE_COOKIE = "xid_00924_expire";
export const TOKEN_MAX_AGE =
  process.env.VERCEL_ENV === "production" ? 172800 : 7200;

export const PRIVATE_ROUTES = [
  "/osr",
  "/checkout",
  "/confirmation",
  "/myaccount",
];

export const DEFAULT_REVALIDATE = 60; // 1 minute

export const SPECIAL_SHIPPING_FLAG = [
  "LONG",
  "NOCO",
  "NOUF",
  "NOUP",
  "YLTL",
] as const;

export const DEFAULT_PLANT = {
  code: "L010",
  name: "Brea, CA",
};

// Availability statuses
export const IN_STOCK = "inStock" as const;
export const LIMITED_STOCK = "limitedStock" as const;
export const NOT_IN_STOCK = "notInStock" as const;
export const NOT_AVAILABLE = "notAvailable" as const;

export const MAX_QUANTITY = 100000 as const;

export const UI_DATE_FORMAT = "ddd, MMM. DD YYYY" as const;

export const INIT_PAGE_NUMBER = "1";

export const INIT_PER_PAGE = "20";

export const QUERY_KEYS = {
  PAGE: "page",
  PER_PAGE: "perPage",
  SORT: "sort",
  SORT_DIRECTION: "sortDirection",
  SEARCH_TEXT: "searchText",
  SELF_ONLY: "selfOnly",
} as const;

export const GTM_PAGE_TYPES = {
  CATEGORY: "category",
  SEARCH: "search",
  PRODUCT: "product",
  HOME: "homepage",
  CONTENT: "content",
  LOGIN: "login_page",
} as const;

export const GTM_PAGE_TYPE_OTHER = "other" as const;
