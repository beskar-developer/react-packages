import type { IDatePickerButton } from "@shared-vendor/components/Date/DateField.type";

export const DatePickerButton = ({ direction, onClick }: IDatePickerButton) => {
  return (
    <BaseButton icon variant="text" onClick={onClick}>
      <DatePickerButtonIcon direction={direction} />
    </BaseButton>
  );
};
