export const useDebounce = <T>(value: T, duration = 500) => {
  const [debounceValue, setDebounceValue] = useState<T>(() => value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), duration);

    return () => clearTimeout(timer);
  }, [value]);

  return debounceValue;
};
