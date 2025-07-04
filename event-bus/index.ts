import EventBus from "./lib/EventBus";
import useEventBus from "./hooks/UseEventBus";

const createEventBus = () => {
  const eventBusInstance = new EventBus();

  return {
    eventBus: eventBusInstance,
    useEventBus: () => useEventBus(eventBusInstance),
  };
};

export default createEventBus;
