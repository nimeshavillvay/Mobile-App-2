export const BASE_URL = "https://wurthlac.com";
export const SESSION_TOKEN_COOKIE = "xid_00924";

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
