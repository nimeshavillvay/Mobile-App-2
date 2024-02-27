import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally merge Tailwind CSS classes without conflicts
 */
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const getMediaUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_WURTH_LAC_OLD_API}/pim${path}`;
};

export const formatNumberToPrice = (value: number) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const splitArrayIntoChunks = <T>(array: T[], chunkSize: number) => {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
};
