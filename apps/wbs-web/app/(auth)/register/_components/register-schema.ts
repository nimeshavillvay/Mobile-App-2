/* eslint-disable @typescript-eslint/no-explicit-any */
import { PHONE_NUMBER_VALIDATION } from "@/_lib/zod-helper";
import { z } from "zod";

// Constants
const REGISTRATION_TYPES = ["Homeowner", "Business", "unselected"] as const;
const ALLOWED_FILE_EXTENSIONS = [
  "pdf",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "doc",
  "docx",
  "odt",
];

const passwordCheck = (data: any) => data.password === data.confirmPassword;

const passwordMessage = {
  message: "Passwords don't match",
  path: ["confirmPassword"],
};

// These are zod-helper level code
// utils/zod/schema.ts
// utils/zod/types.ts

/**
 * Prefixer<P, T>
 *
 * A utility type that creates a new type by prefixing all string keys of the original type T with the string P.
 *
 * @template P - A string literal type representing the prefix to be added to each key.
 * @template T - The original object type whose keys are to be prefixed.
 *
 * @remarks
 * This type uses TypeScript's mapped types and conditional types to create a new type
 * where all string keys of T are prefixed with P. Non-string keys (symbols or numbers) are omitted from the resulting type.
 *
 * @example
 * Basic usage:
 * ```typescript
 * type UserInfo = {
 *   name: string;
 *   age: number;
 * };
 *
 * type PrefixedUserInfo = Prefixer<"user_", UserInfo>;
 * // Resulting type:
 * // {
 * //   user_name: string;
 * //   user_age: number;
 * // }
 * ```
 *
 * @example
 * With non-string keys (which are omitted):
 * ```typescript
 * type MixedKeys = {
 *   name: string;
 *   42: number;
 *   [Symbol.iterator]: () => Iterator<string>;
 * };
 *
 * type PrefixedMixedKeys = Prefixer<"prefixed_", MixedKeys>;
 * // Resulting type:
 * // {
 * //   prefixed_name: string;
 * // }
 * // Note: The number key and symbol key are omitted.
 * ```
 */
type Prefixer<P extends string, T> = {
  [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
};

/**
 * Takes a Zod schema object and a prefix string, and return a new Zod schema object
 * where all the keys are prefixed with the given prefix.
 * @template T - The shape of the original schema.
 * @template P - The prefix string.
 * @param {z.ZodObject<T>} schema - The original Zod schema.
 * @param {P} prefix - The prefix string.
 * @returns {z.ZodObject<Prefixer<P, T>>} - The new Zod schema with prefixed keys.
 */
const createPrefixedSchema = <T extends z.ZodRawShape, P extends string>(
  schema: z.ZodObject<T>,
  prefix: P,
): z.ZodObject<Prefixer<P, T>> => {
  const entries = Object.entries(schema.shape) as [keyof T, z.ZodTypeAny][];
  const newShape = entries.reduce((acc, [key, value]) => {
    (acc as any)[`${prefix}${key.toString()}`] = value;

    return acc;
  }, {} as any);

  return z.object(newShape) as z.ZodObject<Prefixer<P, T>>;
};

/**
 * Adds a custom issue to the Zod refinement context.
 * @param {z.RefinementCtx} ctx - The Zod refinement context.
 * @param {(string | number)[]} path - The path to the issue in the object.
 * @param {string} message - The custom error message.
 */
const addCustomIssue = (
  ctx: z.RefinementCtx,
  path: (string | number)[],
  message: string,
) => {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    path,
    message,
  });
};

// Base schemas
const basePersonalInfoSchema = z.object({
  firstName: z.string().min(1).max(200),
  lastName: z.string().min(1).max(200),
  email: z.string().email(),
  phoneNumber: z.string(),
});

const baseAddressSchema = z.object({
  Address: z.string(),
  AddressTwo: z.string().optional(),
  City: z.string(),
  Country: z.string(),
  State: z.string(),
  County: z.string().optional(),
  PostCode: z.string(),
  ZipCode: z.string().optional(),
});

// Specific schemas
const accountDetailsSchema = z.object({
  hasPlacedOrder: z.boolean(),
  soldToAccount: z.string(),
  invoiceNo: z.string(),
});

const companyPersonalInfoSchema = basePersonalInfoSchema.extend({
  companyName: z.string(),
  type: z.enum(REGISTRATION_TYPES),
});

const userCredentialsSchema = z.object({
  userName: z
    .string()
    .min(1, "User ID is required")
    .regex(
      /^[a-zA-Z0-9@.]+$/,
      "User ID can only contain letters, numbers, '.' and '@'",
    ),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

const billingAddressSchema = createPrefixedSchema(
  baseAddressSchema.extend({
    Address: z.string().min(6, "Please enter a valid address"),
    City: z.string().min(1, "Please enter a valid City"),
    Country: z.string().min(2, "Please select a valid country"),
    State: z.string().min(2, "Please select a valid state"),
    PostCode: z.string().length(5, "Please enter a valid Zip/Postal code"),
  }),
  "billing",
);

const shippingAddressSchema = createPrefixedSchema(
  baseAddressSchema,
  "shipping",
);

const addressSchema = billingAddressSchema.merge(shippingAddressSchema).extend({
  same: z.boolean(),
});

const taxDocumentSchema = z.object({
  stateTaxExemptionNumber: z
    .string()
    .regex(/^\d{2}-\d{7}$/, "Invalid State Tax Exemption Number format"),
  document: z
    .string()
    .refine(
      (value) =>
        ALLOWED_FILE_EXTENSIONS.includes(
          value.split(".").pop()?.toLowerCase() ?? "",
        ),
      "Invalid file format. Acceptable formats are: PDF, JPEG, PNG, WEBP, DOC, DOCX, ODT.",
    ),
});

const taxInformationSchema = z.object({
  federalTaxId: z
    .string()
    .length(10, "Federal Tax ID must be 9 digits")
    .regex(/^\d{2}-\d{7}$/, "Invalid Federal Tax ID format"),
  industry: z.string().min(1, "Please select an industry"),
  employees: z.number().int().positive("Please enter at least 1 employee"),
  isExemptFromTax: z.boolean(),
  taxDocuments: z.array(taxDocumentSchema).optional(),
});

// Combined schemas
const newUserSchema = companyPersonalInfoSchema
  .merge(userCredentialsSchema)
  .merge(addressSchema)
  .merge(taxInformationSchema)
  .extend({
    phoneNumber: PHONE_NUMBER_VALIDATION,
  })
  .refine(passwordCheck, passwordMessage)
  .superRefine((values, ctx) => {
    // Validate shipping address when it's different from billing
    if (!values.same) {
      Object.entries(billingAddressSchema.shape).forEach(
        ([field, validator]) => {
          const shippingField =
            `shipping${field.replace("billing", "")}` as keyof typeof values;
          const value = values[shippingField];

          if (validator instanceof z.ZodString) {
            try {
              validator.parse(value);
            } catch (error) {
              if (error instanceof z.ZodError) {
                error.errors.forEach((err) => {
                  addCustomIssue(ctx, [shippingField], ` ${err.message}`);
                });
              }
            }
          }
        },
      );
    }

    // Validate tax exemption documents
    if (values.isExemptFromTax) {
      if (!values.taxDocuments || values.taxDocuments.length === 0) {
        addCustomIssue(
          ctx,
          ["taxDocuments"],
          "At least one tax exemption document is required when exempt from tax",
        );
      } else {
        values.taxDocuments.forEach((doc, index) => {
          if (!doc.document) {
            addCustomIssue(
              ctx,
              [`taxDocuments.${index}.document`],
              "Tax exemption document is required",
            );
          } else {
            const fileExtension =
              doc.document.split(".").pop()?.toLowerCase() || "";

            if (!ALLOWED_FILE_EXTENSIONS.includes(fileExtension)) {
              addCustomIssue(
                ctx,
                [`taxDocuments.${index}.document`],
                `Invalid file format. Acceptable formats are: ${ALLOWED_FILE_EXTENSIONS.join(",")}.`,
              );
            }
          }

          if (!doc.stateTaxExemptionNumber) {
            addCustomIssue(
              ctx,
              [`taxDocuments.${index}.stateTaxExemptionNumber`],
              "State Tax Exemption Number is required",
            );
          } else if (
            doc.stateTaxExemptionNumber.length !== 10 ||
            !/^\d{2}-\d{7}$/.test(doc.stateTaxExemptionNumber)
          ) {
            addCustomIssue(
              ctx,
              [`taxDocuments.${index}.stateTaxExemptionNumber`],
              "Invalid State Tax Exemption Number format",
            );
          }
        });
      }
    }
  });

const currentUserSchema = accountDetailsSchema
  .merge(basePersonalInfoSchema)
  .merge(userCredentialsSchema)
  .extend({
    phoneNumber: PHONE_NUMBER_VALIDATION,
  })
  .refine(passwordCheck, passwordMessage);

type NewUserFormData = z.infer<typeof newUserSchema>;
type CurrentUserFormData = z.infer<typeof currentUserSchema>;

export {
  accountDetailsSchema,
  currentUserSchema,
  newUserSchema,
  basePersonalInfoSchema as personalInfoSchema,
  userCredentialsSchema,
  type CurrentUserFormData,
  type NewUserFormData,
};
