export const isString = (value: unknown): value is string =>
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

export const toCamelCase = (string: string) =>
  string.toLowerCase().replace(/[_-](\w)/g, (_, letter) => letter.toUpperCase());
