import type { Props } from "./ToggleButton.type";

const TRACK_CLASS_MAP = {
  ON: "border-indigo-500 bg-indigo-500 justify-start",
  OFF: "border-gray-300 bg-gray-300 justify-end",
};
const INDICATOR_CLASS_MAP = {
  ON: "bg-white ",
  OFF: "bg-gray-400 ",
};
const DISABLED_CLASS = "cursor-not-allowed opacity-55";

export const ToggleButton = ({ label, value, onValueChange, disabled }: Props) => {
  const { state, toggle } = useToggleButton({ value, disabled, onValueChange });

  return (
    <div className={`flex items-center justify-between gap-2 ${disabled ? DISABLED_CLASS : ""}`}>
      {label && <span className="dark:text-white">{label}</span>}

      <div
        className={`flex h-7 w-16 cursor-pointer items-center rounded-full border-2 px-1 transition ${TRACK_CLASS_MAP[state]}`}
        onClick={toggle}
      >
        <motion.div
          layout
          transition={{ type: "spring", visualDuration: 0.2, bounce: 0.2 }}
          className={`bg-red size-4.5 rounded-full ${INDICATOR_CLASS_MAP[state]}`}
        />
      </div>
    </div>
  );
};
