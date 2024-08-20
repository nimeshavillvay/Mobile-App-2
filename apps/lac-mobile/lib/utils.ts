import { z } from "zod";

/**
 * Format a number to price
 */
export const formatNumberToPrice = (value?: number) => {
  if (!value && value !== 0) {
    return "";
  }

  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const isNumber = (data: unknown): data is number => {
  return z.number().safeParse(data).success;
};

export const isString = (data: unknown): data is string => {
  return z.string().safeParse(data).success;
};
