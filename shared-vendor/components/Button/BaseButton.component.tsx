import type { Props, Variant } from "./BaseButton.type";

const BUTTON_CLASS_MAP: Record<Variant, string> = {
  filled: "bg-indigo-500 text-white ",
  tonal: "bg-indigo-200 text-indigo-500 ",
  outlined: "bg-transparent border-2 border-indigo-500 text-indigo-500",
};

export const BaseButton = ({
  children,
  className,
  disabled,
  loading,
  variant = "outlined",
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
        "flex h-10 cursor-pointer items-center justify-center rounded-md p-2 text-center text-sm transition select-none hover:scale-[105%] disabled:cursor-not-allowed disabled:opacity-55",
        BUTTON_CLASS_MAP[variant],
        className,
      )}
      {...props}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};
