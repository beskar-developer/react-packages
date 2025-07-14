import type { Color, Props, Variant } from "./BaseButton.type";

const OUTLINED_BASE_CLASS = "bg-transparent border-2";
const BUTTON_CLASS_MAP: Record<Variant, Record<Color, string>> = {
  filled: {
    indigo: "bg-indigo-500 text-indigo-50",
    red: "bg-red-500 text-red-50",
    neutral: "bg-black text-white dark:bg-white dark:text-black",
    emerald: "bg-emerald-500 text-emerald-50",
    sky: "bg-sky-500 text-sky-50",
  },
  tonal: {
    indigo: "bg-indigo-200 text-indigo-500",
    red: "bg-red-200 text-red-500",
    neutral: "",
    emerald: "bg-emerald-200 text-emerald-500",
    sky: "bg-sky-200 text-sky-500",
  },
  outlined: {
    indigo: twMerge(OUTLINED_BASE_CLASS, "border-indigo-500 text-indigo-500"),
    red: twMerge(OUTLINED_BASE_CLASS, "border-red-500 text-red-500"),
    neutral: OUTLINED_BASE_CLASS,
    emerald: twMerge(OUTLINED_BASE_CLASS, "border-emerald-500 text-emerald-500"),
    sky: twMerge(OUTLINED_BASE_CLASS, "border-sky-500 text-sky-500"),
  },
  text: {
    indigo: "hover:bg-indigo-200 hover:text-indigo-600 text-indigo-500",
    red: "hover:bg-red-200 hover:text-red-600 text-red-500",
    neutral: "",
    emerald: "hover:bg-emerald-200 hover:text-emerald-600 text-emerald-500",
    sky: "hover:bg-sky-200 hover:text-sky-600 text-sky-500",
  },
};

export const BaseButton = ({
  children,
  className,
  disabled,
  loading,
  variant = "filled",
  icon,
  color = "indigo",
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
