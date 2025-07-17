import type { Color, Props, Variant } from "./BaseButton.type";

const OUTLINED_BASE_CLASS = "bg-transparent border-2";
const BUTTON_CLASS_MAP: Record<Variant, Record<Color, string>> = {
  filled: {
    primary: "bg-primary-500 text-primary-50",
    error: "bg-error-500 text-error-50",
    neutral: "bg-black text-white dark:bg-white dark:text-black",
    success: "bg-success-500 text-success-50",
    info: "bg-info-500 text-info-50",
  },
  tonal: {
    primary: "bg-primary-200 text-primary-500",
    error: "bg-error-200 text-error-500",
    neutral: "",
    success: "bg-success-200 text-success-500",
    info: "bg-info-200 text-info-500",
  },
  outlined: {
    primary: twMerge(OUTLINED_BASE_CLASS, "border-primary-500 text-primary-500"),
    error: twMerge(OUTLINED_BASE_CLASS, "border-error-500 text-error-500"),
    neutral: OUTLINED_BASE_CLASS,
    success: twMerge(OUTLINED_BASE_CLASS, "border-success-500 text-success-500"),
    info: twMerge(OUTLINED_BASE_CLASS, "border-info-500 text-info-500"),
  },
  text: {
    primary: "hover:bg-primary-200 hover:text-primary-600 text-primary-500",
    error: "hover:bg-error-200 hover:text-error-600 text-error-500",
    neutral: "",
    success: "hover:bg-success-200 hover:text-success-600 text-success-500",
    info: "hover:bg-info-200 hover:text-info-600 text-info-500",
  },
};

export const BaseButton = ({
  children,
  className,
  disabled,
  loading,
  variant = "filled",
  icon,
  color = "primary",
  ...props
}: Props) => {
  const { onClick } = useBaseButton({
    disabled,
    loading,
    onClick: props.onClick,
  });

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "flex cursor-pointer items-center justify-center gap-2 rounded-md p-2 text-center text-sm transition select-none hover:scale-[105%] disabled:cursor-not-allowed disabled:opacity-55",
        BUTTON_CLASS_MAP[variant][color],
        icon ? "size-10" : "h-10",
        className,
      )}
      {...props}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};
