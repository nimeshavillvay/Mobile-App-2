import dayjs from "dayjs";

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
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
] as const;

export const SORTING_BY_FIELDS = {
  SKU: "sku",
  ORDER_DATE: "orderDate",
  TOTAL_ITEMS: "totalItem",
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

export const SORTING_FILTERS_FOR_MOBILE = [
  {
    title: "Item # / MFR Part #",
    options: [
      {
        title: "Item# / MFR Part# Ascending",
        type: `${SORTING_BY_FIELDS.SKU}-asc`,
      },
      {
        title: "Item# / MFR Part# Descending",
        type: `${SORTING_BY_FIELDS.SKU}-desc`,
      },
    ],
  },
  {
    title: "Order Date",
    options: [
      {
        title: "Order Date Ascending",
        type: `${SORTING_BY_FIELDS.ORDER_DATE}-asc`,
      },
      {
        title: "Order Date Descending",
        type: `${SORTING_BY_FIELDS.ORDER_DATE}-desc`,
      },
    ],
  },
  {
    title: "Order Count",
    options: [
      {
        title: "Order Count Ascending",
        type: `${SORTING_BY_FIELDS.TOTAL_ITEMS}-asc`,
      },
      {
        title: "Order Count Descending",
        type: `${SORTING_BY_FIELDS.TOTAL_ITEMS}-desc`,
      },
    ],
  },
] as const;

export const INIT_SORTING_TYPE = "desc";
export const INIT_PAGE_NUMBER = "1";
export const INIT_PER_PAGE = "1";
export const INIT_FROM_DATE = dayjs().subtract(1, "year").format("YYYY-MM-DD");
export const INIT_TO_DATE = dayjs().format("YYYY-MM-DD");
export const INIT_SORTING_FIELD = SORTING_BY_FIELDS.ORDER_DATE;
export const INIT_DURATION = DURATIONS.at(-2); // Initial duration before last item in the `DURATIONS` array
export const CUSTOM_DURATION = DURATIONS.at(-1); // Custom duration: last item in the `DURATIONS` array
