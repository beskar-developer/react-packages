import type { EventListener, EventName, Options } from "@packages/event-bus/types";

import EventBus from "@packages/event-bus/lib/EventBus";

const useEventBus = (eventBus: InstanceType<typeof EventBus>) => {
  const listenersRef = useRef<Array<EventListener>>([]);

  useEffect(
    () => () => {
      listenersRef.current.forEach((cleanup) => cleanup());
      listenersRef.current = [];
    },
    [],
  );

  const on = (eventName: EventName, listener: EventListener, options: Options = {}) => {
    eventBus.on(eventName, listener, options);

    listenersRef.current.push(() => eventBus.off(eventName, listener));
  };

  const off = (eventName: EventName, listener: EventListener) => eventBus.off(eventName, listener);

  const emit = (eventName: EventName, ...args: unknown[]) => eventBus.emit(eventName, ...args);

  const reset = () => eventBus.reset();

  return { on, off, emit, reset };
};

export default useEventBus;
