import type { Props, State } from "./Checkbox.type";

const BUTTON_CLASSES: Record<State, string> = {
  CHECKED: "border-primary-500 bg-primary-500",
  UNCHECKED: "border-gray-400 bg-transparent",
};

export const Checkbox = ({ value, label, disabled, strikeLabel, onValueChange }: Props) => {
  const { state, toggleValue, hasStrike } = useCheckBox({
    value,
    disabled,
    strikeLabel,
    onValueChange,
  });

  return (
    <div className="flex items-center justify-center gap-1" onClick={toggleValue}>
      <div
        className={`${BUTTON_CLASSES[state]} ${disabled ? "cursor-not-allowed opacity-55 grayscale-50" : ""} m-4 flex size-4.5 shrink-0 items-center justify-center rounded-sm border-2 text-white`}
      >
        <CheckTick state={state} />
      </div>

      {label && <span className={`${hasStrike ? "line-through" : ""} break-all`}>{label}</span>}
    </div>
  );
};
