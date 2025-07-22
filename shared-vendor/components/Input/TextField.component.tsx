import type { HTMLInputProps, HTMLTextAreaProps, Props } from "./TextField.type";

const ANIMATION_CONFIG = { opacity: 0, scale: 0, transformOrigin: "right" };

export const TextField = ({
  name,
  label,
  labelFallback,
  hint,
  errorMessage,
  messageFallback,
  disabled,
  textarea,
  ref,
  prependIcon,
  appendIcon,
  containerClassName,
  containerRef,
  ...props
}: Props) => {
  const message = errorMessage || hint;
  const messageElement = messageFallback || message;

  const attrs = {
    className: "size-full placeholder-gray-400 ",
    ref,
    id: name,
    name,
    disabled,
    ...props,
  };

  const inputComponent = textarea ? (
    <textarea {...(attrs as HTMLTextAreaProps)} className={twMerge(attrs.className, "overflow-hidden")} />
  ) : (
    <input {...(attrs as HTMLInputProps)} />
  );

  return (
    <div className={`flex flex-col gap-2 ${disabled ? "cursor-not-allowed opacity-55" : ""}`}>
      <label className="dark:text-primary-100 text-surface-600 text-xs" htmlFor={name}>
        {labelFallback || label}
      </label>

      <div
        className={twMerge(
          "bg-primary-50 dark:text-primary-50 dark:bg-surface-700 flex items-center gap-4 rounded-md p-2 text-base",
          containerClassName,
        )}
        ref={containerRef}
      >
        {prependIcon}

        {inputComponent}

        {appendIcon}
      </div>

      <AnimatePresence>
        {messageElement && (
          <motion.span
            initial={ANIMATION_CONFIG}
            exit={ANIMATION_CONFIG}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-xs ${errorMessage ? "text-error-500 dark:text-error-300" : "text-primary-500"}`}
          >
            {messageElement}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
