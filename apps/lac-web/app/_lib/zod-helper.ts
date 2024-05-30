import { z } from "zod";

// Strings have to be allowed into the quantity to allow the user,
// to type in the input field.
// https://github.com/colinhacks/zod/discussions/330#discussioncomment-5833082
export const NUMBER_TYPE = z
  .union([z.string(), z.number()])
  .transform((x) => Number(x))
  .pipe(z.number());