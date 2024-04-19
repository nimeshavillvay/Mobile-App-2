import type { Filter, FilterTitle } from "@/_lib/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally merge Tailwind CSS classes without conflicts
 */
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const filterAndMapValues = (filters: Filter[], title: FilterTitle) => {
  const filter = filters.find((filter) => filter.title === title);
  return filter ? filter.values : [];
};

type ErrorResponse = {
  status_code: string;
  message: string;
};

export const isErrorResponse = (error: unknown): error is ErrorResponse => {
  if (
    typeof error === "object" &&
    typeof (error as ErrorResponse)?.status_code === "string" &&
    typeof (error as ErrorResponse)?.message === "string"
  ) {
    return true;
  }

  return false;
};
