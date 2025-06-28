import { boolean, number, object, string } from "yup";

const keySchema = string().required();

const optionsSchema = object({
  secure: boolean().default(false),
  ttl: number().default(0),
});

export { keySchema, optionsSchema };
