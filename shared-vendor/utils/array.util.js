export const findByKey = (items = [], key, { keyName = "id", index = false } = {}) =>
  items[index ? "findIndex" : "find"]((item) => getValueByPath(item, keyName) === key);

export const range = (start, end) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => start + index);
};
