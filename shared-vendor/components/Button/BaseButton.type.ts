export type Variant = "filled" | "tonal" | "outlined" | "text";
export type Color = "indigo" | "red" | "emerald" | "neutral";

export interface Props extends ComponentProps<"button"> {
  label?: string;
  loading?: boolean;
  variant?: Variant;
  icon?: boolean;
  color?: Color;
}
