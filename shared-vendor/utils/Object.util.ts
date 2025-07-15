import type { KeysToCamelCase } from "@shared-vendor/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepClone = <T extends object>(object: T): T => JSON.parse(JSON.stringify(object));

export const navigateObject = (object: Record<string, any>, path: string): [any, string] => {
  let refHolder: any;
  let key = "";

  const sanitizedPath = path.trim().split(".");

  sanitizedPath.reduce((reference, pathKey) => {
    refHolder = reference;
    key = pathKey;

    return reference?.[pathKey];
  }, object);

  return [refHolder, key];
};

export const getValueByPath = <T extends object>(object: T, path: string) => {
  const [reference, key] = navigateObject(object, path);

  return reference[key];
};

export const toCamelCaseKeys = <T extends object>(object: T) =>
  Object.entries(object).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [toCamelCase(key)]: value,
    }),
    {} as KeysToCamelCase<T>,
  );
