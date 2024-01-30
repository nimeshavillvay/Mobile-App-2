export const PAGE_SIZES = ["20", "40"] as const;
export const SORTING_TYPES = [
  {
    value: "1",
    label: "A to Z",
  },
  {
    value: "0",
    label: "Z to A",
  },
] as const;
export const QUERY_KEYS = {
  PAGE: "page",
  PAGE_SIZE: "page-size",
  SORT: "sort",
} as const;
