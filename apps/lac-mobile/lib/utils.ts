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
