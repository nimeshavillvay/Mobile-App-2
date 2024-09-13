import type { PasswordPolicies } from "@/(auth)/register/_components/types";
import type { RefinementCtx } from "zod";

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
    return true;
  }

  const countChars = (regex: RegExp) => (password.match(regex) || []).length;

  const alphabetCount = countChars(/[a-zA-Z]/g);
  const numberCount = countChars(/[0-9]/g);

  const addPasswordIssue = (message: string) => {
    context.addIssue({
      path: ["password"],
      code: "custom",
      message,
    });
  };

  if (password.length < passwordPolicies.minimumLength) {
    addPasswordIssue(
      `Password must contain at least ${passwordPolicies.minimumLength} characters.`,
    );
  }

  if (
    alphabetCount < passwordPolicies.minimumAlphabets ||
    numberCount < passwordPolicies.minimumNumbers
  ) {
    addPasswordIssue("Password does not meet complexity requirements");
  }
};
