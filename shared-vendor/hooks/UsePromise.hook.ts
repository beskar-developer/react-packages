const DEFAULT_OPTIONS = {
  throwOnError: false,
  defaultData: null,
  immediate: false,
  ttl: 0,
};

const hasData = (value: unknown) => {
  if (value && Array.isArray(value)) return !!value.length;

  if (value && typeof value === "object") return !!Object.keys(value);

  return !!value;
};

export const usePromise = <Args extends unknown[], Return>(
  callback: (...args: Args) => Promise<Return>,
  options: {
    key: string;
    throwOnError?: boolean;
    defaultData?: Return | null;
    immediate?: boolean;
    ttl?: number;
  },
) => {
  const { throwOnError, defaultData, immediate, key, ttl } = { ...DEFAULT_OPTIONS, ...options };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = usePersistState<Return>(defaultData as Return, key, { ttl });

  const execute = async (...params: Args) => {
    if (loading || hasData(data)) return;

    setLoading(true);
    setError(null);

    try {
      const response = await callback(...params);

      setData(response);

      return response;
    } catch (errorInfo) {
      console.error(errorInfo);

      setError(errorInfo);

      if (throwOnError) throw errorInfo;
    } finally {
      setLoading(false);
    }
  };

  const executeWithoutArgs = () => (execute as () => Promise<Return>)();
  const resetData = () => setData(defaultData as Return);

  const reExecute = () => {
    resetData();

    return executeWithoutArgs();
  };

  useEffect(() => {
    if (!immediate) return;

    executeWithoutArgs();
  }, []);

  return { data, setData, error, loading, execute, reExecute };
};
