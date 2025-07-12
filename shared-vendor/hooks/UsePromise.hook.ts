const ONE_MINUTE = 60 * 1000;
const DEFAULT_OPTIONS = {
  throwOnError: false,
  defaultData: null,
  immediate: false,
  ttl: ONE_MINUTE,
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
    defaultData?: Partial<Return> | null;
    immediate?: boolean;
    ttl?: number;
  },
) => {
  const { throwOnError, defaultData, immediate, key, ttl } = { ...DEFAULT_OPTIONS, ...options };

  const [error, setError] = useState<unknown>(null);
  const [data, setData] = usePersistState<Return>(defaultData as Return, key, { ttl });
  const [loading, setLoading] = useState(() => immediate && !hasData(data));
  const isFetching = loading && !immediate;

  let isForced = false;

  const execute = async (...params: Args) => {
    if (!isForced && (isFetching || hasData(data))) return;

    isForced = false;
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

  const executeWithoutArgs = execute as () => Promise<Return>;

  const reExecute = (...args: Args) => {
    isForced = true;

    return execute(...args);
  };

  useEffect(() => {
    if (!immediate) return;

    executeWithoutArgs();
  }, []);

  return { data, setData, error, loading, execute, reExecute };
};
