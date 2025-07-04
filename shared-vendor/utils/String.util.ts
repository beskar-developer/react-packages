export const isString = (value: unknown) =>
  typeof value === "string" ||
  value instanceof String ||
  Object.prototype.toString.call(value) === "[object String]";

export const convertNumberToLocaleString = <T>(number: T) => Number(number || 0).toLocaleString();

export const toKebabCase = (string: string) => {
  if (!string) return string;

  return string
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
};
