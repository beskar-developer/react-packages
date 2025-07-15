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
      <label className="text-xs text-gray-600 dark:text-indigo-100" htmlFor={name}>
        {labelFallback || label}
      </label>

      <div
        className={twMerge(
          "flex items-center gap-4 rounded-md bg-indigo-50 p-2 text-base dark:bg-gray-700 dark:text-indigo-50",
          containerClassName,
        )}
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
            className={`text-xs ${errorMessage ? "text-red-500 dark:text-red-300" : "text-indigo-500"}`}
          >
            {messageElement}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
