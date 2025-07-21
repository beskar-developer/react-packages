type Color = "info" | "error" | "success" | "primary" | "surface";

interface IChip {
  children: ReactNode;
  color?: Color;
  className?: string;
}

const CLASS_MAP: Record<Color, string> = {
  info: "bg-info-200 text-info-500",
  error: "bg-error-200 text-error-500",
  success: "bg-success-200 text-success-500",
  primary: "bg-primary-200 text-primary-500",
  surface: "bg-surface-200 text-surface-500",
};

export const Chip = ({ color = "info", className, children }: IChip) => {
  return (
    <span
      className={twMerge(
        "rounded-full px-2 py-0.5 text-[8px] font-thin select-none",
        CLASS_MAP[color],
        className,
      )}
    >
      {children}
    </span>
  );
};
