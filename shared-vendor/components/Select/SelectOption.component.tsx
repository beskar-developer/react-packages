import type { Option } from "./Select.type";

interface ISelectOption<T extends string> {
  option: Option<T>;
  onSelect: (option: Option<T>) => void;
  active?: boolean;
}

export const SelectOption = <T extends string>({ option, onSelect, active }: ISelectOption<T>) => {
  return (
    <div
      onClick={() => onSelect(option)}
      className={twMerge(
        "dark:bg-surface-600 text-surface-700 dark:text-surface-300 dark:hover:bg-surface-500 cursor-pointer bg-white p-3 text-sm font-bold hover:bg-indigo-50",
        active && "!bg-primary-500 !text-primary-50",
      )}
    >
      {option.label}
    </div>
  );
};
