import type { ISelect } from "@shared-vendor/components/Select/Select.type";

import { AiFillCaretDown } from "react-icons/ai";

export const Select = <T extends string>({
  options = [],
  value,
  name,
  label,
  disabled,
  onChange,
  renderLabel,
  fieldClassName,
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
      <TextField containerClassName={fieldClassName} appendIcon={<AiFillCaretDown />} {...referenceProps} />

      <SelectOptionList
        options={options}
        isOpen={isOpen}
        floatingProps={floatingProps}
        selectOption={selectOption}
        isActive={isActive}
        renderLabel={renderLabel}
      />
    </div>
  );
};
