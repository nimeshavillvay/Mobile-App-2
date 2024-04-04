import dayjs from "dayjs";

export const UI_DATE_FORMAT = "MM/DD/YYYY" as const;
export const URL_DATE_FORMAT = "YYYY-MM-DD" as const;

export const DURATIONS = [
  { value: "30", label: "30 days" },
  { value: "60", label: "60 days" },
  { value: "90", label: "90 days" },
  { value: "0", label: "Custom" },
] as const;

export const ORDER_STATUS = {
  C: "Cancelled",
  I: "In progress",
  R: "Returned",
  S: "Shipped",
  K: "Credited",
  F: "Fully processed",
} as const;

export const STATUS_COLOR_CLASSES = {
  C: "text-brand-primary",
  I: "text-brand-secondary",
  R: "text-brand-gray-500",
  S: "text-brand-tertiary",
  K: "text-brand-gray-500",
  F: "text-brand-success",
  default: "text-brand-gray-500",
} as const;

export const ORDER_TYPES = {
  A: "Inquiry",
  B: "Quotation",
  C: "Order",
  D: "Item proposal",
  E: "Scheduling agreement",
  F: "Scheduling agreement with external service agent",
  G: "Contract",
  H: "Returns",
  I: "Order w/o charge",
  J: "Delivery",
  K: "Credit memo request",
  L: "Debit memo request",
  M: "Invoice",
  N: "Invoice cancellation",
  O: "Credit memo",
  P: "Debit memo",
  Q: "WMS transfer order",
  R: "Goods movement",
  S: "Credit memo cancellation",
  T: "Returns delivery for order",
  U: "Pro forma invoice",
  V: "Purchase Order",
  W: "Independent reqts plan",
  X: "Handling unit",
} as const;

export const QUERY_KEYS = {
  FROM_DATE: "from",
  TO_DATE: "to",
  PAGE: "page",
  PER_PAGE: "perPage",
  ORDER_BY: "orderBy",
  ORDER_TYPE: "orderType",
} as const;

export const PAGE_SIZES = ["10", "20", "30", "40"] as const;
export const INIT_PAGE_NUMBER = "1" as const;
export const INIT_PAGE_SIZE = "10" as const;
export const INIT_FROM_DATE = dayjs()
  .subtract(1, "year")
  .format(URL_DATE_FORMAT);
export const INIT_TO_DATE = dayjs().format(URL_DATE_FORMAT);
export const INIT_DURATION = DURATIONS.at(0); // Initial duration is 30 days
export const CUSTOM_DURATION = DURATIONS.at(-1); // Custom duration is the last item in the list
