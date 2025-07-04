import * as z from "zod/v4";

export const storageOptionsSchema = z
  .object({
    ttl: z.number().nonnegative().optional(),
    secure: z.boolean().optional(),
  })
  .default({});
