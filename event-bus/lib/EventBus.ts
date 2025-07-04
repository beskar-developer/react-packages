import type {
  Debounce,
  ErrorHandler,
  Event,
  EventListener,
  EventName,
  Options,
  Throttle,
  WrapPayload,
  WrappedListener,
} from "@packages/event-bus/types";

const defaultErrorHandler: ErrorHandler = (eventName, error) =>
  console.error(`Error executing listener for event '${eventName}':`, error);

class EventBus {
  #events: Map<EventName, Event>;
  #maxListeners: number;
  #errorHandler: ErrorHandler;

  constructor(maxListeners = 20, errorHandler = defaultErrorHandler) {
    this.#events = new Map();
    this.#maxListeners = maxListeners;
    this.#errorHandler = errorHandler;
  }

  on(eventName: EventName, listener: EventListener, options: Options = {}) {
    this.#initializeEventIfAbsent(eventName);

    const wrappedListener = this.#wrapListener(listener, eventName, options);

    this.#executeListenerIfImmediate({
      listener: wrappedListener,
      originalListener: listener,
      options,
      eventName,
    });

    this.#registerListener({
      listener: wrappedListener,
      originalListener: listener,
      eventName,
      options,
    });
  }

  off(eventName: EventName, originalListener: EventListener) {
    const event = this.#events.get(eventName);
    if (!event) return;

    const listeners = event.listeners.filter(
      ({ originalListener: listener }) => listener !== originalListener,
    );

    this.#events.set(eventName, { ...event, listeners, sorted: true });
  }

  emit(eventName: EventName, ...args: unknown[]) {
    const event = this.#events.get(eventName);
    if (!event) return;

    this.#sortListenersByPriority(event);

    event.listeners.forEach(({ listener }) => {
      try {
        listener(...args);
      } catch (error) {
        this.#handleError(eventName, error);
      }
    });
  }

  reset() {
    this.#events.clear();
  }

  #handleError(eventName: EventName, error: unknown) {
    this.#errorHandler(eventName, error);
  }

  #initializeEventIfAbsent(eventName: EventName) {
    if (this.#events.has(eventName)) return;

    this.#events.set(eventName, { listeners: [], sorted: true });
  }

  #wrapListener(listener: EventListener, eventName: EventName, options: Options) {
    return this.#wrapOnce({
      listener: this.#wrapDebounceOrThrottle(listener, options),
      originalListener: listener,
      eventName,
      options,
    });
  }

  #wrapDebounceOrThrottle(listener: EventListener, { debounce, throttle }: Options) {
    if (debounce) return this.#applyDebounce(listener, debounce);

    if (throttle) return this.#applyThrottle(listener, throttle);

    return listener;
  }

  #applyDebounce(listener: EventListener, debounce: Debounce) {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: unknown[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => listener(...args), debounce);
    };
  }

  #applyThrottle(listener: EventListener, throttle: Throttle) {
    let isThrottled = false;

    return (...args: unknown[]) => {
      if (isThrottled) return;

      listener(...args);
      isThrottled = true;
      setTimeout(() => (isThrottled = false), throttle);
    };
  }

  #wrapOnce({ listener, originalListener, eventName, options: { once } }: WrapPayload) {
    if (!once) return listener;

    return (...args: unknown[]) => {
      listener(...args);

      this.off(eventName, originalListener);
    };
  }

  #executeListenerIfImmediate({
    listener,
    originalListener,
    eventName,
    options: { immediate, once },
  }: WrapPayload) {
    if (immediate && !once) {
      listener();
    } else if (once) {
      this.off(eventName, originalListener);
    }
  }

  #registerListener({ eventName, listener, options, originalListener }: WrapPayload) {
    const { once, immediate, priority = 1 } = options || {};

    if (!(immediate && once)) {
      const event = this.#events.get(eventName)!;

      event.listeners.push({ listener, originalListener, priority });
      event.sorted = false;

      this.#warnIfMaxListenersExceeded(eventName);
    }
  }

  #sortListenersByPriority(event: Event) {
    if (event.sorted) return;

    event.listeners.sort((a: WrappedListener, b) => b.priority - a.priority);
    event.sorted = true;
  }

  #warnIfMaxListenersExceeded(eventName: EventName) {
    const event = this.#events.get(eventName);
    const eventCount = event?.listeners?.length ?? 0;

    if (eventCount > this.#maxListeners)
      console.warn(`Warning: More than ${this.#maxListeners} listeners for event '${eventName}'`);
  }
}

export default EventBus;
