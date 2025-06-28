import type { Props, State } from "./ToggleButton.type";

export const useToggleButton = ({ value, disabled, onValueChange }: Omit<Props, "label">) => {
  const state: State = value ? "ON" : "OFF";

  const toggle = () => {
    if (disabled) return;

    onValueChange((value) => !value);
  };

  return { state, toggle };
};
