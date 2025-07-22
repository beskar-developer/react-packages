import type { ISelect } from "@shared-vendor/components/Select/Select.type";

type SelectOptionListContent<T extends string> = Pick<
  ReturnType<typeof useSelect<T>>,
  "isActive" | "selectOption"
> &
  Pick<ISelect<T>, "options">;

const ANIMATION_CONFIG = {
  initial: { opacity: 0, scale: 0.95, y: -5 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -5 },
  transition: { duration: 0.15, ease: "easeOut" },
} as const;

export const SelectOptionListContent = <T extends string>({
  options = [],
  isActive,
  selectOption,
}: SelectOptionListContent<T>) => {
  return (
    <motion.ul
      className="z-50 max-h-60 origin-top-right overflow-auto rounded shadow-xl"
      {...ANIMATION_CONFIG}
    >
      {options.map((option) => (
        <motion.li key={option.value}>
          <SelectOption option={option} active={isActive(option)} onSelect={selectOption} />
        </motion.li>
      ))}
    </motion.ul>
  );
};
