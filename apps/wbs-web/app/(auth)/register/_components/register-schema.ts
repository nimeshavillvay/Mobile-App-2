import { PHONE_NUMBER_VALIDATION } from "@/_lib/zod-helper";
import { z } from "zod";

// Step 1: Account Details
const accountDetailsSchema = z.object({
  hasPlacedOrder: z.boolean(),
  soldToAccount: z.string(),
  invoiceNo: z.string(),
});

// Step 2: Personal Information
const personalInfoSchema = z.object({
  firstName: z.string().min(1).max(200),
  lastName: z.string().min(1).max(200),
  email: z.string().email(),
  phoneNumber: z.string(),
});

const userCredentialsSchema = z.object({
  userName: z
    .string()
    .min(1, "User ID is required")
    .regex(
      /^[a-zA-Z0-9@.]+$/,
      "User ID can only contain letters, numbers,  '.' and '@' ",
    ),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

// Combined schema for the entire form
const currentUserSchema = z
  .object({
    ...accountDetailsSchema.shape,
    ...personalInfoSchema.shape,
    ...userCredentialsSchema.shape,
  })
  .extend({
    phoneNumber: PHONE_NUMBER_VALIDATION,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type CurrentUserFormData = z.infer<typeof currentUserSchema>;

export {
  accountDetailsSchema,
  currentUserSchema,
  personalInfoSchema,
  userCredentialsSchema,
  type CurrentUserFormData,
};
