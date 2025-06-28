import { Timeout } from "@shared-vendor/helpers";
import { uuid } from "@shared-vendor/libs";

const DEFAULT_CONFIG = Object.freeze({
  duration: 3000,
  position: "top-left",
  type: "neutral",
  autoDismiss: true,
  stackMaxToast: 3,
  uniqueKey: "message",
});

const STACK_MAP = {
  top: [],
  bottom: [],
  "top-center": [],
  "top-left": [],
  "top-right": [],
  "bottom-center": [],
  "bottom-right": [],
  "bottom-left": [],
};

class ToastManager {
  #stacks = deepClone(STACK_MAP);
  #config;
  #toastsTimer = {};
  #reserveStacks = deepClone(STACK_MAP);
  #isOn = true;
  #once = false;

  setConfig(config) {
    this.#config = { ...DEFAULT_CONFIG, ...config };
  }

  constructor(config = {}) {
    this.setConfig(config);
  }

  #getToastConfig(toastConfig) {
    return { ...this.#config, ...toastConfig };
  }

  #checkReserveStack({ position }) {
    const reserveStack = this.#reserveStacks[position];
    const hasFreeSpace = this.#stacks[position].length < this.#config.stackMaxToast;

    if (!hasFreeSpace || !reserveStack.length) return;

    const reservedToast = reserveStack.pop();
    this.show(reservedToast.props, reservedToast.toastConfig);
  }

  dismiss(toast) {
    const stack = this.#stacks[toast.position];

    const toastIndex = stack.findIndex(({ id }) => toast.id === id);
    stack.splice(toastIndex, 1);

    this.#toastsTimer[toast.id]?.cancel();
    this.#checkReserveStack(toast);
  }

  pauseTimer(toastId) {
    this.#toastsTimer[toastId]?.pause();
  }

  resumeTimer(toastId) {
    this.#toastsTimer[toastId]?.resume();
  }

  has(props, toastConfig) {
    const { position, uniqueKey } = this.#getToastConfig(toastConfig);

    const keyValue = getValueByPath(props, uniqueKey);
    const propKey = `props.${uniqueKey}`;

    const hasToast = findByKey(this.#stacks[position], keyValue, {
      keyName: propKey,
    });
    const hasReservedToast = findByKey(this.#reserveStacks[position], keyValue, {
      keyName: propKey,
    });

    return hasToast || hasReservedToast;
  }

  show(props, toastConfig = {}) {
    const isOff = !this.#isOn && !this.#once;
    const isOffOnce = !this.#isOn && this.#once;

    if (isOff || this.has(props, toastConfig)) return;
    if (isOffOnce) {
      this.toggle();

      return;
    }

    const config = this.#getToastConfig(toastConfig);
    const { duration, position, autoDismiss } = config;

    const stackItemCount = this.#stacks[position].length;
    if (stackItemCount >= this.#config.stackMaxToast) {
      this.#reserveStacks[position].unshift({ toastConfig, props });
      return;
    }

    if (!Object.keys(STACK_MAP).includes(position))
      throw new Error(`Unsupported toast position: ${position}`);

    const id = uuid.generate();

    if (autoDismiss) {
      const timeout = new Timeout(() => this.dismiss(toast), duration);
      this.#toastsTimer[id] = timeout;
    }

    const timer = this.#toastsTimer[id];

    const toast = {
      id,
      props,
      ...config,
      get remainingTime() {
        return timer?.remainingTime;
      },
    };

    const addStrategy = position.includes("top") ? "push" : "unshift";
    this.#stacks[position][addStrategy](toast);

    return toast;
  }

  get stacks() {
    return this.#stacks;
  }

  #setIsOn({ value, once = false } = {}) {
    this.#isOn = value;
    this.#once = once;
  }

  off(config = {}) {
    this.#setIsOn({ ...config, value: false });
  }

  on(config = {}) {
    this.#setIsOn({ ...config, value: true });
  }

  toggle(config = {}) {
    this.#setIsOn({ ...config, value: !this.#isOn });
  }
}

export default new ToastManager();
