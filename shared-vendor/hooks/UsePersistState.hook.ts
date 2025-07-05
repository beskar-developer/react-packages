import { localStorage } from "@shared-vendor/services";

type Value<T> = T | (() => T);

const isFunction = <T>(value: Value<T>): value is () => T => typeof value === "function";

const toValue = <T>(value: Value<T>) => {
  if (isFunction(value)) return value();

  return value;
};

export const usePersistState = <T>(
  initialState: Value<T>,
  key: string,
  { storage = localStorage, ttl = 0 } = {},
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = storage.getItem(key);

    return storedValue || toValue(initialState);
  });

  useEffect(() => {
    storage.setItem(key, value, {
      ttl,
    });
  }, [value]);

  return [value, setValue];
};
