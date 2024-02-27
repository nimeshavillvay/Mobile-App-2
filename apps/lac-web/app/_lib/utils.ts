import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally merge Tailwind CSS classes without conflicts
 */
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};
