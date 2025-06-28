export type State = "CHECKED" | "UNCHECKED";

export interface Props {
  value: boolean;
  label?: string;
  disabled?: boolean;
  strikeLabel?: boolean;
  onValueChange: (value: boolean) => void;
}
