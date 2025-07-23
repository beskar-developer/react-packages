import type { IDateField } from "@shared-vendor/components/Date/DateField.type";

import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";

export const useDateField = ({ range, value, name, label, fieldClassName, onChange }: IDateField) => {
  const convertDateObjectToString = (dateObject: DateObject) =>
    dateObject.toDate().toISOString().slice(0, 10);

  const wrappedOnChange = (value: DateObject | DateObject[]) => {
    if (range) {
      const normalizedValue = (value as DateObject[]).map(convertDateObjectToString);

      onChange(normalizedValue);

      return;
    }

    const normalizedValue = convertDateObjectToString(value as DateObject);
    onChange(normalizedValue);
  };

  const convertStringToDateObject = (value: string) => (value ? new DateObject(value) : "");

  const normalizeValue = (value: IDateField["value"]) => {
    if (range) {
      return (value as string[]).map(convertStringToDateObject);
    }

    return convertStringToDateObject(value as string);
  };

  const datePickerProps = {
    range,
    value: normalizeValue(value),
    calendar: persian,
    locale: persianFa,
    onChange: wrappedOnChange,
  };

  const fieldProps = {
    readOnly: true,
    containerClassName: fieldClassName,
    name,
    label,
  };

  return { datePickerProps, fieldProps };
};
