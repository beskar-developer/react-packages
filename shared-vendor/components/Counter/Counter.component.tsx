import type { Props } from "./Counter.type";

export const Counter = ({ count, min, max, onCountChange }: Props) => {
  const { isBiggerThanMax, isLesserThanMin, increment, decrement } = useCounter({
    count,
    min,
    max,
    onCountChange,
  });

  return (
    <div className="flex items-center gap-4">
      <BaseButton className="!size-8" disabled={isBiggerThanMax} onClick={increment}>
        +
      </BaseButton>

      <input
        className="w-16 text-center text-xl dark:text-white"
        type="number"
        value={count}
        dir="ltr"
        onChange={(event) => onCountChange(+event.target.value)}
      />

      <BaseButton className="!size-8" disabled={isLesserThanMin} onClick={decrement}>
        -
      </BaseButton>
    </div>
  );
};
