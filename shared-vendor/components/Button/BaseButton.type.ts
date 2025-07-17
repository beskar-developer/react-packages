export type Variant = "filled" | "tonal" | "outlined" | "text";
export type Color = "primary" | "error" | "success" | "neutral" | "info";

export interface Props extends ComponentProps<"button"> {
  label?: string;
  loading?: boolean;
  variant?: Variant;
  icon?: boolean;
  color?: Color;
}
