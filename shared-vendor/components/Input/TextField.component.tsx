interface Props extends ComponentProps<"input"> {
  name: string;
  label?: string;
  labelFallback?: ReactNode;
  hint?: string;
  errorMessage?: string;
  messageFallback?: ReactNode;
}

const ANIMATION_CONFIG = { opacity: 0, scale: 0, transformOrigin: "right" };

export const TextField = ({
  name,
  label,
  labelFallback,
  hint,
  errorMessage,
  messageFallback,
  disabled,
  ref,
  ...props
}: Props) => {
  const message = errorMessage || hint;
  const messageElement = messageFallback || message;

  return (
    <div className={`flex flex-col gap-2 ${disabled ? "cursor-not-allowed opacity-55" : ""}`}>
      <label className="text-xs text-gray-600 dark:text-indigo-100" htmlFor={`#${name}`}>
        {labelFallback || label}
      </label>

      <div className="rounded-md bg-indigo-50 p-2 text-base dark:bg-gray-700 dark:text-indigo-50">
        <input className="size-full" ref={ref} id={name} name={name} disabled={disabled} {...props} />
      </div>

      <AnimatePresence>
        {messageElement && (
          <motion.span
            initial={ANIMATION_CONFIG}
            exit={ANIMATION_CONFIG}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-xs ${errorMessage ? "text-red-500 dark:text-red-300" : "text-indigo-500"}`}
          >
            {messageElement}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
