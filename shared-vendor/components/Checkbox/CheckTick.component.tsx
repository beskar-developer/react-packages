import type { Variant } from "motion";

import type { State } from "./Checkbox.type";

interface Props {
  state: State;
}

const TICK_VARIANTS: Record<State, Variant> = {
  CHECKED: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
  UNCHECKED: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const CheckTick = ({ state }: Props) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="3.5"
      stroke="currentColor"
      className="size-3"
      initial={false}
      animate={state}
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
        variants={TICK_VARIANTS}
      />
    </motion.svg>
  );
};
