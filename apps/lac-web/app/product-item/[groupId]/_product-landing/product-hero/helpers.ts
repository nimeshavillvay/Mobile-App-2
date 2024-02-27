import { z } from "zod";
import { AVAILABLE_AVAILABILITY, BACK_ORDERED_AVAILABILITY } from "./constants";

export const addItemSchema = z.object({
  quantity: z.number().int().gt(0),
});
export type AddItemSchema = z.infer<typeof addItemSchema>;

/**
 * Get the label of the status in the availability checl
 */
export const getStatusLabel = (status: string) => {
  if (status === "inStock") {
    return "In Stock";
  } else if (status === "notInStock") {
    return "Not In Stock";
  }

  return "";
};

export const getShippingMethods = (values: string) => {
  const methods = values.split(", ");
  const shippingMethods: { value: string; label: string }[] = [];

  methods.forEach((method) => {
    if (method === "W") {
      shippingMethods.push({
        value: method,
        label: "Will Call Brea, CA",
      });
    } else if (method === "X") {
      shippingMethods.push({
        value: method,
        label: "Will Call X-Fer Anaheim, CA",
      });
    } else if (method === "T") {
      shippingMethods.push({
        value: method,
        label: "Truck",
      });
    } else if (method === "G") {
      shippingMethods.push({
        value: method,
        label: "Ground",
      });
    } else if (method === "0") {
      shippingMethods.push({
        value: method,
        label: "Same Day Shipping (if ordered before 12:00 noon)",
      });
    }
  });

  return shippingMethods;
};

export const getAvailabilityTypeLabel = (value: string) => {
  if (value === AVAILABLE_AVAILABILITY) {
    return "Available";
  } else if (value === BACK_ORDERED_AVAILABILITY) {
    return "Backordered";
  }

  return "";
};
