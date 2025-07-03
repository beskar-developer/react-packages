import type { Props } from "./Counter.type";

export const useCounter = ({ min, max, count, onCountChange }: Props) => {
  const hasMax = max !== undefined;
  const hasMin = min !== undefined;

  const isBiggerThanMax = hasMax && count >= max;
  const isLesserThanMin = hasMin && count <= min;

  const increment = () => {
    if (isBiggerThanMax) return;

    onCountChange((count) => count + 1);
  };
  const decrement = () => {
    if (isLesserThanMin) return;

    onCountChange((count) => count - 1);
  };

  useEffect(() => {
    if (isLesserThanMin) onCountChange(min);
    if (isBiggerThanMax) onCountChange(max);
  }, [isBiggerThanMax, isLesserThanMin]);

  return { isBiggerThanMax, isLesserThanMin, increment, decrement };
};
