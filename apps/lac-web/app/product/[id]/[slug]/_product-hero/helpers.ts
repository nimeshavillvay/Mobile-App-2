import { z } from "zod";

export const addToCartSchema = z.object({
  // Strings have to be allowed into the quantity to allow the user,
  // to type in the input field.
  // https://github.com/colinhacks/zod/discussions/330#discussioncomment-5833082
  quantity: z
    .union([z.string(), z.number()])
    .transform((x) => Number(x))
    .pipe(z.number()),
});
export type AddToCartSchema = z.infer<typeof addToCartSchema>;
