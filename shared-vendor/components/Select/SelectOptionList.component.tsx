import type { ISelect } from "@shared-vendor/components/Select/Select.type";

type SelectOptionList<T extends string> = Omit<ReturnType<typeof useSelect<T>>, "referenceProps"> &
  Pick<ISelect<T>, "options" | "renderLabel">;

export const SelectOptionList = <T extends string>({
  isOpen,
  floatingProps,
  options = [],
  selectOption,
  isActive,
  renderLabel,
}: SelectOptionList<T>) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div {...floatingProps}>
          <SelectOptionListContent
            options={options}
            selectOption={selectOption}
            isActive={isActive}
            renderLabel={renderLabel}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
