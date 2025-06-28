const useEventBus = (eventBus) => {
  const listenersRef = useRef([]);

  useEffect(
    () => () => {
      listenersRef.current.forEach((cleanup) => cleanup());
      listenersRef.current = [];
    },
    [],
  );

  const on = (eventName, listener, options = {}) => {
    eventBus.on(eventName, listener, options);

    listenersRef.current.push(() => eventBus.off(eventName, listener));
  };

  const off = (eventName, listener) => eventBus.off(eventName, listener);

  const emit = (eventName, ...args) => eventBus.emit(eventName, ...args);

  const reset = () => eventBus.reset();

  return { on, off, emit, reset };
};

export default useEventBus;
