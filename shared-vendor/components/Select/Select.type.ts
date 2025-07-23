export type Option<T extends string> = { value: T; label: string };

export interface ISelect<T extends string> {
  options?: Option<T>[];
  value: T;
  name: string;
  label?: string;
  disabled?: boolean;
  onChange: (value: T) => void;
  renderLabel?: (option: Option<T>) => ReactNode;
  fieldClassName?: string;
}
