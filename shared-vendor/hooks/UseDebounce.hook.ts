type OnChange<T> = (value: T) => void;

export const useDebounce = <T>(value: T, duration = 500, onChange?: OnChange<T>) => {
  const [debounceValue, setDebounceValue] = useState<T>(() => value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value === debounceValue) return;

      onChange?.(value);

      setDebounceValue(value);
    }, duration);

    return () => clearTimeout(timer);
  }, [value]);

  return debounceValue;
};
