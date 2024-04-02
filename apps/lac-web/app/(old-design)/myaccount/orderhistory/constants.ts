export const DATE_FORMAT = "MM/DD/YYYY" as const;

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
};
