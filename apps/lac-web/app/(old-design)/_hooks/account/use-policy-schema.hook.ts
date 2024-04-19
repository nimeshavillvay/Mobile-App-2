import type { PasswordPolicies } from "@/_lib/types";
import * as z from "zod";

const usePolicySchema = ({
  schema,
  passwordPolicies,
  allowEmptyPassword = false,
}: {
  schema: z.AnyZodObject;
  passwordPolicies: PasswordPolicies;
  allowEmptyPassword: boolean;
}) => {
  return schema
    .extend({
      password: z
        .string()
        .min(
          passwordPolicies.minimumLength,
          `Password must contain at least ${passwordPolicies.minimumLength} characters.`,
        )
        .or(z.literal("")),
    })
    .superRefine(({ password, confirmPassword }, context) => {
      if (allowEmptyPassword && password === "") {
        return true; // Allow empty passwords
      }

      const containsAlphabet = (ch: string) => /[a-z,A-Z]/.test(ch);
      const containsNumber = (ch: string) => /[0-9]/.test(ch);

      let countOfAlphabets = 0;
      let countOfNumbers = 0;

      if (password) {
        for (const ch of password) {
          if (containsAlphabet(ch)) {
            countOfAlphabets++;
          } else if (containsNumber(ch)) {
            countOfNumbers++;
          }
        }
      }

      // TODO Add better messaging
      if (
        countOfAlphabets < passwordPolicies.minimumAlphabets ||
        countOfNumbers < passwordPolicies.minimumNumbers
      ) {
        context.addIssue({
          path: ["password"],
          code: "custom",
          message: "Password does not meet complexity requirements",
        });
      }

      if (confirmPassword !== password) {
        context.addIssue({
          path: ["confirmPassword"],
          code: "custom",
          message: "The passwords did not match",
        });
      }
    });
};

export default usePolicySchema;
