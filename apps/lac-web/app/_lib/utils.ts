import type { Filter } from "@/_lib/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally merge Tailwind CSS classes without conflicts
 */
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const filterAndMapValues = (filters: Filter[], title: string) => {
  const filter = filters.find((filter) => filter.title === title);
  return filter ? filter.values : [];
};
