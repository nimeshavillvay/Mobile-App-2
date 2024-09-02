import { z } from "zod";

export const paginationSchema = z.tuple([
  z.object({
    db_count: z.number(),
    offset: z.number(),
    perPage: z.number(),
  }),
]);

export const statusSchema = z.enum(["ACTIVE", "SUSPENDED"]);
export type Status = z.infer<typeof statusSchema>;

export const permissionSchema = z.enum(["ADMIN", "BUYER"]);
export type Permission = z.infer<typeof permissionSchema>;
