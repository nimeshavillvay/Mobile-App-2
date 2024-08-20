export const API_BASE_URL = process.env.NEXT_PUBLIC_WURTH_LAC_API ?? "";
export const API_KEY = process.env.NEXT_PUBLIC_WURTH_LAC_API_KEY ?? "";

export const BASE_URL = "https://wurthlac.com";
export const SESSION_TOKEN_COOKIE = "xid_00924";
export const TOKEN_EXPIRE_COOKIE = "xid_00924_expire";
export const TOKEN_MAX_AGE = 172800; // 2 days

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
