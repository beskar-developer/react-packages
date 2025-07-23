import type { IDateField, IDatePickerButton } from "@shared-vendor/components/Date/DateField.type";

import { AiFillCalendar } from "react-icons/ai";

import { default as DatePicker } from "react-multi-date-picker";

export const DateField = (props: IDateField) => {
  const { datePickerProps, fieldProps } = useDateField(props);

  const renderButton = (direction: IDatePickerButton["direction"], onClick: IDatePickerButton["onClick"]) => (
    <DatePickerButton direction={direction} onClick={onClick} />
  );

  return (
    <DatePicker
      {...datePickerProps}
      render={<TextField {...fieldProps} appendIcon={<AiFillCalendar />} />}
      renderButton={renderButton}
    />
  );
};
