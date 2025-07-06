type Options = {
  keyName?: string;
  index?: boolean;
};
const DEFAULT_OPTIONS: Options = {
  keyName: "id",
  index: false,
};

export function findByKey<T extends object>(
  items: Array<T>,
  key: unknown,
  options: Omit<Options, "index"> & { index: true },
): number;

export function findByKey<T extends object>(
  items: Array<T>,
  key: unknown,
  options?: Omit<Options, "index"> & { index?: false },
): T | undefined;

export function findByKey<T extends object>(items: Array<T>, key: unknown, options?: Options) {
  const { keyName = "id", index = false } = { ...DEFAULT_OPTIONS, ...options };

  return items[index ? "findIndex" : "find"]((item) => getValueByPath(item, keyName) === key);
}

export const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => start + index);
};
