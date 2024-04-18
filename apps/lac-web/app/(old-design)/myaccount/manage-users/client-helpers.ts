import type { Status } from "./types";

export const getStatusClass = (status: Status) => {
  switch (status) {
    case "ACTIVE":
      return "border-brand-tertiary text-brand-tertiary";

    case "SUSPENDED":
      return "border-brand-gray-400 text-brand-gray-200";

    default:
      return "border-brand-gray-400 text-brand-gray-400";
  }
};
