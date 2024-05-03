import type { Filter, FilterTitle, PasswordPolicies } from "@/_lib/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RefinementCtx } from "zod";

/**
 * Conditionally merge Tailwind CSS classes without conflicts
 */
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const filterAndMapValues = (filters: Filter[], title: FilterTitle) => {
  const filter = filters.find((filter) => filter.title === title);
  return filter ? filter.values : [];
};

type ErrorResponse = {
  status_code: string;
  message: string;
};

export const isErrorResponse = (error: unknown): error is ErrorResponse => {
  if (
    typeof error === "object" &&
    typeof (error as ErrorResponse)?.status_code === "string" &&
    typeof (error as ErrorResponse)?.message === "string"
  ) {
    return true;
  }

  return false;
};

export const checkPasswordComplexity = ({
  password,
  passwordPolicies,
  context,
  allowEmptyPassword = false,
}: {
  password: string;
  passwordPolicies: PasswordPolicies;
  context: RefinementCtx;
  allowEmptyPassword?: boolean;
}) => {
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

  if (password.length < passwordPolicies.minimumLength) {
    context.addIssue({
      path: ["password"],
      code: "custom",
      message: `Password must contain at least ${passwordPolicies.minimumLength} characters.`,
    });
  }

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
};
