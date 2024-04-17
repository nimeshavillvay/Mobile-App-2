export const USER_STATUSES = [
  { label: "Active", value: "ACTIVE" },
  { label: "Deactive", value: "DEACTIVE" },
  { label: "Pending", value: "PENDING" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Disabled", value: "DISABLED" },
  { label: "Suspended", value: "SUSPENDED" },
] as const;

export const USER_PERMISSIONS = [
  { label: "Admin", value: "ADMIN" },
  { label: "Buyer", value: "BUYER" },
] as const;
