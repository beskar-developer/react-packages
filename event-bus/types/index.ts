export type Debounce = number;
export type Throttle = number;
export type Priority = number;
export type EventName = string;

export type ErrorHandler = (eventName: EventName, error: unknown) => void;
export type EventListener = (...args: unknown[]) => void;

export type Options = Partial<{
  immediate: boolean;
  once: boolean;
  priority: Priority;
  throttle: Throttle;
  debounce: Debounce;
}>;

export type WrappedListener = {
  listener: EventListener;
  originalListener: EventListener;
  priority: Priority;
};

export type Event = {
  listeners: WrappedListener[];
  sorted: boolean;
};

export type WrapPayload = {
  listener: EventListener;
  originalListener: EventListener;
  eventName: EventName;
  options: Options;
};
