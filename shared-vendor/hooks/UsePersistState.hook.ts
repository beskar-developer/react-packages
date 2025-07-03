import { localStorage } from "@shared-vendor/services";

const toValue = (value: unknown) => {
  if (typeof value === "function") return value();

  return value;
};

export const usePersistState = <T>(
  initialState: T | (() => T),
  key: string,
  storage = localStorage,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = storage.getItem(key);

    return storedValue || toValue(initialState);
  });

  useEffect(() => {
    storage.setItem(key, value);
  }, [value]);

  return [value, setValue];
};
