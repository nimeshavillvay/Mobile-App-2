import { z } from "zod";

export const addItemSchema = z.object({
  quantity: z.number().int().gt(0),
});
export type AddItemSchema = z.infer<typeof addItemSchema>;
