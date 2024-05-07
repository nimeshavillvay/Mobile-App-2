import { z } from "zod";

export const addToCartSchema = z.object({
  quantity: z.number().int().positive(),
});
export type AddToCartSchema = z.infer<typeof addToCartSchema>;
