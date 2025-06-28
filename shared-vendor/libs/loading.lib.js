import { eventBusContext } from "./index";
const { eventBus } = eventBusContext;

export default {
  show({ key = "" }) {
    eventBus.emit("loading:show", { key });
    return this;
  },
  hide({ key = "" }) {
    eventBus.emit("loading:hide", { key });
    return this;
  },

  onShow(fn) {
    eventBus.on("loading:show", fn);
    return this;
  },
  onHide(fn) {
    eventBus.on("loading:hide", fn);
    return this;
  },

  destroy(fn) {
    eventBus.off("loading:show", fn);
    eventBus.off("loading:hide", fn);

    return this;
  },
};
