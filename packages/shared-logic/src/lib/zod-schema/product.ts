import { z } from "zod";

export const checkAvailabilitySchema = z.object({
  productid: z.number(),
  status: z.enum(["inStock", "limitedStock", "notInStock", "notAvailable"]),
  options: z.array(
    z.object({
      backOrder: z.boolean(),
      plants: z.array(
        z.object({
          index: z.number(),
          isSameDayAvail: z.boolean(),
          plant: z.string(),
          quantity: z.number().optional(),
          backOrderQuantity: z.number().optional(),
          backOrderDate: z.string().optional(),
          shippingMethods: z.array(
            z.object({
              code: z.string(),
              name: z.string(),
            }),
          ),
        }),
      ),
      type: z.enum(["shipAlternativeBranch", "backOrderAll"]),
      hash: z.string(),
    }),
  ),
  willcallanywhere: z.array(
    z.object({
      hash: z.string(),
      status: z.string(),
      willCallBackOrder: z.string(),
      willCallPlant: z.string(),
      willCallQuantity: z.number(),
      backOrder: z.boolean().optional(),
      backOrderDate_1: z.string().optional(),
      backOrderQuantity_1: z.number().optional(),
      index: z.number().optional(),
      plant_1: z.string().optional(),
      quantity_1: z.number().optional(),
      shippingMethods_1: z.array(z.string()).optional(),
      type: z.string().optional(),
    }),
  ),
  xplant: z.string(),
  available_locations: z.array(
    z.object({
      location: z.string(),
      name: z.string(),
      amount: z.number(),
    }),
  ),
});
export type CheckAvailability = z.infer<typeof checkAvailabilitySchema>;
