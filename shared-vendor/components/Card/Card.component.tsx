interface Props extends ComponentProps<"div"> {
  scale?: boolean;
}

export const Card = ({ children, className, scale = false, ...props }: Props) => {
  return (
    <div
      className={twMerge(
        `${scale ? "hover:scale-120" : ""} hover:border-primary-400 dark:bg-surface-800 cursor-pointer overflow-hidden rounded-lg border-2 border-transparent bg-white shadow-2xl ring-gray-900 transition-transform hover:border-2`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
