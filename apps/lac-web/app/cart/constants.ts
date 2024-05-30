// Available shipping options
export const AVAILABLE_ALL = "availableAll" as const;
export const TAKE_ON_HAND = "takeOnHand" as const;
export const BACK_ORDER_ALL = "backOrderAll" as const;
export const ALTERNATIVE_BRANCHES = "shipAlternativeBranch" as const;

// Main shipping options UI
export const MAIN_OPTIONS = {
  SHIP_TO_ME: "ship-to-me",
  WILL_CALL: "will-call",
  BACK_ORDER: "back-order",
} as const;

// Availability statuses
export const IN_STOCK = "inStock" as const;
export const LIMITED_STOCK = "limitedStock" as const;
export const NOT_IN_STOCK = "notInStock" as const;

// Cart config values
export const EMPTY_STRING = "" as const;
export const TRUE_STRING = "T" as const;
export const FALSE_STRING = "F" as const;

export const DEFAULT_PLANT = "L010";
