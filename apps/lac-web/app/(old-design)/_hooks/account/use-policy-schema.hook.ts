import type { PasswordPolicies } from "@/(auth)/types";
import * as z from "zod";

const usePolicySchema = ({
  passwordPolicies,
  allowEmptyPassword = false,
}: {
  passwordPolicies: PasswordPolicies;
  allowEmptyPassword: boolean;
}) => {
  return z
    .object({
      firstName: z.string().trim().min(1, "Please enter first name.").max(40),
      lastName: z.string().trim().min(1, "Please enter last name.").max(40),
      jobTitle: z.string().min(1, "Please enter job title."),
      email: z
        .string()
        .trim()
        .min(1, "Please enter email address.")
        .email("Please enter a valid email address."),
      permission: z.string().min(1, "Please enter permission type."),
      status: z.string(),
      password: z.string(),
      confirmPassword: z.string().or(z.literal("")),
    })
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

      for (const ch of password) {
        if (containsAlphabet(ch)) {
          countOfAlphabets++;
        } else if (containsNumber(ch)) {
          countOfNumbers++;
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
