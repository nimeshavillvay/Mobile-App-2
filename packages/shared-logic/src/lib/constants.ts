export const DEFAULT_REVALIDATE = 60;

export const SPECIAL_SHIPPING_FLAG = [
  "LONG",
  "NOCO",
  "NOUF",
  "NOUP",
  "YLTL",
] as const;

export const DELIVERY_METHODS = {
  SHIP_TO_ME: "ship-to-me",
  STORE_PICK_UP: "store-pick-up",
} as const;

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
