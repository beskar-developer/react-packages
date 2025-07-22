import type { ISelect } from "@shared-vendor/components/Select/Select.type";

export const Select = <T extends string>({
  options = [],
  value,
  name,
  label,
  disabled,
  onChange,
}: ISelect<T>) => {
  const { isOpen, floatingProps, referenceProps, selectOption, isActive } = useSelect({
    options,
    value,
    name,
    label,
    disabled,
    onChange,
  });

  return (
    <div className="relative">
      <TextField {...referenceProps} />

      <SelectOptionList
        options={options}
        isOpen={isOpen}
        floatingProps={floatingProps}
        selectOption={selectOption}
        isActive={isActive}
      />
    </div>
  );
};
