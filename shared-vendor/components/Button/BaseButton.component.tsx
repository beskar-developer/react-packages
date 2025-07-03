import type { Props } from "./BaseButton.type";

export const BaseButton = ({ children, className, disabled, loading, ...props }: Props) => {
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
        "flex h-10 cursor-pointer items-center justify-center rounded-md bg-indigo-500 p-2 text-center text-sm text-white transition select-none hover:scale-[105%] hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-55",
        className,
      )}
      {...props}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};
