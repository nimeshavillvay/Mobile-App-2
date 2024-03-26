export const DURATIONS = [
  { value: "3", label: "3 months" },
  { value: "6", label: "6 months" },
  { value: "9", label: "9 months" },
  { value: "12", label: "12 months" },
  { value: "0", label: "Custom" },
] as const;

export const DATE_FORMAT = "MM/DD/YYYY" as const;

export const PAGE_SIZES = ["10", "20", "40"] as const;

export const SORTING_TYPES = [
  { label: "Sort...", value: "default" },
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
] as const;

export const ORDER_BY_FIELDS = {
  SKU: "sku",
  ORDER_DATE: "orderDate",
  TOTAL_ITEM: "totalItem",
} as const;

export const QUERY_KEYS = {
  FROM_DATE: "from",
  TO_DATE: "to",
  PAGE: "page",
  PER_PAGE: "perPage",
  ORDER_BY: "orderBy",
  ORDER_TYPE: "orderType",
} as const;

export const DEFAULT_SORT = "Sort...";
