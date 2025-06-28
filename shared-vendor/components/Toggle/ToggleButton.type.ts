export interface Props {
  label?: string;
  value: boolean;
  onValueChange: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

export type State = "ON" | "OFF";
