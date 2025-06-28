import type { Props, State } from "./Checkbox.type";

export const useCheckBox = ({ value, disabled, strikeLabel, onValueChange }: Omit<Props, "label">) => {
  const state: State = value ? "CHECKED" : "UNCHECKED";

  const hasStrike = strikeLabel && value;

  const toggleValue = () => {
    if (disabled) return;

    onValueChange(!value);
  };

  return { state, hasStrike, toggleValue };
};
