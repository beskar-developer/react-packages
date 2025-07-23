import type { ISelect, Option } from "@shared-vendor/components/Select/Select.type";

interface ISelectOption<T extends string> {
  option: Option<T>;
  onSelect: (option: Option<T>) => void;
  active?: boolean;
  renderLabel: ISelect<T>["renderLabel"];
}

export const SelectOption = <T extends string>({
  option,
  active,
  renderLabel,
  onSelect,
}: ISelectOption<T>) => {
  return (
    <div
      onClick={() => onSelect(option)}
      className={twMerge(
        "dark:bg-surface-600 text-surface-700 dark:text-surface-300 dark:hover:bg-surface-500 flex cursor-pointer items-center gap-2 bg-white p-3 text-sm font-bold hover:bg-indigo-50",
        active && "!bg-primary-500 !text-primary-50",
      )}
    >
      {renderLabel ? renderLabel(option) : option.label}
    </div>
  );
};
