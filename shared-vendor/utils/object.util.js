export const deepClone = (object) => JSON.parse(JSON.stringify(object));

export const navigateObject = (object, path) => {
  let refHolder = "";
  let key = "";

  const sanitizedPath = path.trim().split(".");

  sanitizedPath.reduce((reference, pathKey) => {
    refHolder = reference;
    key = pathKey;

    return reference?.[pathKey];
  }, object);

  return [refHolder, key];
};

export const getValueByPath = (object, path) => {
  const [reference, key] = navigateObject(object, path);

  return reference[key];
};
