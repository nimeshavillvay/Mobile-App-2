import { PasswordPolicy } from "@/(old-design)/_lib/types";
import * as z from "zod";

const usePolicySchema = (passwordPolicies: PasswordPolicy[]) => {
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
      password: z.string().or(z.literal("")),
      confirmPassword: z.string().or(z.literal("")),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    })
    .refine(
      (data) => {
        if (data.password === "") return true; // Allow empty passwords

        for (const policy of passwordPolicies) {
          switch (policy.code) {
            case "MIN_CHAR_LEN":
              if (data.password.length < Number(policy.value)) return false;
              break;
            case "MIN_NUMBER":
              if (
                !new RegExp(`\\d{${Number(policy.value)}}`).test(data.password)
              )
                return false;
              break;
            case "MIN_CHAR_Cha_LEN":
              if (
                !new RegExp(`[a-zA-Z]{${Number(policy.value)}}`).test(
                  data.password,
                )
              )
                return false;
              break;
            default:
              break;
          }
        }
        return true;
      },
      {
        message: "Password does not meet complexity requirements.",
        path: ["password"],
      },
    );
};

export default usePolicySchema;
