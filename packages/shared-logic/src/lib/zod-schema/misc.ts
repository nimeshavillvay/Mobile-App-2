import { z } from "zod";

export const paginationSchema = z.tuple([
  z.object({
    db_count: z.number(),
    offset: z.number(),
    perPage: z.number(),
  }),
]);
