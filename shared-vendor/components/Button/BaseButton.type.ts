export type Variant = "filled" | "tonal" | "outlined";

export interface Props extends ComponentProps<"button"> {
  label?: string;
  loading?: boolean;
  variant?: Variant;
}
