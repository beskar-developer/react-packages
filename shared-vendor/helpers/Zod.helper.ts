import * as z from "zod/v4";

type InferZodType<T> = z.infer<z.ZodType<T>>;

export const prettifyParse = <T>(schemas: z.ZodType<T>, value: InferZodType<T>) => {
  const result = schemas.safeParse(value);

  if (result.success) return result.data;

  const pretty = z.prettifyError(result.error);

  throw new Error(pretty);
};
