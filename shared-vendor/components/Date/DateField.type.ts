import type { InputProps } from "@shared-vendor/components/Input/TextField.type";

interface IDefaultDateField extends InputProps {
  label?: string;
  fieldClassName?: string;
}

interface ISingleDateField extends IDefaultDateField {
  range?: false | undefined;
  date: string;
  onDateChange: (value: string) => void;
}

interface IRangeDateField extends IDefaultDateField {
  range: true;
  date: string[];
  onDateChange: (value: string[]) => void;
}

export type IDateField = ISingleDateField | IRangeDateField;
export interface IDatePickerButton {
  onClick: () => void;
  direction: "right" | "left";
}
