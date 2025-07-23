interface IDefaultDateField {
  name: string;
  label?: string;
  fieldClassName?: string;
}

interface ISingleDateField extends IDefaultDateField {
  range?: false | undefined;
  value: string;
  onChange: (value: string) => void;
}

interface IRangeDateField extends IDefaultDateField {
  range: true;
  value: string[];
  onChange: (value: string[]) => void;
}

export type IDateField = ISingleDateField | IRangeDateField;
export interface IDatePickerButton {
  onClick: () => void;
  direction: "right" | "left";
}
