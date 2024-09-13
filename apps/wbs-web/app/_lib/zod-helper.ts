import { z } from "zod";

export const ZIP_CODE_VALIDATION = z
  .string()
  .length(5, "Zip code must be exactly 5 digits")
  .regex(/^\d{5}$/, "Zip code must be numeric");

// Strings have to be allowed into the quantity to allow the user,
// to type in the input field.
// https://github.com/colinhacks/zod/discussions/330#discussioncomment-5833082
export const NUMBER_TYPE = z
  .union([z.string(), z.number()])
  .transform((x) => Number(x))
  .pipe(z.number());

export const PHONE_NUMBER_VALIDATION = z
  .string()
  .trim()
  .refine(
    (value) => {
      const numericCharacters = value.replace(/[()\s-]/g, "");
      const isValidLength = numericCharacters.length === 10;
      const isValidFormat = /[\d\-()\s]+$/.test(value);

      return isValidLength && isValidFormat;
    },
    {
      message: "Please enter a valid phone number",
    },
  );
