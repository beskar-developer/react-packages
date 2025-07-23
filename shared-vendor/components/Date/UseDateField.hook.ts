import type { IDateField } from "@shared-vendor/components/Date/DateField.type";

import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";

export const useDateField = ({ range, date, fieldClassName, onDateChange, ...props }: IDateField) => {
  const convertISOToDate = (ISODate: string) => ISODate.slice(0, 10);

  const convertDateObjectToString = (dateObject: DateObject) =>
    convertISOToDate(dateObject.add(+!range, "day").toDate().toISOString());

  const wrappedOnDateChange = (date: DateObject | DateObject[]) => {
    if (range) {
      const normalizedDate = (date as DateObject[]).map(convertDateObjectToString);

      onDateChange(normalizedDate);

      return;
    }

    const normalizedDate = convertDateObjectToString(date as DateObject);
    onDateChange(normalizedDate);
  };

  const convertStringToDateObject = (value: string) => (value ? new DateObject(convertISOToDate(value)) : "");

  const normalizeDate = (date: IDateField["date"]) => {
    if (range) {
      return (date as string[]).map(convertStringToDateObject);
    }

    return convertStringToDateObject(date as string);
  };

  const datePickerProps = {
    range,
    value: normalizeDate(date),
    calendar: persian,
    locale: persianFa,
    onChange: wrappedOnDateChange,
  };

  const fieldProps = {
    readOnly: true,
    containerClassName: fieldClassName,
    ...props,
  };

  return { datePickerProps, fieldProps };
};
