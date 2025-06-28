import EventBus from "./lib/event-bus";
import useEventBus from "./hooks/use-event-bus";

const createEventBus = () => {
  const eventBusInstance = new EventBus();

  return {
    eventBus: eventBusInstance,
    useEventBus: () => useEventBus(eventBusInstance),
  };
};

export default createEventBus;
